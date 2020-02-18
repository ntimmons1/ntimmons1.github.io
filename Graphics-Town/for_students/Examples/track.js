/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Simple Circular Track - and an object that goes around on it
 */

import * as T from "../THREE/src/Three.js";
// we need the GrObject
import { GrObject } from "../Framework/GrObject.js";
import { GrCube } from "../Framework/SimpleObjects.js";
import * as Loaders from "../Framework/loaders.js";
import { WorldUI } from "../Framework/WorldUI.js";
import * as H from "../CustomObjects.js";
import {shaderMaterial} from "../Framework/shaderHelper.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value). 
 * They can also ask for the direction vector.
 */

function getRndInteger(min, max) {
    return Math.random() * (max - min)  + min;
  }

export class CircularTrack extends GrObject {
    constructor(params={}) {
        let radius = params.radius || 6;
        let width = params.width || 1;
        let ring = new T.RingGeometry(radius-width,radius+width,20,3);
        let material = new T.MeshStandardMaterial({side:T.DoubleSide, color:"#909090",roughness:1.0});
        let mesh = new T.Mesh(ring, material);
        mesh.rotateX(Math.PI/2);
        let group = new T.Group();
        group.add(mesh);
        group.translateX(params.x || 0);
        group.translateY(params.bias || 0.1); // raise track above ground to avoid z-fight
        group.translateZ(params.z || 0);
        super(`CircularTrack`,group);

        this.x = params.x || 0;
        this.z = params.z || 0;
        this.y = params.bias || 0.1;
        this.r = radius;
    }
    eval(u) {
        let p = u * 2 * Math.PI;
        return [this.x + this.r * Math.cos(p), this.y, this.z + this.r * Math.sin(p)];
    }
    tangent(u) {
        let p = u * 2 * Math.PI;
        // unit tangent vector - not the real derivative
        return [Math.sin(p), 0, -Math.cos(p)];
    }
}

/**
 * A simple object to go around a track - key thing, it knows the track so it can ask the track
 * where it should be 
 */
export class TrackCube extends GrCube {
    constructor(track, params={}) {
        super({});
        this.track = track;
        this.u = 0;
        this.rideable = this.objects[0];
    }
    tick(delta,timeOfDay) {
        this.u += delta / 2000;
        let pos = this.track.eval(this.u);
        // remember, the center of the cube needs to be above ground!
        this.objects[0].position.set(pos[0],0.5+pos[1],pos[2]);
        let dir = this.track.tangent(this.u);
        // since we can't easily construct the matrix, figure out the rotation
        // easy since this is 2D!
        let zAngle = Math.atan2(dir[2],dir[0]);
        // turn the object so the Z axis is facing in that direction
        this.objects[0].rotation.y = -zAngle - Math.PI/2;
    }
}
/**
 * A Less Simple Object to go around the track
 */
export class TrackCar extends Loaders.FbxGrObject {
    constructor(track) {
        super({fbx:"./Examples/Assets/teeny racecar.fbx",norm:2.0,name:"Track Car"});
        this.track = track;
        this.u = 0;
        // the fbx loader puts the car on the ground - we need a ride point above the ground
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }
    tick(delta,timeOfDay) {
        this.u += delta / 2000;
        let pos = this.track.eval(this.u);
        this.objects[0].position.set(pos[0],pos[1],pos[2]);
        let dir = this.track.tangent(this.u);
        // since we can't easily construct the matrix, figure out the rotation
        // easy since this is 2D!
        let zAngle = Math.atan2(dir[2],dir[0]);
        // turn the object so the Z axis is facing in that direction
        this.objects[0].rotation.y = -zAngle - Math.PI/2;
    }
}

