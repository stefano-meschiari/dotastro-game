"use strict";

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
        starRadius:RSUN
    }
];


var App = Backbone.ROComputedModel.extend({
    t: 0,
    dt: 1.5,
    x: [0, 0, 0],
    // initial velocity of the star (AU/day). The vector contains the 3
    // velocity components for each body, (v_x^0, v_y^0, v_z^0, v_x^1, v_y^1, v_z^1, ...),
    // so that the are 3*nplanets components.
    v: [0, 0, 0],
    // initial mass of the star (MSUN). The vector contains the masses of
    // all the bodies in the system.
    M: [1],
    paused: false,
    currentLevel: 0,
    
    initialize: function() {
        minDepth = TransitDepthMinScale(Levels[this.currentLevel].starRadius);
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
    
    addPlanet: function(x, y) {
        var r = Math.sqrt(x*x + y*y);
        var v_circ = Math.sqrt(K2/r);
        
        this.x.push(x, y, 0);
        this.v.push(-v_circ * y/r, v_circ * x/r, 0);
        this.M.push(0);

        app.trigger('add:planet');
    },

    movePlanet: function(n, x, y) {
        var r = Math.sqrt(x*x + y*y);
        var v_circ = Math.sqrt(K2/r);
        this.x[n*NPHYS+X] = x;
        this.x[n*NPHYS+Y] = y;
        this.v[n*NPHYS+X] = -v_circ * y/r;
        this.v[n*NPHYS+Y] = v_circ * x/r;
        
    },
    
    tick: function() {
        if (this.paused)
            return;
        
        Physics.leapfrog(this.t + this.dt, this);
        this.t += this.dt;

        // Compute light curve
        var dip = lightCurve(this.x[NPHYS+X], this.y[NPHYS+Y], this.z[NPHYS+Z],
                             Levels[this.currentLevel])
        
        function lightCurve (xPos, yPos, zPos, starRadius, planetRadius)
        
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
