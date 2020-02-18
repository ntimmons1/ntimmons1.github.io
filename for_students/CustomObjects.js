
/*jshint esversion: 6 */
// @ts-check

import * as T from "./THREE/src/Three.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";
import { GrObject } from "./framework/GrObject.js";
import { Group } from "./THREE/src/Three.js";
import * as Loaders from "./Framework/loaders.js";
import { OBJLoader } from "./THREE/examples/jsm/loaders/OBJLoader.js";


function getRndInteger(min, max) {
    return Math.random() * (max - min)  + min;
  }

export class SmallCastleObject extends GrObject{
    constructor(){
        let group = new T.Group();
        let wt=new T.TextureLoader().load("/assets/wall.jpg");
        let wallMaterial = new T.MeshStandardMaterial({map:wt,roughness:1});

        let wtd=new T.TextureLoader().load("/assets/wallDoor.jpg");
        let wallDoorMaterial = new T.MeshStandardMaterial({map:wtd,roughness:1});

        let wtw=new T.TextureLoader().load("/assets/wallWindows.jpg");
        let wallWindowsMaterial = new T.MeshStandardMaterial({map:wtw,roughness:1});

        var cubeMaterialArray = [];
        cubeMaterialArray.push( wallDoorMaterial );
        cubeMaterialArray.push( wallMaterial );
        cubeMaterialArray.push( wallMaterial );
        cubeMaterialArray.push( wallMaterial );
        cubeMaterialArray.push( wallWindowsMaterial );
        cubeMaterialArray.push( wallWindowsMaterial );

        var baseGeometry = new T.BoxGeometry( 1, 1, 1, 1, 1, 1 );
        let stoneBaseMesh = new T.Mesh( baseGeometry, cubeMaterialArray );
        group.add(stoneBaseMesh);
        stoneBaseMesh.position.y = .5;

        let rf=new T.TextureLoader().load("/assets/roof.jpg");
        let roofMaterial = new T.MeshStandardMaterial({map:rf,roughness:1});

        let roofGeometry = new T.ConeBufferGeometry(.9, .8, 4, 4);
        let roofMesh = new T.Mesh(roofGeometry,roofMaterial);
        group.add(roofMesh);
        roofMesh.position.y = 1.4;
        roofMesh.rotateY(Math.PI/4);

        super("SmallCastleObject",group);

    }
}

