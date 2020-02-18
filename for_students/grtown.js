/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 * 
 * This is the main file - it creates the world, populates it with 
 * objects and behaviors, and starts things running
 * 
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 * 
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import * as T from "./THREE/src/Three.js";
import { GrWorld } from "../framework/GrWorld.js";
//import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import { WorldUI } from "./Framework/WorldUI.js";
import { OBJLoader } from "./THREE/examples/jsm/loaders/OBJLoader.js";

/** These imports are for the examples - feel free to remove them */
import {SimpleHouse} from "./Examples/house.js";
import {CircularTrack, TrackCube, TrackCar, Bulldozer, OblongTrack, DirtPile} from "./Examples/track.js";
import {Helicopter, Helipad} from "./Examples/helicopter.js";
import {ShinySculpture} from "./Examples/shinySculpture.js";
import {MorphTest} from "./Examples/morph.js";
import * as H from "./CustomObjects.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";
import { SimpleGroundPlane } from "./Framework/GroundPlane.js";

/**
 * The Graphics Town Main - 
 * This builds up the world and makes it go...
 */
function grtown() {
    // make the world
    let world = new GrWorld({
        width:1000, height:600,         // make the window reasonably large
        groundplanesize:25              // make the ground plane big enough for a world of stuff
    });

    // put stuff into it - you probably want to take the example stuff out first
    function getRndInteger(min, max) {
        return Math.random() * (max - min)  + min;
      }

    function diff (num1, num2) {
    if (num1 > num2) {
        return (num1 - num2);
    } else {
        return (num2 - num1);
    }
    };
    
    function dist (x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
    };

    /********************************************************************** */
    /** EXAMPLES - student should remove these and put their own things in  */
    /***/
    // make two rows of houses, mainly to give something to look at

    for(let i=-2; i<7; i+=5) {
        let sc1 = new H.SmallCastleObject();
        world.add(sc1);
        sc1.objects[0].scale.set(2,2,2);
        sc1.objects[0].position.x = -i;
        sc1.objects[0].position.z = -23;
        sc1.objects[0].rotateY(-Math.PI/2)

        let sc2 = new H.SmallCastleObject();
        world.add(sc2);
        sc2.objects[0].scale.set(2,2,2);
        sc2.objects[0].position.x = -i;
        sc2.objects[0].position.z = -18;
        sc2.objects[0].rotateY(-Math.PI/2)

        let sc3 = new H.SmallCastleObject();
        world.add(sc3);
        sc3.objects[0].scale.set(2,2,2);
        sc3.objects[0].position.x = -i;
        sc3.objects[0].position.z = -13;
        sc3.objects[0].rotateY(-Math.PI/2)
    }

    for(let i=-19; i<6; i+=5) {
        let sc1 = new H.SmallCastleObject();
        world.add(sc1);
        sc1.objects[0].scale.set(2,2,2);
        sc1.objects[0].position.x = -i;
        sc1.objects[0].position.z = 23;
        sc1.objects[0].rotateY(Math.PI/2)

        let sc2 = new H.SmallCastleObject();
        world.add(sc2);
        sc2.objects[0].scale.set(2,2,2);
        sc2.objects[0].position.x = -i;
        sc2.objects[0].position.z = 18;
        sc2.objects[0].rotateY(Math.PI/2)
    }

    for(let i=-23; i<-9; i+=5) {
        let sc1 = new H.hutObject();
        world.add(sc1);
        sc1.objects[0].scale.set(2,2,2);
        sc1.objects[0].position.x = i;
        sc1.objects[0].position.z = -23;
        sc1.objects[0].rotateY(Math.PI/2)

        if( i != -18){
            let sc2 = new H.hutObject();
            world.add(sc2);
            sc2.objects[0].scale.set(2,2,2);
            sc2.objects[0].position.x = i;
            sc2.objects[0].position.z = -18;
            sc2.objects[0].rotateY(Math.PI/2)
        }
        else{
            let cf = new H.CampfireObject();
            cf.objects[0].position.x = i;
            cf.objects[0].position.z = -18;
            world.add(cf);
        }

        let sc3 = new H.hutObject();
        world.add(sc3);
        sc3.objects[0].scale.set(2,2,2);
        sc3.objects[0].position.x = i;
        sc3.objects[0].position.z = -13;
        sc3.objects[0].rotateY(Math.PI/2)
    }

    let treesX = [-23,-18,-11,-13,-8,-8,-8,-10,-12,-24,-15,-21,-23];
    let treesZ = [13, 11, 18, 13, 19, 17, 22, 23, 24, 7, 9, 7, 9];
    for(let i=0; i<treesX.length; i++){
        let size = getRndInteger(2,4);
        let pt = new H.PineTreeObject();
        pt.objects[0].scale.set(size,size,size);
        pt.objects[0].position.x = treesX[i];
        pt.objects[0].position.z = treesZ[i];
        world.add(pt);
    }

    let mushX = [-23,-18,-11,-13,-8,-8,-8,-10,-12,-24,-15,-21,-23,-8, -11];
    let mushZ = [13, 11, 18, 13, 19, 17, 22, 23, 24, 7, 9, 7, 9, 10, 12];
    for(let i=0; i<20; i++){
        let m = new H.TextureMushroomObject();
        m.objects[0].position.x = -mushX[i];
        m.objects[0].position.z = -mushZ[i];
        world.add(m);
    }

    let lc1 = new H.LargeCastleObject();
    world.add(lc1);
    lc1.objects[0].position.x = -23.5;
    lc1.objects[0].scale.set(3,3,3);
    lc1.objects[0].rotateY(-Math.PI/2)

    let heli1 = new H.HelicopterObject(-1);
    world.add(heli1);
    heli1.objects[0].scale.set(2,2,2);

    let heli2 = new H.HelicopterObject(1);
    world.add(heli2);
    heli2.objects[0].scale.set(2,2,2);

    let shaderMat = shaderMaterial("/for_students/shaders/ex83.vs","/for_students/shaders/ex83.fs",
    {
        side:T.DoubleSide,
        uniforms: {
            num: {
                value: 75
              }
        }
    });
    let forestGroundGeo =  new T.PlaneGeometry(30, 20);
    var gp = new T.Mesh(forestGroundGeo, shaderMat);
    gp.position.y = .01;
    gp.rotateX( - Math.PI / 2);
    gp.position.x = 10;
    gp.position.z = -15;
    world.scene.add(gp);

    let wt=new T.TextureLoader().load("/Images/coblestone.jpg");
    let coblestoneMaterial = new T.MeshStandardMaterial({map:wt,roughness:1});
    var geo = new T.PlaneGeometry(43, 4, 1, 1);
    var plane = new T.Mesh(geo, coblestoneMaterial);
    plane.rotateX( - Math.PI / 2);
    plane.position.y = .01;
    plane.position.x = 3.5;
    world.scene.add(plane);

    let lake1 = new H.LakeObject();
    lake1.objects[0].position.set(-13,.01,26);
    world.add(lake1);

    let lake2 = new H.LakeObject();
    lake2.objects[0].position.set(23,.01,-11);
    world.add(lake2);

    new T.CubeTextureLoader()
    .setPath('/Images/skybox/thunder/')
    .load(
        [
        'thunder_ft.jpg',
        'thunder_bk.jpg',
        'thunder_up.jpg',
        'thunder_dn.jpg',
        'thunder_rt.jpg',
        'thunder_lf.jpg',
        ],     
        function (cubeTexture) {
            world.scene.background = cubeTexture;   
        } 
);

    /** Race Track - with three things racing around */
    // let track = new CircularTrack();
    // let tc1 = new TrackCube(track);
    // let tc2 = new TrackCube(track);
    // let tc3 = new TrackCar(track);

    console.log("TEST");
    console.log(world.groundplane);
    world.groundplane.mater

    let d = new DirtPile({"x":-9.5,"z":13});
    world.add(d);

    //Fire morph oject testing
    // for(var i=.1; i<.8; i + .1){
    //     // let size = getRndInteger(.5,1.5-i);
    //     let posX = getRndInteger(-i,i);
    //     let posZ = getRndInteger(-i,i);
    //     let f = new H.FireObject();
    //     f.objects[0].position.x = cf.objects[0].position.x + posX;
    //     f.objects[0].position.z = cf.objects[0].position.z + posZ;
    //     // let size = 1-()
    //     // f.objects[0].scale.set(size,size,size);
    //     // f.objects[0].visible = true;
    //     world.add(f);
    // }

    let bd = new H.BoulderObject(20,10);
    world.add(bd);

    let f2 = new H.Fire();
    f2.objects[0].scale.set(.02,.02,.02);
    f2.objects[0].rotateX(-Math.PI/2);
    f2.objects[0].position.x = -10;
    f2.objects[0].position.z = -10;
    world.add(f2);


    let track2 = new OblongTrack();
    world.add(track2);
    let b1 = new Bulldozer(track2,d,0,"bulldozer1");
    world.add(b1);
    let b2 = new Bulldozer(track2,d,150,"bulldozer2");
    world.add(b2);
    let b3 = new Bulldozer(track2,d,300,"bulldozer3");
    world.add(b3);

    for(var i=10; i<12; i = i + .5){
        // let d1
        let fw1 = new H.FireWorkObject({"start": new T.Vector3(-20,.1,i),"dest":new T.Vector3(getRndInteger(-22,-16),15,getRndInteger(1,10)), "delay":50});
        let fw2= new H.FireWorkObject({"start": new T.Vector3(-20,.1,-i),"dest":new T.Vector3(getRndInteger(-22,-16),15,getRndInteger(-1,-10)), "delay":50});
        world.add(fw1);
        world.add(fw2);
    }
    // // place things are different points on the track
    // tc2.u = 0.25;
    // tc3.u = 0.125;
    // // and make sure they are in the world
    // world.add(track);
    // world.add(tc1);
    // world.add(tc2);
    // world.add(tc3);

    /** Helicopter - first make places for it to land*/
    // world.add(new Helipad(-15,0,0));
    // world.add(new Helipad(15,0,0));
    // world.add(new Helipad(0,0,-17));
    // world.add(new Helipad(0,0,17));
    // let copter = new Helicopter();
    // world.add(copter);
    // copter.getPads(world.objects);

    // world.add(new ShinySculpture(world));

    // world.add(new MorphTest({x:10, y:3, r:2}));

    /** EXAMPLES - end - things after this should stay                      */
    /********************************************************************** */

    // build and run the UI

    // only after all the objects exist can we build the UI
    // @ts-ignore       // we're sticking a new thing into the world
    world.ui = new WorldUI(world);
    // now make it go!
    world.go();
    
}
Helpers.onWindowOnload(grtown);