export class Bulldozer extends GrObject{
    constructor(track,dirtpile,startPos,name){
        let bulldozer = new T.Group();
        super(name,bulldozer);
        this.bulldozer = bulldozer;
        this.dirtpile = dirtpile;
        this.track = track;
        this.u = startPos;
        this.startPos = startPos;
        this.stopped = false;
        this.stopped2 = false;
        this.stoppedTimer = 0;

        let r = new T.Object3D();
        r.rotateY(-Math.PI/2);
        this.ridePoint = r;
        this.ridePoint.translateY(0.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        
		let cabin_group = new T.Group();

		let tread1 = new T.BoxBufferGeometry(2.8, 1, .5);
		let tread1Mesh = new T.Mesh(tread1, new T.MeshStandardMaterial({color:"black"}))
		tread1Mesh.position.z = tread1Mesh.position.z+.7;
		cabin_group.add(tread1Mesh);

		let tread2 = new T.BoxBufferGeometry(2.8, 1, .5);
		let tread2Mesh = new T.Mesh(tread2, new T.MeshStandardMaterial({color:"black"}))
		tread2Mesh.position.z = tread2Mesh.position.z-.7;
		cabin_group.add(tread2Mesh);

		let smokestack = new T.CylinderBufferGeometry(.1,.1,2,15);
		let smokestackMesh = new T.Mesh(smokestack,new T.MeshStandardMaterial({color:"black", metalness:0.8, roughness:0.2}));
		smokestackMesh.position.y = smokestackMesh.position.y+2;
		smokestackMesh.position.z = smokestackMesh.position.z+.8;
		smokestackMesh.position.x = smokestackMesh.position.x-1.2;
		cabin_group.add(smokestackMesh);

		let base = new T.BoxBufferGeometry(3, 1, 2);
		let baseMesh = new T.Mesh(base, new T.MeshStandardMaterial({color:"yellow"}))
		baseMesh.position.y = baseMesh.position.y+1;
		cabin_group.add(baseMesh);

		let cabin = new T.BoxBufferGeometry(2, 1.5, 1.5);
		let cabinMesh = new T.Mesh(cabin, new T.MeshStandardMaterial({color:"yellow"}))
		cabinMesh.position.y = cabinMesh.position.y+2;
		cabin_group.add(cabinMesh);

		bulldozer.add(cabin_group);

		let arm_group = new T.Group();

		let arm1 = new T.BoxBufferGeometry(1.2, .2, .2);
		let arm1Mesh = new T.Mesh(arm1, new T.MeshStandardMaterial({color:"yellow"}))
		arm1Mesh.position.x = arm1Mesh.position.x-2;
		arm1Mesh.position.y = arm1Mesh.position.y+.7;
		arm1Mesh.position.z = arm1Mesh.position.z-.6;
		arm_group.add(arm1Mesh);

		let arm2 = new T.BoxBufferGeometry(1.2, .2, .2);
		let arm2Mesh = new T.Mesh(arm2, new T.MeshStandardMaterial({color:"yellow"}))
		arm2Mesh.position.x = arm2Mesh.position.x-2;
		arm2Mesh.position.y = arm2Mesh.position.y+.7;
		arm2Mesh.position.z = arm2Mesh.position.z+.6;
		arm_group.add(arm2Mesh);

		let bucket_group = new T.Group();
		arm_group.add(bucket_group);
		bucket_group.position.x=-2.6;
		bucket_group.position.y=.6;

		let bucketBack = new T.BoxBufferGeometry(.1, 1, 2);
		let bucketBackMesh = new T.Mesh(bucketBack, new T.MeshStandardMaterial({color:"grey"}))
		bucketBackMesh.position.y = bucketBackMesh.position.y+.55;
		bucket_group.add(bucketBackMesh);

		let bucketBottom = new T.BoxBufferGeometry(.1, 1, 2);
		let bucketBottomMesh = new T.Mesh(bucketBottom, new T.MeshStandardMaterial({color:"grey"}))
		bucketBottomMesh.position.x = bucketBottomMesh.position.x-.45;
		bucketBottomMesh.rotateZ(Math.PI/2);
        bucket_group.add(bucketBottomMesh);
        
        this.shaderMat = shaderMaterial("/for_students/shaders/ex83.vs","/for_students/shaders/ex83.fs",
        {
            side:T.DoubleSide,
            uniforms: {
                num: {
                    value: 20
                  }
            }
        });
        var geometry = new T.SphereGeometry( 1,4,4);
        this.carryDirt = new T.Mesh( geometry, this.shaderMat );
        this.carryDirt.position.x = bucket_group.position.x+1.3;
        this.carryDirt.position.y = bucket_group.position.y;
        this.carryDirt.position.z = bucket_group.position.z;
        bucket_group.add(this.carryDirt);

		var triangleShape = new T.Shape();
		triangleShape.moveTo(0, 0);
		triangleShape.lineTo(0, 1);
		triangleShape.lineTo(-1, 0);
		triangleShape.lineTo(0, 0);

		let bucketSide1 = new T.ExtrudeGeometry(triangleShape, {depth:.1, steps:1, bevelEnabled: false});
		let bucketSide1Mesh = new T.Mesh(bucketSide1, new T.MeshStandardMaterial({color:"grey"}))
		bucketSide1Mesh.position.z = bucketSide1Mesh.position.z-1; 
		bucket_group.add(bucketSide1Mesh);

		let bucketSide2 = new T.ExtrudeGeometry(triangleShape, {depth:.1, steps:1, bevelEnabled: false});
		let bucketSide2Mesh = new T.Mesh(bucketSide2, new T.MeshStandardMaterial({color:"grey"}))
		bucketSide2Mesh.position.z = bucketSide2Mesh.position.z+1; 
		bucket_group.add(bucketSide2Mesh);

        cabin_group.add(arm_group);
  
        bulldozer.rotateY(Math.PI);
        if(this.u >=200){
            this.carryDirt.visible = true;
        }
        else{
            this.carryDirt.visible = false;
        }
    }
    tick(delta,timeOfDay) {
        // this.u += delta / 2000;
        if(this.u == 200){
            this.stopped = true;
            this.u +=1;
            // this.dirtpile.pop();
        }

        if(this.u == 470){
            this.stopped2 = true;
            this.u +=1;
            this.dirtpile.add();
        }

        if(this.stopped || this.stopped2){
            if(this.stopped){
                this.carryDirt.visible = true;
            }
            else if(this.stopped2){
                this.carryDirt.visible = false;
            }
            if(this.stoppedTimer <= 100){
                this.stoppedTimer +=1;
            }
            else if(this.stoppedTimer >= 101){
                this.stopped = false;
                this.stopped2 = false;
                this.stoppedTimer = 0;
            }
        }
        else{
            if(this.u >= 499){
                this.u = 0;
            }
            else{
                this.u += 1;
            }
        }
        let pos = this.track.eval(this.u);
        this.objects[0].position.set(pos[0],pos[1],pos[2]);
        let dir = this.track.tangent(this.u);

        let zAngle = -Math.atan2(dir[2],dir[0]);
        this.bulldozer.rotation.y = -zAngle ;
    }
}

export class DirtPile extends GrObject{
    constructor(params={}){
        let group = new T.Group();
        super("DirtPile",group)
        this.group = group;
        this.dirt1 = [];
        this.x = params.x;
        this.z = params.z;
        this.shaderMat = shaderMaterial("/for_students/shaders/ex83.vs","/for_students/shaders/ex83.fs",
        {
            side:T.DoubleSide,
            uniforms: {
                num: {
                    value: 20
                  }
            }
        });
        // for(var i=0; i<40; i++){
        //     this.u=0;
        //     let size = getRndInteger(2,4);
        //     let posX = getRndInteger(this.x-2,this.x+2);
        //     let posZ = getRndInteger(this.z-2,this.z+2);
        //     let pt = new H.PineTreeObject();

        //     pt.objects[0].position.x = posX;
        //     pt.objects[0].position.z = posZ;
        //     group.add(pt.objects[0]);
        // }
    }
    tick(u){
        // if(u >= 500){
        //     this.u=0
        // }
        // u += 1;
        // this.test(u);
    }
    add(){
        let size = getRndInteger(.5,1);
        let posX = getRndInteger(this.x-1,this.x+1);
        let posZ = getRndInteger(this.z-1,this.z+1);

        var geometry = new T.SphereGeometry( size,5,5);
        var material = new T.MeshBasicMaterial( {color: "red"} );
        this.mainSphere = new T.Mesh( geometry, this.shaderMat );
        this.mainSphere.position.x = posX;
        this.mainSphere.position.z = posZ;
        this.group.add(this.mainSphere);
        // this.group.children.pop();
    }
}

export class OblongTrack extends GrObject {
    constructor(params={}) {
        let group = new T.Group();
        super(`CircularTrack`,group);
        this.group = group;
        this.curve = new T.SplineCurve( [
            new T.Vector2( -6, 10 ),
            new T.Vector2( 16, 5 ),
            new T.Vector2( 16, -5 ),
            new T.Vector2( -6, -5 ),
            new T.Vector2( -10, 9.4 ),
            new T.Vector2( -6, 10 ),
        ] );
        this.points = this.curve.getSpacedPoints(500);

        // let radius = params.radius || 9;
        // let width = params.width || 1;
        // let ring = new T.RingGeometry(radius-width,radius+width,20,3);
        // let material = new T.MeshStandardMaterial({side:T.DoubleSide, color:"#909090",roughness:1.0});
        // let mesh = new T.Mesh(ring, material);
        // mesh.rotateX(Math.PI/2);
        // this.group.add(mesh);

        this.group.translateX(params.x || 0);
        this.group.translateY(params.bias || 0.01); // raise track above ground to avoid z-fight
        this.group.translateZ(params.z || 0);

        // let tubeGeo = new T.TubeGeometry(this.)

        this.x = params.x || 0;
        this.z = params.z || 0;
        this.y = params.bias || 0.01;
        // this.r = radius;

        this.track = new T.Group();
        for(var i=0; i<this.points.length; i++){
            if(i % 5 == 0){
                let geometry = new T.BoxGeometry( .2, .01, .5);
                let m = new T.MeshStandardMaterial( {color: "black"} );
                let tieMesh = new T.Mesh( geometry, m );
                tieMesh.position.x = this.points[i].x;
                tieMesh.position.z = this.points[i].y;
                tieMesh.position.y = .01;
                let dir = this.tangent(i);
                let zAngle = -Math.atan2(dir[2],dir[0]);
                tieMesh.rotateY(zAngle);
                this.track.add(tieMesh);
            }
        }
        this.group.add(this.track);
    }
    tick(){

    }
    eval(u) {
        // let p = u * 1 * Math.PI;
        return [this.points[u].x, this.y, this.points[u].y]
    }
    tangent(u) {
        return [this.curve.getTangentAt(u/500).x, 0, this.curve.getTangentAt(u/500).y];
    }
}