export class LargeCastleObject extends GrObject{
    constructor(){
        let group = new T.Group();

        let wt=new T.TextureLoader().load("/assets/wall.jpg");
        let wallMaterial = new T.MeshStandardMaterial({map:wt,roughness:1});

        let longWindows=new T.TextureLoader().load("/assets/castle-wall-long-windows.jpg");
        let longWindowsMaterial = new T.MeshStandardMaterial({map:longWindows,roughness:1});

        let longBlank=new T.TextureLoader().load("/assets/castle-wall-long.jpg");
        let longBlankMaterial = new T.MeshStandardMaterial({map:longBlank,roughness:1});

        let longWindowsDoor=new T.TextureLoader().load("/assets/castle-wall-long-door.jpg");
        let longWindowsDoorMaterial = new T.MeshStandardMaterial({map:longWindowsDoor,roughness:1});

        let shortWindows=new T.TextureLoader().load("/assets/castle-wall-short-windows.jpg");
        let shortWindowsMaterial = new T.MeshStandardMaterial({map:shortWindows,roughness:1});

        let shortBlank=new T.TextureLoader().load("/assets/castle-wall-short.jpg");
        let shortBlankMaterial = new T.MeshStandardMaterial({map:shortBlank,roughness:1});

        let spireTexture=new T.TextureLoader().load("/assets/spire.jpg");
        let spireMaterial = new T.MeshStandardMaterial({map:spireTexture,roughness:1});



        let longWindowMaterialArray = [];
        longWindowMaterialArray.push( longBlankMaterial );
        longWindowMaterialArray.push( longBlankMaterial );
        longWindowMaterialArray.push( longBlankMaterial );
        longWindowMaterialArray.push( longBlankMaterial );
        longWindowMaterialArray.push( longWindowsMaterial );
        longWindowMaterialArray.push( longBlankMaterial );

        let longWindowDoorMaterialArray = [];
        longWindowDoorMaterialArray.push( longBlankMaterial );
        longWindowDoorMaterialArray.push( longBlankMaterial );
        longWindowDoorMaterialArray.push( longBlankMaterial );
        longWindowDoorMaterialArray.push( longBlankMaterial );
        longWindowDoorMaterialArray.push( longWindowsDoorMaterial );
        longWindowDoorMaterialArray.push( longBlankMaterial );

        let shortWindowMaterialArray = [];
        shortWindowMaterialArray.push( shortBlankMaterial );
        shortWindowMaterialArray.push( shortBlankMaterial );
        shortWindowMaterialArray.push( shortBlankMaterial );
        shortWindowMaterialArray.push( shortBlankMaterial );
        shortWindowMaterialArray.push( shortWindowsMaterial );
        shortWindowMaterialArray.push( shortBlankMaterial );

        let spireMaterialArray = []
        spireMaterialArray.push(spireMaterial);
        spireMaterialArray.push(spireMaterial);
        spireMaterialArray.push(spireMaterial);
        spireMaterialArray.push(spireMaterial);
        spireMaterialArray.push(spireMaterial);
        spireMaterialArray.push(spireMaterial);


        let longWindowGeometry = new T.BoxGeometry( 3, 2, .2 );

        let longWindowMesh = new T.Mesh( longWindowGeometry, longWindowMaterialArray );
        group.add(longWindowMesh);
        longWindowMesh.position.y = 1;

        let longWindowMesh2 = new T.Mesh(longWindowGeometry, longWindowDoorMaterialArray);
        group.add(longWindowMesh2);
        longWindowMesh2.position.z = longWindowMesh2.position.z-1.8
        longWindowMesh2.position.y = longWindowMesh2.position.y+1
        longWindowMesh2.rotateY(Math.PI);

        let shortWindowGeometry = new T.BoxGeometry( 2, 2, .2 );
        let shortWindowMesh = new T.Mesh(shortWindowGeometry, shortWindowMaterialArray);
        group.add(shortWindowMesh);
        shortWindowMesh.position.x = shortWindowMesh.position.x + 1.5;
        shortWindowMesh.position.z = shortWindowMesh.position.z - .9
        shortWindowMesh.position.y= shortWindowMesh.position.y+1
        shortWindowMesh.rotateY(Math.PI/2);

        let shortWindowMesh2 = shortWindowMesh.clone();
        group.add(shortWindowMesh2);
        shortWindowMesh2.position.x = shortWindowMesh2.position.x - 3;
        shortWindowMesh2.rotateY(Math.PI);

        let roofGeometry = new T.ConeBufferGeometry(1.4, 1.2, 4, 4);
        let roofMesh = new T.Mesh(roofGeometry,longBlankMaterial);
        group.add(roofMesh);
        roofMesh.rotateY(Math.PI/4);
        roofMesh.position.y = 2.6;
        roofMesh.position.x = roofMesh.position.x - .6;
        roofMesh.position.z = roofMesh.position.z - .9;

        let roofMesh2 = roofMesh.clone();
        group.add(roofMesh2);
        roofMesh2.position.x = roofMesh2.position.x + 1.2;

        let spire = new T.Group();

        let tower = new T.BoxGeometry(.5,3.5,.5);
        let towerMesh = new T.Mesh(tower, spireMaterialArray);

        let spireRoofGeometry = new T.ConeBufferGeometry(.35, .5, 4, 4);
        let spireRoofMesh = new T.Mesh(spireRoofGeometry,wallMaterial);
        spire.add(spireRoofMesh);
        spireRoofMesh.position.y = spireRoofMesh.position.y + 2;
        spireRoofMesh.rotateY(Math.PI/4);
        spire.position.z = spire.position.z + .1;
        spire.position.x = spire.position.x + 1.5;
        spire.position.y=spire.position.y+1.75;
        spire.add(towerMesh);
        group.add(spire);

        let spire2 = spire.clone();
        group.add(spire2);
        spire2.position.z = spire2.position.z - 2;

        let spire3 = spire2.clone();
        group.add(spire3);
        spire3.position.x = spire3.position.x - 3;

        let spire4 = spire.clone();
        group.add(spire4);
        spire4.position.x = spire4.position.x - 3;
        
        super("LargeCastleObject",group);

    }
}

