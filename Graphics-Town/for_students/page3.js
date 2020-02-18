/**
 * page3.js - a simple JavaScript file that gets loaded with
 * page 3 of Workbook 2 of CS559
 * 
 * started by Michael Gleicher, January 2019
 * modified by Florian Heimerl, August 2019
 * 
 * finished by STUDENT
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
 * Put your code for picture 1 here
 * 
 * Remember to make:
 * - a circle
 * - a triangle
 * - a capsule (two semi-circles with straight lines connecting them)
 * - a sawtooth / mountain
 */
function wb2_pg3_ex1() {
    // use type information to make TypeScript happy
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas1"));
    
    // the student should fill in the rest...
    let context1 = canvas.getContext("2d");
    context1.fillStyle = "red";
    context1.arc(100, 50, 35, 0, Math.PI * 2);
    context1.fill();
    context1.lineWidth = 3;
    context1.strokeStyle = 'blue';
    context1.stroke();   

    let context2 = canvas.getContext("2d");
    context2.beginPath()
    context2.moveTo(210, 10);
    context2.lineTo(210, 80);
    context2.lineTo(350, 80);
    context2.closePath();
    context2.lineWidth = 5;
    context2.stroke();
    context2.fillStyle = "red";
    context2.fill();

    let context3 = canvas.getContext("2d");

    context2.beginPath();
    context3.arc(50, 150, 35, Math.PI/2, Math.PI*1.5);
    context3.lineTo(125, 115)
    context3.arc(125, 150, 35, Math.PI*1.5, Math.PI/2);
    context3.lineTo(50, 185)
    context3.lineWidth = 5;
    context3.strokeStyle = 'blue';
    context3.stroke();  
    context3.closePath();
    context3.fillStyle = "red";
    context3.fill();

    let context4 = canvas.getContext("2d");
    context4.beginPath();
    context4.strokeStyle = 'blue';
    context4.lineWidth = 5;
    context4.moveTo(210,190);
    context4.lineTo(210,150);
    context4.lineTo(230,130);
    context4.lineTo(250,155);
    context4.lineTo(270,110);
    context4.lineTo(300,150);
    context4.lineTo(300,190);
    context4.lineTo(210,190);
    context4.stroke();
    context4.closePath;
    context4.fillStyle = "red";
    context4.fill();

}

/**
 * Put your code for picture 2 here
 */
function wb2_pg3_ex2() {
    // use type information to make TypeScript happy
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas2"));

    // the student should fill in the rest...
    //main face
    let context1 = canvas.getContext("2d");
    context1.beginPath();
    context1.arc(250, 250, 200, 0, Math.PI * 2);
    context1.fillStyle="yellow";
    context1.closePath();
    context1.fill();

    //eyes
    let context2 = canvas.getContext("2d");
    context2.beginPath();
    context2.fillStyle="black";
    context2.closePath();
    context2.fill();
    let context3 = canvas.getContext("2d");
    context3.beginPath();
    context3.ellipse(190, 180, 10, 20, 0, 0, 2 * Math.PI);
    context3.ellipse(310, 180, 10, 20, 0, 0, 2 * Math.PI);
    context3.fillStyle="black";
    context3.closePath();
    context3.fill();

    //mouth
    let context4 = canvas.getContext("2d");    
    context4.beginPath();
    // context4.arc(250, 250, 100, 0, Math.PI);
    context4.moveTo(150,250);
    context4.bezierCurveTo(180,400,320,400,350,250);
    context4.moveTo(150,250);
    context4.bezierCurveTo(180,300,320,300,350,250);
    context4.strokeStyle = 'black';
    context4.lineWidth = 6;
    // context4.closePath();
    context4.stroke();
    // context4.fill();

    let context5 = canvas.getContext("2d");
    context5.beginPath();
    context5.strokeStyle="white";
    context5.fillStyle="white";
    context5.fillRect(220,288,60,40);
    context5.moveTo(250,288);
    context5.lineTo(250,328);
    context5.stroke();
    context5.strokeStyle="black";
    context5.lineWidth=5
    context5.closePath();
    context5.stroke();
    context5.fill();

    let context6 = canvas.getContext("2d");
    context6.beginPath();
    var x=100,y=290,inR=5,outR=70,r=40;
    var gradient = context6.createRadialGradient(x,y,inR,x,y,outR);
    gradient.addColorStop(1,"white");
    gradient.addColorStop(0,"red");
    context6.arc(x,y,r,0,2*Math.PI);
    context6.fillStyle=gradient;
    context6.globalAlpha = .5
    context6.fill();

    let context7 = canvas.getContext("2d");
    context7.beginPath();
    var x=400,y=290,inR=5,outR=70,r=40;
    var gradient = context7.createRadialGradient(x,y,inR,x,y,outR);
    gradient.addColorStop(1,"white");
    gradient.addColorStop(0,"red");
    context7.arc(x,y,r,0,2*Math.PI);
    context7.fillStyle=gradient;
    context7.globalAlpha = .5
    context7.fill();

}

/**
 * you don't need to change this
 */
window.onload = function()
{
    wb2_pg3_ex1();
    wb2_pg3_ex2();
}