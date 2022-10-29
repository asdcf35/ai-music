// @ts-nocheck
"use strict";
let music1;
let music2;
let rightWrist = {
  score: 0,
  x: 0,
  y: 0,
};
let leftWrist = {
  score: 0,
  x: 0,
  y: 0,
};
let capture;
function preload() {
  soundFormats("mp3", "ogg");
  music1 = loadSound("sound/music1.mp3");
  music2 = loadSound("sound/music2.mp3");
}
let video;
let modelLoaded = () => {
  console.log("Model Loaded");
};
function setup() {
  canvas = createCanvas(600, 500);
  canvas.parent("note");

  video = createCapture(VIDEO);
  video.hide();

  var poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  music1.stop()
  music2.stop()
}
function gotPoses(results){
  console.log(results)
  leftWrist = results[0].pose.leftWrist;
  rightWrist = results[0].pose.rightWrist;
}
function draw() {
  image(video, 0, 0);

  fill("#ff0000");
  stroke("#ff0000");

  let song1 = String(music1.isPlaying());
  let song2 = String(music2.isPlaying());
  if(leftWrist.confidence > 0.2){ 
    circle(leftWrist.x, leftWrist.y, 20);
    music2.stop()
    if(song1=="false"){
      music1.play();
      document.querySelector("#song").innerText = "song1";
  }
  }
  if(rightWrist.confidence > 0.2){ 
    circle(rightWrist.x, rightWrist.y, 20);
    music1.stop()
  if(song2=="false"){
    music2.play();
    document.querySelector("#song").innerText = "song2";
  }
  } 

}