export class IglooObject extends GrObject{
    constructor(){
        var geometry = new T.SphereGeometry( .5, 30, 30, Math.PI, Math.PI, 3*Math.PI/2);
        var material = new T.MeshBasicMaterial( { color: 0xddddff } );
        material.side = T.DoubleSide;
        let mesh = new T.Mesh( geometry, material );

        super("IglooObject",mesh);

    }
}

export class hutObject extends GrObject{
    constructor(){
        let group = new T.Group();
        let i=new T.TextureLoader().load("/assets/bamboo-wall.jpg");
        i.wrapS = i .wrapT = T.RepeatWrapping;
        i.offset.set(0,0);
        i.offset.set
        let hutWallMaterial = new T.MeshStandardMaterial({map:i,roughness:1});

        let wallGeometry = new T.CylinderGeometry( .7, .7, 1,10);
        let wallMesh = new T.Mesh( wallGeometry, hutWallMaterial );
        wallMesh.position.y=.4
        group.add(wallMesh);

        let rf=new T.TextureLoader().load("/assets/straw.jpg");
        let roofMaterial = new T.MeshStandardMaterial({map:rf,roughness:1});

        let roofGeometry = new T.ConeBufferGeometry(.9, .8, 10, 10);
        let roofMesh = new T.Mesh(roofGeometry,roofMaterial);
        roofMesh.position.y = 1.3;
        group.add(roofMesh);

        super("hutObject",group);

    }
}

export class PineTreeObject extends GrObject{
    constructor(){
        let group = new T.Group();
        let rf=new T.TextureLoader().load("/assets/tree.jpg");
        let treeMaterial = new T.MeshStandardMaterial({map:rf,roughness:1});

        let tf=new T.TextureLoader().load("/assets/bark.jpg");
        let barkMaterial = new T.MeshStandardMaterial({map:tf,roughness:1});

        let treeTrunkGeometry = new T.CylinderGeometry( .06, .06, .5,10);
        let treeTrunkMesh = new T.Mesh(treeTrunkGeometry,barkMaterial)
        treeTrunkMesh.position.y=.15;
        group.add(treeTrunkMesh);

        let tree1Geometry = new T.ConeBufferGeometry(.4, .4, 10, 10);
        let tree1Mesh = new T.Mesh(tree1Geometry,treeMaterial);
        tree1Mesh.position.y = .5;
        group.add(tree1Mesh);
        
        let tree2Geometry = new T.ConeBufferGeometry(.35, .35, 10, 10);
        let tree2Mesh = new T.Mesh(tree2Geometry,treeMaterial);
        tree2Mesh.position.y = .65;
        group.add(tree2Mesh);

        let tree3Geometry = new T.ConeBufferGeometry(.25, .25, 10, 10);
        let tree3Mesh = new T.Mesh(tree3Geometry,treeMaterial);
        tree3Mesh.position.y = .8;
        group.add(tree3Mesh);
        
        let tree4Geometry = new T.ConeBufferGeometry(.18, .18, 10, 10);
        let tree4Mesh = new T.Mesh(tree4Geometry,treeMaterial);
        tree4Mesh.position.y = .9;
        group.add(tree4Mesh);

        super("TreeObject",group);

    }
}

export class BumpMushroomObject extends GrObject{
    constructor(){
        var points = [];
        points.push(new T.Vector2(0,0));
        for ( var i = 0; i < 10; i ++ ) {
            points.push( new T.Vector2( Math.sin( i * 0.2 ) * 2 + 1, ( i - .5 ) * .3 ) );
        }
        for ( var i = 10; i <20; i ++ ) {
            points.push( new T.Vector2( -Math.sin( i * 0.1 ) * 2 + 1, ( i - .5 ) * .3 ) );
        }
        var geometry = new T.LatheGeometry( points,30 );
        var material = new T.MeshLambertMaterial({color:"white", emissive: "red"});
        var lathe = new T.Mesh( geometry);
        lathe.position.y = 2.8;
        lathe.rotateX(Math.PI);
        lathe.scale.set(.5,.5,.5);

        let tl=new T.TextureLoader().load("/Images/blue-lines2.png",function(tex){
            let m = new T.MeshPhongMaterial({map:tex,normalMap:tex});
            lathe.material = m;
        });
        super("BumpMushroomObject",lathe);
    }
}

