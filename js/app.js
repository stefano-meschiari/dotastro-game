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



var App = Backbone.ROComputedModel.extend({
    planets: [],

    addPlanet: function(x, y) {
        var r = Math.sqrt(x*x + y*y);
        var v_circ = Math.sqrt(K2/r);
        
        planets.push({
            x: x,
            y: y,
            z: 0,
            u: x/r,
            v: -y/r,
            w: 0
        });

        app.trigger('add:planet');
    }
    
});

app = new App();

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
