var COLOR_SUN_INNER = 'white';
var COLOR_SUN_OUTER = 'rgba(255, 254, 181, 1)';
var COLOR_SUN_OUTER2 = 'rgba(255, 254, 181, 0.8)';
var COLOR_SUN_OUTER3 = 'rgba(255, 254, 181, 0)';
var COLOR_SUN_HALO_INNER = 'rgba(200,200,0,0.5)';
var COLOR_SUN_HALO_OUTER = 'rgba(200,200,0,0.)';

PIXELS_PER_AU = 100;
LEFT_ZOOM = 2;
STAR_SCALE = 1;
STAR_SIZE = 40;
RIGHT_INFLATE = 2;
PLANET_SIZE = STAR_SIZE * Units.RJUP/Units.RSUN;
PLANET_COLOR = '#34AADC';

LEFT_FRACTION = 0.4;
LEFT_WIDTH = LEFT_FRACTION*view.bounds.width;

var LeftCanvas = Backbone.View.extend({
    planetItems: [],
    center:null,

    initialize: function() {
        
        this.center = new Point(0.5 * LEFT_FRACTION * view.bounds.width,
                                0.5 * view.bounds.height);

        var star = new Path.Circle({
            center: this.center,
            radius: STAR_SIZE*LEFT_ZOOM
        });

        star.fillColor = {
            gradient: {
                stops:[[COLOR_SUN_INNER, 0.075],[COLOR_SUN_OUTER, 0.85],[COLOR_SUN_OUTER2, 0.85], [COLOR_SUN_OUTER3, 1]],
                radial:true
            },
            origin: star.position,
            destination: star.bounds.rightCenter
        };

        star.position = this.center;
        this.star = star;
        this.listenTo(app, "add:planet", this.addPlanet);

    },

    addPlanet: function() {
        var planet = new Path.Circle({
            center: this.center,
            radius: LEFT_ZOOM*PLANET_SIZE,
            fillColor: PLANET_COLOR            
        });

        this.planetItems.push(planet);
        this.updatePlanets();        
    },

    
    updatePlanets: function() {
        var vcenter = this.center;

        for (var i = 0; i < app.nplanets(); i++) {
            var planet = this.planetItems[i];
            var x = app.coords(i+1);
            var v = app.vels(i+1);
            
            var center = new Point((x[0] * PIXELS_PER_AU),
                                   (x[2] * PIXELS_PER_AU));
            center.x += vcenter.x;
            center.y += vcenter.y;
            
            planet.position = center;

            planet.visible = (planet.position.x < LEFT_WIDTH);
            if (x[1] < 0)
                planet.insertBelow(this.star);
            else
                planet.insertAbove(this.star);
        }

    }
});

var GameCanvas = Backbone.View.extend({
    planetItems: [],
    
    center:null,

    rasters: {},
    
    initialize: function() {
        
        this.center =
            new Point((LEFT_FRACTION + 0.5 * (1-LEFT_FRACTION)) * view.bounds.width,
                      0.5 * view.bounds.height);


        var div = new Path.Line(new Point(LEFT_WIDTH, 0), 
                                new Point(LEFT_WIDTH, view.bounds.height));
        div.strokeColor = 'white';

        var auCircle = new Path.Circle({
            center: this.center,
            radius: PIXELS_PER_AU,
            strokeColor: 'grey'
        });
        
        var star = new Path.Circle({
            center: this.center,
            radius: STAR_SIZE
        });

        star.fillColor = {
            gradient: {
                stops:[[COLOR_SUN_INNER, 0.075],[COLOR_SUN_OUTER, 0.85],[COLOR_SUN_OUTER2, 0.85], [COLOR_SUN_OUTER3, 1]],
                radial:true
            },
            origin: star.position,
            destination: star.bounds.rightCenter
        };

        star.position = this.center;
        
        this.star = star;

        this.listenTo(app, "add:planet", this.addPlanet);
    },
    
    resize: function() {
        this.star.center = view.center;
    },

    frame: function() {
        app.tick();
        this.updatePlanets();
        leftCanvas.updatePlanets();
    },

    mouseDown: function(event) {
        if (app.nplanets() >= 1)
            return;
        var center = this.center;

        event.position = [event.point.x - center.x, event.point.y - center.y];
        
        if (event.point.x < LEFT_WIDTH)
            return;
        event.position[0] /= PIXELS_PER_AU;
        event.position[1] /= PIXELS_PER_AU;
        
        app.addPlanet(event.position[0], event.position[1]);
    },

    updatePlanets: function() {
        var vcenter = this.center;

        for (var i = 0; i < app.nplanets(); i++) {
            var x = app.coords(i+1);
            var v = app.vels(i+1);
            
            var center = new Point((x[0] * PIXELS_PER_AU),
                                   (x[1] * PIXELS_PER_AU));
            center.x += vcenter.x;
            center.y += vcenter.y;

            var planet = this.planetItems[i];
            planet.position = center;
            planet.handle.position = center;
        }

    },
    
    addPlanet: function() {
        var index = app.nplanets();
        var center = this.center;
        
        var planet = new Path.Circle({
            center: this.center,
            radius: RIGHT_INFLATE * PLANET_SIZE,
            fillColor: PLANET_COLOR            
        });

        var planetHandle = new Path.Circle({
            center: this.center,
            radius: 10 * RIGHT_INFLATE * PLANET_SIZE,
            fillColor: 'rgba(0, 0, 0, 0)'            
        });

        planet.handle = planetHandle;
        planet.handle.insertBelow(planet);

        planet.mouseDown = function() {
            app.paused = true;
            console.log('hi');
        };

        planet.mouseUp = function() {
            app.paused = false;
        };
        
        planet.drag = function(event) {
            
            event.position = [event.point.x - center.x, event.point.y - center.y];
        
            if (event.point.x < LEFT_WIDTH)
                return;
            event.position[0] /= PIXELS_PER_AU;
            event.position[1] /= PIXELS_PER_AU;

            app.movePlanet(index,
                           event.position[0],
                           event.position[1]);
        };

        planet.on("mousedown", planet.mouseDown);
        planet.on("mouseup", planet.mouseUp);
        planet.on("mousedrag", planet.drag);
        planet.handle.on("mousedown", planet.mouseDown);
        planet.handle.on("mouseup", planet.mouseUp);
        planet.handle.on("mousedrag", planet.drag);
        
        
        this.planetItems.push(planet);
        this.updatePlanets();
    }
    
});

rightCanvas = new GameCanvas({ model: app });
leftCanvas = new LeftCanvas({ model:app });

onResize = _.bind(rightCanvas.resize, rightCanvas);
onMouseDown = _.bind(rightCanvas.mouseDown, rightCanvas);
onFrame = _.bind(rightCanvas.frame, rightCanvas);