export class NormalMushroomObject extends GrObject{
    constructor(){
        var points = [];
        points.push(new T.Vector2(0,0));
        for ( var i = 0; i < 10; i ++ ) {
            points.push( new T.Vector2( Math.sin( i * 0.2 ) * 2 + 1, ( i - .5 ) * .3 ) );
        }
        for ( var i = 10; i <20; i ++ ) {
            points.push( new T.Vector2( -Math.sin( i * 0.1 ) * 2 + 1, ( i - .5 ) * .3 ) );
        }
        var geometry = new T.LatheGeometry( points,30 );
        var material = new T.MeshLambertMaterial({color:"white", emissive: "red"});
        var lathe = new T.Mesh( geometry);
        lathe.position.y = 2.8;
        lathe.rotateX(Math.PI);
        lathe.scale.set(.5,.5,.5);

        let tl=new T.TextureLoader().load("/Images/blue-lines2.png",function(tex){
            let m = new T.MeshStandardMaterial({map:tex,bumpMap:tex});
            lathe.material = m;
            lathe.material.needsUpdate = true;
        });
        super("NormalMushroomObject",lathe);
    }
}

export class TextureMushroomObject extends GrObject{
    constructor(){
        var points = [];
        points.push(new T.Vector2(0,0));
        for ( var i = 0; i < 10; i ++ ) {
            points.push( new T.Vector2( Math.sin( i * 0.2 ) * 2 + 1, ( i - .5 ) * .3 ) );
        }
        for ( var i = 10; i <20; i ++ ) {
            points.push( new T.Vector2( -Math.sin( i * 0.1 ) * 2 + 1, ( i - .5 ) * .3 ) );
        }
        var geometry = new T.LatheGeometry( points,30 );
        var lathe = new T.Mesh( geometry);
        lathe.position.y = 2.8;
        lathe.rotateX(Math.PI);
        lathe.scale.set(.5,.5,.5);

        let tl = new T.TextureLoader().load("/assets/dots.png",function(tex){
        // let tl=new T.TextureLoader().load("/Images/blue-lines2.png",function(tex){
            // let m = new T.MeshLambertMaterial({color:"white",map:tex,emissiveMap:tex,emissive:"green",emissiveIntensity: 5});
            let m = new T.MeshPhongMaterial({color:"white",map:tex,displacementMap:tex});
            lathe.material = m;
        });
        super("MushroomObject",lathe);
    }
}

export class HelicopterObject extends GrObject{
    constructor(dir){
        let group = new T.Group();
        super("HelicopterObject",group);
        this.helicopter = group;
        this.dir = dir;
        let tempMaterial = new T.MeshStandardMaterial({color:"grey"});
        let cabin = new T.SphereBufferGeometry(.5,8,8);
        let heliMesh = new T.Mesh(cabin, new T.MeshStandardMaterial({color:"red"}));
        this.helicopter.add(heliMesh);

        this.tail = new T.CylinderBufferGeometry(.02,.4,1.2,15)
        let tailMesh = new T.Mesh(this.tail, new T.MeshStandardMaterial({color:"red"}));
        tailMesh.rotateZ(Math.PI/2);
        tailMesh.position.x = tailMesh.position.x-.6;
        this.helicopter.add(tailMesh);

        let rotorBase = new T.CylinderBufferGeometry(.01,.01,.2,15)
        let rotorBaseMesh = new T.Mesh(rotorBase,tempMaterial);
        rotorBaseMesh.position.y = rotorBaseMesh.position.y+.45;
        this.helicopter.add(rotorBaseMesh);

        let tailBar = new T.BoxBufferGeometry(.01,.3,.07);
        let tailBarMesh = new T.Mesh(tailBar, tempMaterial);
        tailBarMesh.position.x = tailMesh.position.x-.58;
        tailBarMesh.position.z = tailMesh.position.z-.025;
        tailBarMesh.rotateY(Math.PI/2);
        this.helicopter.add(tailBarMesh);

        let tailBlade = new T.BoxBufferGeometry(.01,.3,.07);
        this.tailBladeMesh = new T.Mesh(tailBlade, new T.MeshStandardMaterial({color:"white"}));
        this.tailBladeMesh.position.x = tailBarMesh.position.x;
        this.tailBladeMesh.position.z = tailBarMesh.position.z-.015;
        this.tailBladeMesh.rotateY(Math.PI/2);
        this.helicopter.add(this.tailBladeMesh);

        this.rotor = new T.BoxBufferGeometry(.004,1.5,.07);
        let rotorMesh = new T.Mesh(this.rotor, new T.MeshStandardMaterial({color:"white"}));
        rotorMesh.position.y = tailMesh.position.y+.53;
        rotorMesh.rotateZ(Math.PI/2);
        this.helicopter.add(rotorMesh);

        this.helicopter.position.y = 2
    }

