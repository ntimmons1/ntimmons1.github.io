# README file for Graphics Town Workbook (Assignments 11-12)

It is the student's responsibility to fill this in.
See <https://graphics.cs.wisc.edu/WP/cs559-sp2019/workbooks/#README_files>

## please answer these first three required questions "inline" (as in the instructions)

Name:Nicholas Timmons

WiscID:ntimmons@wisc.edu

GitHub Login:ntimmons1

## please answer these next (optional) questions on a line following the questions

Attributions:

Parts of the Assignment you did (or did not) do:all

Did you do any bonus parts?yes

Did you add any texture or object files?yes

Notes to the Grader:The buildings, bulldozer, helecopter, and trees are from previous workbooks that I made.

# Questions for Assignment 11 and 12

Note: There questions are designed to help you document what you've done in your assignment. It is important as this is the way we will understand what you have done for grading.

An example of filled in questions is in the `Examples` directory (`QUESTIONS-example.md`).

## Assignment 11

The rubric has a list of 13 items.

Item 2: List at least 3 distinct behaviors. If you have made more than 3, list up to 5 and choose the ones you think are most interesting. A single sentence describing each one should be sufficient.

2.A:Fireworks- follow a spline curved path to a detonation point
2.B:Helicopters-follow a 3d curved path
2.C:Bulldozers-follow a spline curved path
2.D:Fireworks-the particles that disperse when the firework explodes
2.E:The lakes have moving "waves"

Item 3: Do you have a spline train track? What object should we look at? How do we know it's a spline?Yes-the bulldozers. I have track ties evenly spaced on the track to show the curves and show correct arc-length parameterization.

Item 4: Do you have a train that faces forward on the track and is ridable?Yes- the bulldozers.

Optional Complexity Points: For each one that you've done, give the number (5-13) on the list, describe the behavior, and tell us what object we can see it on. This might take 2-3 sentences per item.
5-The helicopters follow a 3d curved path and bank appropriately.
6.The fireworks after they explode.
7.The Bulldozers stop at a point in the mushroom forest and pick up some dirt, and then drop it off by the village. 
11.There are multiple bulldozers that move in a coordinated fashion-not colliding at all.
12.The track that the bulldozers follow is arc-length parameterized. You can tell by seeing that the bulldozers are covering distance at an even rate by watching the track ties.
13.The two lakes are created with a procedural fragment shader.

List which other "Behavior Challenges" you completed (from the list of 13 - anything 5 and above). For each, give the number as well as a short (1 sentence is OK) description. And tell us where in the world to see it (what object should we "lookat" and/or "ride"): Pretty sure this is just asking for the same list as above...


## Assignment 12

Object Diversity: List 8 of the different kinds of objects that appear in your world. If you made more than 8 kinds of objects, only list the 8 that are most interesting visually.

O.1-Fireworks
O.2-Bulldozers
O.3-Helicopters
O.4-Lakes
O.5-Boulders
O.6-Small houses
O.7-Small huts
O.8-Mushrooms

Object Diversity: list one object in your world that is loaded from a model file (e.g., OBJ or FBX). Remember to give proper attribution in your README file, and to include the object in your repository.

The dog(by the huts right next the castle was loaded from an .obj file from https://free3d.com/3d-model/dog-v1--722788.html and is free to use for personal use.

Object Diversity: list one of each category
Building:Small houses/huts
Natural Element:Trees/Mushrooms/Boulders/Lakes
Vehicle (object meant to move):Bulldozers,helicopters

Technical Challenges: For each technical challenge you attempted (from the list of 7), give the number of the challenge, a description of what you did, and a description of the object that it was used on. What objects should we "look at".
1.Curved surface-the mushrooms base shape are created with a curved lathe geometry.
3.The lake and "dirt" are made with procedural shaders. I confirmed with professor that these should both count as points, so two points for this.
4.The boulders were made with procedural geometry
5.The fire in the middle of the huts is made with a sprite so that the fire etxture faces the camera at all times.

Pictures: confirm that you placed the required pictures in the Pictures directory.

Consent: do you agree to allow us to use your pictures in future gallery pages? (please answer Yes or No)
