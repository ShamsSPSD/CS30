
<html>

<head>
    <title>Sine Wave</title>
    <script type="text/javascript">
        function showAxes(ctx,axes) {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            var xMin = 0;
            
            ctx.beginPath();
            ctx.strokeStyle = "rgb(128,128,128)";
            
            // X-Axis
            ctx.moveTo(xMin, height/2);
            ctx.lineTo(width, height/2);
            
            // Y-Axis
            ctx.moveTo(width/2, 0);
            ctx.lineTo(width/2, height);

            // Starting line
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);
            
            ctx.stroke();
        }
        function drawPoint(ctx, y) {            
            var radius = 3;
            ctx.beginPath();

            // Hold x constant at 4 so the point only moves up and down.
            ctx.arc(4, y, radius, 0, 2 * Math.PI, false);

            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        function plotSine(ctx, xOffset, yOffset) {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            var scale = 20;

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(66,44,255)";

            // console.log("Drawing point...");
            // drawPoint(ctx, yOffset+step);
            
            var x = 4;
            var y = 0;
            var amplitude = 40;
            var frequency = 20;
            //ctx.moveTo(x, y);
            ctx.moveTo(x, 50);
            while (x < width) {
                y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
                ctx.lineTo(x, y);
                x++;
                // console.log("x="+x+" y="+y);
            }
            ctx.stroke();
            ctx.save();

            console.log("Drawing point at y=" + y);
            drawPoint(ctx, y);
            ctx.stroke();
            ctx.restore();
        }
        function draw() {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");

            context.clearRect(0, 0, 500, 500);
            showAxes(context);
            context.save();            
            
            plotSine(context, step, 50);
            context.restore();
            
            step += 4;
            window.requestAnimationFrame(draw);
        }
        function spirograph() {            
            var canvas2 = document.getElementById("canvas2");
            var context = canvas2.getContext("2d");
            
            showAxes(context);
            context.save();
            // var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var step = 4;
            for (var i = -4; i < canvas.height; i += step) {
                // context.putImageData(imageData, 0, 0);
                plotSine(context, i, 54 + i);
            }
        }
        function init() {
            window.requestAnimationFrame(draw);
            spirograph();
        }
        var step = -4;
    </script>
</head>

<body onload="init()">
    <h3>Oscillating Sine Wave</h3>
    <canvas id="canvas" width="500" height="100"></canvas>
    <p/>
    <h3>Multiple Sine Waves</h3>
    <canvas id="canvas2" width="500" height="100"/>
</body>

</html>