    tick(delta, timeofday){
        let theta = performance.now() / 1000;
        let x2 = this.dir * -14 * Math.cos(theta);
        let z2 = this.dir * -14 * Math.sin(theta);

        this.helicopter.position.x = x2;
        this.helicopter.position.z = z2;
        this.helicopter.lookAt(1,1,1);
        this.tailBladeMesh.rotateX(1);
        this.helicopter.position.y = this.dir * Math.sin(theta) * 3 + 8;
        this.rotor.rotateX(1);
    };
}

export class FireWorkObject extends GrObject{
    constructor(params={}){
        let group = new T.Group();
        super("FireworkObject",group);
        this.group = group;
        this.dest = params.dest;
        this.start = params.start;
        this.exploded = false;
        this.u = 0;
        this.fired=false;
        this.delay = params.delay;

        let curve = new T.QuadraticBezierCurve3(
            this.start,
            new T.Vector3( 
                           this.start.x-this.dest.x,
                           this.start.y-this.dest.y,
                           this.start.z-this.dest.z),
            this.dest
        );
        this.points = curve.getSpacedPoints(150);
        

        var geometry = new T.SphereGeometry( .2);
        var material = new T.MeshBasicMaterial( {color: "black"} );
        this.mainSphere = new T.Mesh( geometry, material );
        this.group.add( this.mainSphere );
        this.mainSphere.position.x = this.points[0].x;
        this.mainSphere.position.y = this.points[0].y;
        this.mainSphere.position.z = this.points[0].z;

        this.particlesBase = new T.Group();
        for(var i=0; i<20; i++){
            var geometry = new T.SphereGeometry( .1,3,4,4);
            let c = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            var material = new T.MeshBasicMaterial( {color: c} );
            var sphere = new T.Mesh( geometry, material );
            let size = getRndInteger(0,1.5);
            let posX = getRndInteger(-5,5);
            let posY = getRndInteger(-5,5);
            let posZ = getRndInteger(-5,5);
            sphere.userData.dest = new T.Vector3(this.dest.x + posX,
                                                 this.dest.y + posY,
                                                 this.dest.z + posZ);
            let curve = new T.LineCurve3(this.dest, sphere.userData.dest);
            sphere.userData.paths = curve.getSpacedPoints(100);
            sphere.userData.pU = 0;

            this.particlesBase.add(sphere);
            sphere.position.set(this.dest.x,this.dest.y,this.dest.z);
        }
        this.particlesBase.visible = false;
        this.particles = this.particlesBase.clone();
        this.group.add(this.particles);
    }
    tick(){
        if(this.u == 0){
            this.group.children[1].visible = false;
            this.mainSphere.position.x = this.points[0].x;
            this.mainSphere.position.y = this.points[0].y;
            this.mainSphere.position.z = this.points[0].z;
            this.u += 1;
        }
        else if(this.u <= this.delay){
            this.u += 1;
        }
        else if(this.u > this.delay && this.u < 200){
            if(this.u >this.delay + 20){
                this.group.children[0].visible = true;
            }
            this.mainSphere.position.x = this.points[this.u-this.delay].x;
            this.mainSphere.position.y = this.points[this.u-this.delay].y;
            this.mainSphere.position.z = this.points[this.u-this.delay].z;
            this.u += 1;
        }
        else if(this.u >= 200 && this.u <= 300){
            this.group.children[0].visible = false;
            this.group.children[1].visible = true;
            this.particles.visible = true;
            this.group.children[1].traverse(function(child){
                if (child instanceof T.Mesh){
                    if(child.userData.paths != null && child.userData.pU != null){
                        child.position.x = child.userData.paths[child.userData.pU].x;
                        child.position.y = child.userData.paths[child.userData.pU].y;
                        child.position.z = child.userData.paths[child.userData.pU].z;
                    }
                    child.userData.pU += 1;
                }
            });
            this.u += 1;
        }
        else if(this.u >= 300){
            this.group.children[0].visible = false;
            this.u = 0;
            this.group.children[1].traverse(function(child){
                if (child instanceof T.Mesh){
                    child.userData.pU = 0;
                }
            });
        }
    }
}

