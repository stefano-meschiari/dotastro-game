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
    
    <link rel="stylesheet" href="css/main.css">
    
    <script src="bower_components/modernizer/modernizr.js"></script>        
    
  </head>
  <body>
    <!--[if lt IE 7]>
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


    <div id="app" class="full-size">
      <div id="canvas-container">
        <canvas id="canvas" resize keepalive="true"></canvas>
      </div>

      <div id="right-sidebar">
        Info, params, etc.
      </div>
    </div>


    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="bower_components/underscore/underscore-min.js"></script>
    <script type="text/javascript" src="bower_components/backbone/backbone.js"></script>
    
    <script type="text/javascript" src="bower_components/paper/dist/paper-full.min.js"></script>

    <script type="text/paperscript" canvas="canvas" src="js/draw.js"></script></script>



  </body>
</html>
