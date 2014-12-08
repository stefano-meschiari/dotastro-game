

var GameCanvas = Backbone.View.extend({
    STAR_SIZE: 100,
    
    initialize: function() {

        // Star colors
        var COLOR_SUN_INNER = 'white';
        var COLOR_SUN_OUTER = 'rgba(255, 254, 181, 1)';
        var COLOR_SUN_OUTER2 = 'rgba(255, 254, 181, 0.8)';
        var COLOR_SUN_OUTER3 = 'rgba(255, 254, 181, 0)';
        var COLOR_SUN_HALO_INNER = 'rgba(200,200,0,0.5)';
        var COLOR_SUN_HALO_OUTER = 'rgba(200,200,0,0.)';

        // Create a star object, position at center
        var star = new Path.Circle({
            center: view.center,
            radius:this.STAR_SIZE 
        });

        star.fillColor = {
            gradient: {
                stops:[[COLOR_SUN_INNER, 0.075],[COLOR_SUN_OUTER, 0.85],[COLOR_SUN_OUTER2, 0.85], [COLOR_SUN_OUTER3, 1]],
                radial:true
            },
            origin: star.position,
            destination: star.bounds.rightCenter
        };

        this.star = star;        
    },

    
    
    resize: function() {
        this.star.position = view.center;
        console.log(view.center, this.star.center);
    },

    frame: function() {
        // Put animation-related code here
    }
    
});

gameCanvas = new GameCanvas({ model: app });

onResize = _.bind(gameCanvas.resize, gameCanvas);
onFrame = _.bind(gameCanvas.frame, gameCanvas);