export class LakeObject extends GrObject{
    constructor(params={}){
        let group = new T.Group();
        super("LakeObject", group);
        this.clock = new T.Clock();

    var nt = new T.TextureLoader().load( '/Images/cloud.png' );
	nt.wrapS = nt.wrapT = T.RepeatWrapping; 

    var wt = new T.TextureLoader().load( '/Images/water2.png' );
	wt.wrapS = wt.wrapT = T.RepeatWrapping; 
	
	this.uniforms = {
		bT: 	{ type: "t", value: wt },
		bS: 	{ type: "f", value: 1.15 },
		nT: 	{ type: "t", value: nt },
		nS:		{ type: "f", value: 0.2 },
		alpha: 	{ type: "f", value: 0.8 },
		time: 	{ type: "f", value: 1.0 }
	};

    let sm = shaderMaterial("/for_students/shaders/waterVShader.vs","/for_students/shaders/waterFShader.fs",
    {
        side:T.DoubleSide,
        uniforms: this.uniforms
        
    });
	sm.side = T.DoubleSide;
	sm.transparent = false;
	
	var fg = new T.CylinderGeometry( 6, 6, .1, 20, 20);
    var lake = new T.Mesh( fg, sm );
    lake.position.set(-5,.01,-8);
    lake.rotateX(Math.PI);
    console.log(lake);
    group.add(lake);
    }

    tick(){
        let theta = performance.now() / 10000;
        this.uniforms.time.value = theta;
    }
}

export class FireImportObject extends Loaders.ObjGrObject {
    constructor(x,z) {
        // super({obj:"../assets/campfire2/Campfire/Campfire.obj",norm:2.0,name:"Fire"});
        super({obj:"../assets/christree/12150_Christmas_Tree_V2_L2.obj",norm:2.0,name:"Fire"});
        console.log(this.objects[0]);
        console.log("TEST FBX");
        this.x = x;
        this.z = z;
        this.u = 0;
    }
    tick(delta,timeOfDay) {
    }
}

export class CampfireObject extends GrObject{
    constructor(params={}){
        
        let group = new T.Group();
        super("CampfireObject", group);
        this.group = group;

        let tf=new T.TextureLoader().load("/assets/bark.jpg");
        let barkMaterial = new T.MeshStandardMaterial({map:tf,roughness:1});
        let logGeo = new T.CylinderGeometry(.15,.15);
        let logMesh = new T.Mesh(logGeo, barkMaterial);
        logMesh.position.y = .2;

        for(var i=0; i<12; i++){
            let l = logMesh.clone(true);
            l.position.y = group.position.y+.1;
			l.rotation.set(0, i*Math.PI/6, Math.PI/2);
            l.translateZ(1.5);
            group.add(l)
            l.rotateY(Math.PI/6);
        }
        
        for(var i=0; i<12; i++){
            let l = logMesh.clone(true);
            l.position.y = group.position.y+.4;
			l.rotation.set(0, i*Math.PI/4, Math.PI/4);
            l.translateZ(1.2);
            group.add(l)
        }
        for(var i=0; i<12; i++){
            let l = logMesh.clone(true);
            l.position.y = group.position.y+.4;
			l.rotation.set(0, i*Math.PI/4, -Math.PI/4);
            l.translateZ(.8);
            group.add(l)
        }
        for(var i=0; i<4; i++){
            let l = logMesh.clone(true);
            l.position.y = group.position.y+.4;
			l.rotation.set(0, i*Math.PI/2, -Math.PI/4);
            l.translateZ(.4);
            group.add(l)
        }

        let rtt=new T.TextureLoader().load("/assets/fire2.png");
        const fireMaterial = new T.SpriteMaterial({
            map: rtt,
            side: T.DoubleSide,
            transparent: true,
          });
          const label = new T.Sprite(fireMaterial);
          label.position.y = 2;
          label.scale.set(4,4,4);
          group.add(label);

        this.map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin;
        this.offset = (geo,per) => geo.vertices.forEach(v => {
            v.x += this.map(Math.random(),0,1,-per,per)
            v.y += this.map(Math.random(),0,1,-per,per)
            v.z += this.map(Math.random(),0,1,-per,per)
        })
    }
    tick(delta, timeofday){
    }
}

