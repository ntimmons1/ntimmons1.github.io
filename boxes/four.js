/**
 * JavaScript file that goes along with Workbook 1, Page 3
 * 
 * this file is pretty empty - we expect the student to fill it in
 * 
 * everything is put into one big function that gets run "onload"
 */
// note that we don't do a global "use strict" because this can create a problem
// if we include another file
// "use strict";

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

/* to make things easy, we'll define functions for each of the exercises
 * window.onload will call each in turn
 * the student should fill in these three functions
 */

function ex1() {
     /**
      * Student should put the code to solve exercise 1 here
      */

    // student should remove this next line
    document.getElementById("box01").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
}

function ex2() {
    /**
     * Student should put the code to solve exercise 2 here
     */
    // student should remove this next line
    document.getElementById("box02").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
}

function ex3() {
    /**
     * Student should put the code to solve exercise 3 here
     */
    // as a hint - this will at least change the background color (but not animate it)
    let text = document.getElementById("ex3-span");
    text.style.backgroundColor = "#CCFFCC";

    // student should remove this next line
    document.getElementById("box03").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
}

window.onload = function() {
    console.log("ONLOAD");
    if (document.getElementById("box01")) ex1(); // we are in box 1
    if (document.getElementById("box02")) ex2(); // we are in box 2
    if (document.getElementById("box03")) ex3(); // we are in box 3


    /**
    * Code for Box 1
    */

    /** @type{HTMLInputElement} */ let slider11 = (/** @type{HTMLInputElement} */ document.getElementById("box1-slider1"));
    /** @type{HTMLInputElement} */ let slider12 = (/** @type{HTMLInputElement} */ document.getElementById("box1-slider2"));
    /** @type{HTMLInputElement} */ let slider13 = (/** @type{HTMLInputElement} */ document.getElementById("box1-slider3"));
    
    if (slider11 && slider12 && slider13){
        slider11.onchange = function() {
            // window.alert(slider11.value)
            slider13.value = getDiff();
            // window.alert(slider13.value)
        };

        slider12.onchange = function() {
            slider13.value = getDiff();
        };

        // slider13.onchange = function() {
            // slider11.value = slider41.value;
            // slider12.value = slider41.value;
        // };
        function getDiff(){
            var a = Number(slider11.value);
            var b = Number(slider12.value);

            if(a>b){
                return (a-b);
            }
            else{
                return (b-a);
            }
        }
    }

        /**
    * Code for Box 2
    */

    /** @type{HTMLInputElement} */ let slider21 = (/** @type{HTMLInputElement} */ document.getElementById("box2-slider1"));
    /** @type{HTMLInputElement} */ let btnStart = (/** @type{HTMLInputElement} */ document.getElementById("box2-buttonStart"));
    /** @type{HTMLInputElement} */ let btnStop = (/** @type{HTMLInputElement} */ document.getElementById("box2-buttonStop"));
    if (slider21 && btnStart && btnStop){
        var go = false;
        btnStart.onclick = function(){
            go = true;
        }
        btnStop.onclick = function(){
            go = false;
        }

        function moveSlider(){
            var speed = go ? 2 : 0 ;
            let newValue = (Number(slider21.value)+speed) % 100;
            if (newValue < 0) {newValue = 100;}
            slider21.value = newValue.toString();
            window.requestAnimationFrame(moveSlider);
        }
        moveSlider();
    }


    /**
    * Code for Box 3
    */

    /** @type{HTMLInputElement} */ let chgTxt = (/** @type{HTMLInputElement} */ document.getElementById("ex3-span"));

    var i = 0;
    function chgColor(){
        if(i>32){i = 0;}
        var r  = Math.sin(i + 0) * 127 + 128;
        var g = Math.sin(i + 2) * 127 + 128;
        var b  = Math.sin(i + 4) * 127 + 128;
        i = i+.2;

        chgTxt.style.backgroundColor = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
    }
    window.setInterval(chgColor, 75)
};