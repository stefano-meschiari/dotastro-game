<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>.Astronomy game template</title>
    <meta name="description" content="We shall see, shan't we?">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    
    <script src="bower_components/modernizer/modernizr.js"></script>        
    
  </head>
  <body>
    <!--[if lt IE 7]>
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


    <div id="app">
      <div id="top-layer">
        <div id="top-left">          
        </div>
        <div id="top-right">
        </div>
      </div>
      
      <div id="bottom-layer">
        <div class="message"><i class="fa fa-hand-o-down"></i> Tap here!</div>
        <canvas id="canvas" class="full-size" keepalive="true"></canvas>
      </div>
    </div>
    <div style="display:none">
      <img src="img/Pearth.png" id="earth">
    </div>


    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="bower_components/underscore/underscore-min.js"></script>
    <script type="text/javascript" src="bower_components/backbone/backbone.js"></script>
    
    <script type="text/javascript" src="bower_components/paper/dist/paper-full.min.js"></script>
    <script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="highcharts/highcharts.js"></script>
    <script type="text/javascript" src="highcharts/exporting.js"></script> 
    <script type="text/javascript" src="highcharts/dark-unica.js"></script>
    
    <script type="text/javascript" src="js/defines.js"></script>
    <script type="text/javascript" src="js/units.js"></script>    
    <script type="text/javascript" src="js/math.js"></script>    
    <script type="text/javascript" src="js/physics.js"></script>    

    <script type="text/javascript" src="js/utils.js"></script> 
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/draw_graph.js"></script> 


    <script type="text/paperscript" canvas="canvas" src="js/draw.js"></script>

  </body>
</html>