export class FireObject extends GrObject{
    constructor(params={}){
        
        let group = new T.Group();
        super("FireObject", group);
        this.group = group;
        let radius = 1;
        this.offset = getRndInteger(.8,1);

        let loader = new T.TextureLoader();
        let mtTexture = loader.load("../assets/fire.jpg");
        let material = new T.MeshPhongMaterial({map:mtTexture, morphTargets:true, morphNormals:true, emissiveMap:mtTexture, emissiveIntensity:1}, );
        let geometry = new T.CylinderGeometry(.01,radius,4,4);

        let morphVerts = [];
        geometry.vertices.forEach(element => {
            morphVerts.push(new T.Vector3(0,1,0));
        });
        for(let i=geometry.faces.length/2; i<geometry.faces.length; i = i+5) {
            let v = geometry.faces[i].a;
            // morphVerts[geometry.faces[i].a].x = geometry.faceVertexUvs[0][i][0].x +2;
            morphVerts[geometry.faces[i].a].y = geometry.faceVertexUvs[0][i][0].y + i/50;
            // morphVerts[geometry.faces[i].b].x = geometry.faceVertexUvs[0][i][1].x +2;
            morphVerts[geometry.faces[i].b].y = geometry.faceVertexUvs[0][i][1].y + i/50;
            // morphVerts[geometry.faces[i].c].x = geometry.faceVertexUvs[0][i][2].x +2;
            morphVerts[geometry.faces[i].c].y = geometry.faceVertexUvs[0][i][2].y + i/50;
        }
        // make the morph target given the vertex positions
        geometry.morphTargets.push({name:"flat", vertices: morphVerts});
        geometry.computeMorphNormals();

        let bgeometry = new T.BufferGeometry().fromGeometry(geometry);
        let mesh = new T.Mesh(bgeometry,material);

        mesh.position.x = params.x || 0;
        mesh.position.y = params.y || 0;
        mesh.position.z = params.z || 0;
        this.mesh = mesh;

        this.mesh.updateMorphTargets();

        this.time = 0;
        
        this.group.add(mesh);
        mesh.castShadow = false;
        mesh.receiveShadow = false;
    }
    tick(delta, timeofday){
        this.time += delta/500*this.offset;
        this.mesh.morphTargetInfluences[0] = Math.cos(this.time) * Math.cos(this.time);
    }
}

export class BoulderObject extends GrObject{
    constructor(x,z){
        let group = new T.Group();
        super("BoulderObject",group);

        const g = new T.Geometry()

        const r1 = new T.SphereGeometry(1.5,7,8)
        r1.translate(-2,0,0)
        g.merge(r1)

        const r2 = new T.SphereGeometry(1.5,7,8)
        r2.translate(2,0,0)
        g.merge(r2)

        const r3 = new T.SphereGeometry(2.0,7,8)
        r3.translate(0,0,0)
        g.merge(r3)

        const r4 = new T.SphereGeometry(2.0,7,8)
        r4.translate(0,0,2)
        g.merge(r4)

        let rt=new T.TextureLoader().load("/assets/rock.png");
        let rockMaterial = new T.MeshStandardMaterial({map:rt,roughness:1});

        let rock = new T.Mesh(
            g,rockMaterial
        )
        rock.position.x = x;
        rock.position.z = z;

        const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin
        const offset = (geo,per) => geo.vertices.forEach(v => {
            v.x += map(Math.random(),0,1,-per,per)
            v.y += map(Math.random(),0,1,-per,per)
            v.z += map(Math.random(),0,1,-per,per)
        })
        offset(g,0.2)
        group.add(rock);
    }
}

export class Fire extends GrObject{
    constructor(){
        let group = new T.Group();
        super("fire", group);
        let loader = new OBJLoader();
        // loader.load('"../assets/2ue50ws967mo-campfire_model/Campfire OBJ.obj"', function(fire)
        loader.load('../assets/dog/Dog/12228_Dog_v1_L2.obj', function(fire)
        {
            group.add(fire);
        });
        group.position.set(0,0,0);
    }
}