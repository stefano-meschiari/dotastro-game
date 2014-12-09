
var GameCanvas = Backbone.View.extend({
    PIXELS_PER_AU: 200,
    LEFT_PIXELS_PER_AU: 400,
    STAR_SCALE: 1,
    STAR_SIZE: 50,
    LEFT_STAR_SIZE: 100,
    
    PLANET_SIZE:10,
    LEFT_FRACTION:0.4,
    planetItems: [],
    leftPlanetItems: [],
    
    leftCenter:null,
    rightCenter:null,
    
    initialize: function() {
        var LEFT_FRACTION = this.LEFT_FRACTION;
        
        this.rightCenter =
            new Point((LEFT_FRACTION + 0.5 * (1-LEFT_FRACTION)) * view.bounds.width,
                                    0.5 * view.bounds.height);

        this.leftCenter = new Point(0.5 * LEFT_FRACTION * view.bounds.width,
                                    0.5 * view.bounds.height);
        
        // Star colors
        var COLOR_SUN_INNER = 'white';
        var COLOR_SUN_OUTER = 'rgba(255, 254, 181, 1)';
        var COLOR_SUN_OUTER2 = 'rgba(255, 254, 181, 0.8)';
        var COLOR_SUN_OUTER3 = 'rgba(255, 254, 181, 0)';
        var COLOR_SUN_HALO_INNER = 'rgba(200,200,0,0.5)';
        var COLOR_SUN_HALO_OUTER = 'rgba(200,200,0,0.)';

        var star = new Path.Circle({
            center: view.center,
            radius: this.STAR_SIZE
        });

        star.fillColor = {
            gradient: {
                stops:[[COLOR_SUN_INNER, 0.075],[COLOR_SUN_OUTER, 0.85],[COLOR_SUN_OUTER2, 0.85], [COLOR_SUN_OUTER3, 1]],
                radial:true
            },
            origin: star.position,
            destination: star.bounds.rightCenter
        };

        star.position = this.rightCenter;
        
        this.star = star;

        var leftStar = new Path.Circle({
            center: view.center,
            radius: this.LEFT_STAR_SIZE
        });

        leftStar.fillColor = {
            gradient: {
                stops:[[COLOR_SUN_INNER, 0.075],[COLOR_SUN_OUTER, 0.85],[COLOR_SUN_OUTER2, 0.85], [COLOR_SUN_OUTER3, 1]],
                radial:true
            },
            origin: leftStar.position,
            destination: leftStar.bounds.rightCenter
        };

        leftStar.position = this.leftCenter;
        
        this.leftStar = leftStar;
        
        this.listenTo(app, "add:planet", this.addPlanet);
    },
    
    resize: function() {
        this.star.center = view.center;
    },

    frame: function() {
        app.tick();
        this.updatePlanets();
    },

    mouseDown: function(event) {
        if (app.nplanets() >= 1)
            return;
        var rightCenter = this.rightCenter;
        
        event.position = [event.point.x - rightCenter.x, event.point.y - rightCenter.y];
        event.position[0] /= this.PIXELS_PER_AU;
        event.position[1] /= this.PIXELS_PER_AU;
        
        app.addPlanet(event.position[0], event.position[1]);
    },

    updatePlanets: function() {
        var rightCenter = this.rightCenter;
        var leftCenter = this.leftCenter;

        for (var i = 0; i < app.nplanets(); i++) {
            var x = app.coords(i+1);
            var v = app.vels(i+1);
            
            var center = new Point((x[0] * this.PIXELS_PER_AU),
                                   (x[1] * this.PIXELS_PER_AU));
            center.x += rightCenter.x;
            center.y += rightCenter.y;
            
            this.planetItems[i].position = center;

            center = new Point((x[0] * this.LEFT_PIXELS_PER_AU),
                                   (x[2] * this.LEFT_PIXELS_PER_AU));
            center.x += leftCenter.x;
            center.y += leftCenter.y;

            this.leftPlanetItems[i].position = center;
            if (x[1] < 0)
                this.leftPlanetItems[i].insertBelow(this.leftStar);
            else
                this.leftPlanetItems[i].insertAbove(this.leftStar);
        }

    },
    
    addPlanet: function() {
        var planet = new Path.Circle({
            center: view.center,
            radius: this.PLANET_SIZE,
            fillColor: 'blue'            
        });

        this.planetItems.push(planet);
        this.leftPlanetItems.push(planet.clone());

        this.updatePlanets();

    }
    
});

brCanvas = new GameCanvas({ model: app });

onResize = _.bind(brCanvas.resize, brCanvas);
onMouseDown = _.bind(brCanvas.mouseDown, brCanvas);
onFrame = _.bind(brCanvas.frame, brCanvas);
