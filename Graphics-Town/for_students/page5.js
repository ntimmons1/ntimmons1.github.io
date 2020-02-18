/**
 * page5.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 2 (CS559)
 * 
 * started by Michael Gleicher, January 2019
 * modified by Florian Heimerl, August 2019
 * 
 * but filled in by STUDENT
 * 
 * Note: the student code should go into the functions
 * wb2_pg5_ex1 and wb2_pg5_ex2
 * 
 */

// we do enable typescript type checking - see
// http://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better 
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex1() 
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex1canvas"));
        let context = canvas.getContext('2d');

        let circles = []

        let mouseX = -10;
        let mouseY = -10; 
        canvas.onmousemove = function(event) {
                mouseX = event.clientX;
                mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;
        };
        canvas.onmouseleave = function() {
                mouseX = -10;
                mouseY = -10;
        };

        canvas.onclick = function(event) {
                let x = event.clientX;
                let y = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                x -= box.left;
                y -= box.top;
                circles.push({"x":x,"y":y});
        };

        function box1animate() {
                context.clearRect(0,0,canvas.width,canvas.height);
                circles.forEach(function(circ){
                        context.save();
                        var dist = Math.hypot(circ.x-mouseX,circ.y-mouseY);
                        if (dist < 10){
                                context.beginPath();
                                context.fillStyle = "#CD6155";
                                context.arc(circ.x, circ.y, 10, 0, Math.PI * 2);
                                context.fill();
                                context.closePath();
                        }
                        else{
                                context.beginPath();
                                context.fillStyle = "#7FB3D5";
                                context.arc(circ.x, circ.y, 10, 0, Math.PI * 2);
                                context.fill();
                                context.closePath();
                        }
                        context.restore();

                });
                window.requestAnimationFrame(box1animate);
            }
            box1animate();
}

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex2()
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex2canvas"));
        let context = canvas.getContext('2d');

        let fireworks = []

        let mouseX = -10;
        let mouseY = -10; 
        canvas.onmousemove = function(event) {
                mouseX = event.clientX;
                mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;
        };
        canvas.onmouseleave = function() {
                mouseX = -10;
                mouseY = -10;
        };

        canvas.onclick = function(event) {
                let x = event.clientX;
                let y = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                x -= box.left;
                y -= box.top;
                fireworks.push({"xO":canvas.width/2,"yO":canvas.height/Math.random(),"xD":mouseX,"yD":mouseY,"exploded":false,"bits":[]});
        };

        function box1animate() {
                context.clearRect(0,0,canvas.width,canvas.height);
                fireworks.forEach(function(fw){
                        context.save();
                        var p = .05
                        if(fw.yO-10<=fw.yD && fw.exploded !=true){
                                // alert()
                                fw.exploded=true;
                                for(var i=0; i<20; i++){
                                        
                                        fw.bits.push({
                                        "xO":fw.xD,
                                        "yO":fw.yD-10,
                                        "xD":canvas.width*Math.random(),
                                        "yD":canvas.height*Math.random(),
                                        "life":40
                                });
                                }
                        }
                        if(fw.exploded){
                                fw.bits.forEach(function(b){
                                        if(b.life<=0){
                                                b.xO=canvas.width+100;
                                                b.yO=canvas.width+100;
                                        }
                                        b.life=b.life-1;
                                        b.xO=b.xO*(1-p)+b.xD*p;
                                        b.yO=b.yO*(1-p)+b.yD*p;
                                        // context.globalAlpha= b.life%100;
                                        context.fillRect(b.xO,b.yO,3,3);
                                });

                        }
                        else{
                                fw.xO=fw.xO*(1-p)+fw.xD*p;
                                fw.yO=fw.yO*(1-p)+fw.yD*p;
                                context.beginPath();
                                context.fillStyle = "#CD6155";
                                context.arc(fw.xO, fw.yO, 8, 0, Math.PI * 2);
                                context.fill();
                                context.closePath();
                                context.restore();
                        }

                });
                window.requestAnimationFrame(box1animate);
            }
            box1animate();


}

/**
 * Function to run the student's code
 */
window.onload = function() {
    wb2_pg5_ex1();
    wb2_pg5_ex2();
};