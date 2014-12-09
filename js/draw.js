var brPaper = new paper.PaperScope();
brPaper.setup(document.getElementById('br-canvas'));

var view = brPaper.view;


var BRGameCanvas = Backbone.View.extend({
    PIXELS_PER_AU: 200,
    STAR_SCALE: 1,
    STAR_SIZE: 50,
    PLANET_SIZE:10,
    planetItems: [],
    
    initialize: function() {

        // Star colors
        var COLOR_SUN_INNER = 'white';
        var COLOR_SUN_OUTER = 'rgba(255, 254, 181, 1)';
        var COLOR_SUN_OUTER2 = 'rgba(255, 254, 181, 0.8)';
        var COLOR_SUN_OUTER3 = 'rgba(255, 254, 181, 0)';
        var COLOR_SUN_HALO_INNER = 'rgba(200,200,0,0.5)';
        var COLOR_SUN_HALO_OUTER = 'rgba(200,200,0,0.)';

        var star = new brPaper.Path.Circle({
            center: brPaper.view.center,
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
        star.center = view.center;

        this.star = star;
        this.listenTo(app, "add:planet", this.addPlanet);
    },
    
    resize: function() {
        this.star.center = view.center;
    },

    frame: function() {
        app.tick();
        this.updatePlanets();

        requestAnimationFrame(function() {
            brCanvas.frame();
        });
    },

    mouseDown: function(event) {
        if (app.nplanets() >= 1)
            return;
        
        event.position = [event.point.x - this.star.position.x, event.point.y - this.star.position.y];
        event.position[0] /= this.PIXELS_PER_AU;
        event.position[1] /= this.PIXELS_PER_AU;
        app.addPlanet(event.position[0], event.position[1]);
    },

    updatePlanets: function() {
        for (var i = 0; i < app.nplanets(); i++) {
            var x = app.coords(i+1);
            var v = app.vels(i+1);
            
            var center = new brPaper.Point((x[0] * this.PIXELS_PER_AU),
                                   (x[1] * this.PIXELS_PER_AU));
            center.x += this.star.center.x;
            center.y += this.star.center.y;
            
            this.planetItems[i].position = center;
        }

        blCanvas.updatePlanets();
    },
    
    addPlanet: function() {
        var planet = new brPaper.Path.Circle({
            center: view.center,
            radius: this.PLANET_SIZE,
            fillColor: 'blue'            
        });

        this.planetItems.push(planet);
        blCanvas.addPlanet();
        this.updatePlanets();

    }
    
});

brCanvas = new BRGameCanvas({ model: app });

var brTool = new brPaper.Tool();
brTool.onResize = _.bind(brCanvas.resize, brCanvas);
brTool.onMouseDown = _.bind(brCanvas.mouseDown, brCanvas);
view.onFrame = _.bind(brCanvas.frame, brCanvas);
