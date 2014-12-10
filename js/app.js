"use strict";

var TRANSITING_SPEED = 0.005;

/* Read-only computed properties. */
Backbone.ROComputedModel = Backbone.Model.extend({
    /*
     * Enable computed, read-only properties
     */
    get: function(attr) {
        if (this.attributes[attr] !== undefined)
            return this.attributes[attr];
        else if (_.isFunction(this[attr]))
            return this[attr]();
        else 
            return this[attr];
    }    
});

// This should eventually go in an external file (json? yaml?)
var Levels = [
    {
        starRadius:Units.RSUN,
        planetRadius:Units.RJUP,
        planetPeriod:365.25,
        planetPhase:0
    }
];


var App = Backbone.ROComputedModel.extend({
    t: 0,
    dt: 1.5,
    speed: 1,
    x: [0, 0, 0],
    // initial velocity of the star (AU/day). The vector contains the 3
    // velocity components for each body, (v_x^0, v_y^0, v_z^0, v_x^1, v_y^1, v_z^1, ...),
    // so that the are 3*nplanets components.
    v: [0, 0, 0],
    R: [Units.RSUN, Units.RJUP],
    // initial mass of the star (MSUN). The vector contains the masses of
    // all the bodies in the system.
    M: [1],
    paused: false,
    currentLevel: 0,
    lDt: 0.0005,
    
    initialize: function() {
        window.minDepth = TransitDepthMinScale(Levels[this.currentLevel].starRadius);
        this.loadLevel();
    },
    
    nplanets: function() {
        return this.M.length-1;
    },

    coords: function(n) {
        return [this.x[n*NPHYS+X], this.x[n*NPHYS+Y], this.x[n*NPHYS+Z]];
    },

    vels: function(n) {
        return [this.v[n*NPHYS+X], this.v[n*NPHYS+Y], this.v[n*NPHYS+Z]];
    },

    loadLevel: function() {
        this.lightCurve = [];
        var level = Levels[this.currentLevel];
        this.R[0] = level.starRadius;

        var lDt = this.lDt;

        var a = PeriodToSemiMajorAxis(this.M[0]*Units.MSUN, level.planetPeriod*Units.DAY);
        var n = 2*Math.PI / level.planetPeriod;

        var t = 0;
        while (t < level.planetPeriod) {            
            var th = n * t + level.planetPhase;
            t += lDt;
            
            var x = a * Math.cos(th);
            var y = a * Math.sin(th);

            
            var dip = lightCurve(x, y, 0,
                                 this.R[0],
                                 level.planetRadius);
            this.lightCurve.push([t, dip]);
            if (Math.abs(x) < Units.RSUN && y > 0)
                console.error(t, dip);

        }
        
    },
    
    addPlanet: function(x, y) {
        var r = Math.sqrt(x*x + y*y);
        var v_circ = Math.sqrt(K2/r);
        
        this.x.push(x, y, 0);
        this.v.push(-v_circ * y/r, v_circ * x/r, 0);
        this.M.push(0);

        app.trigger('add:planet');
        $(".message").hide();
    },

    movePlanet: function(n, x, y) {
        var r = Math.sqrt(x*x + y*y);
        var v_circ = Math.sqrt(K2/r);
        this.x[n*NPHYS+X] = x;
        this.x[n*NPHYS+Y] = y;
        this.v[n*NPHYS+X] = -v_circ * y/r;
        this.v[n*NPHYS+Y] = v_circ * x/r;
        this.t = 0;
        resetData('#top-right');
        
    },

    ticks:0,
    transiting:false,
    
    tick: function() {
        if (this.paused)
            return;
        
        Physics.leapfrog(this.t + this.speed*this.dt, this);
        this.t += this.speed*this.dt;

        if (this.nplanets() == 0)
            return;

        var MAX_DISTANCE = 20*this.R[0]/Units.AU;
        var dx = Math.abs(this.x[NPHYS+X]);

        // Compute light curve
        var dip = lightCurve(this.x[NPHYS+X]*Units.AU, this.x[NPHYS+Y]*Units.AU,
                             this.x[NPHYS+Z]*Units.AU,
                             this.R[0],
                             this.R[1]);

        if (dx < MAX_DISTANCE && this.x[NPHYS+Y] > 0) {
            if (!this.transiting)
                resetData('#top-left');
            this.transiting = true;
            addData(this.t, dip, '#top-left');
            this.speed = TRANSITING_SPEED + (1-TRANSITING_SPEED) * Math.pow(dx/MAX_DISTANCE, 2.);
        } else {
            this.speed = 1;
            this.transiting = false;
        }

        this.ticks++;

        if (this.ticks % 2 == 0) {
            addData(this.t, dip, '#top-right');
        }
    }
    
});

var app = new App();

var AppView = Backbone.View.extend({
    // Top-level container
    el: $("#app"),

    // Events table mapping button to UI updates.
    events: {
        
    }
});

$(document).ready(function() {
    app.view = new AppView({ model: app });
});
