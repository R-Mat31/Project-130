function preload(){
 song1 = loadSound("Harry Potter Theme.mp3");
 song2 = loadSound("Pirates of the Caribbean Theme.mp3");
}
function setup(){
 canvas = createCanvas(350, 350);
 canvas.position(450, 200);
 video = createCapture(VIDEO);
 video.hide();
 poseNet = ml5.poseNet(video, model_loaded);
 poseNet.on("pose", got_poses);
}
var song1Play = "";
var song2Play = "";
function draw(){
 webcam = image(video, 0, 0, 350, 350);
 song1Play = song1.isPlaying();
 song2Play = song2.isPlaying();
 fill("#ff0000");
 stroke("#ff0000");
 if(leftWristAccuracy > 0.2){
  circle(leftWristX, leftWristY, 25);
  song2.stop();
  console.log(song1Play)
  console.log(song2Play)
  if(song1Play == false){
   song1.play();
   console.log(song1Play)
   console.log(song2Play)
  }
  else{
   song1.stop();
   document.getElementById("song_name").innerHTML = "Song: Harry Potter Theme";
   console.log(song1Play)
   console.log(song2Play)
  }
 }
 if(rightWristAccuracy > 0.2){
  circle(rightWristX, rightWristY, 25);
  song1.stop();
  if(song2Play == false){
   song2.play();
   console.log(song1Play)
   console.log(song2Play)
  }
  else{
   song2.stop();
   document.getElementById("song_name").innerHTML = "Song: Pirates of the Caribbean Theme";
   console.log(song1Play)
   console.log(song2Play)
  }
 }
}
function model_loaded(){
 console.log("Pose Net was initialised.");
}
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristAccuracy = 0;
var rightWristAccuracy = 0;
function got_poses(results){
 if(results.length > 0){
  console.log(results);
  leftWristX = results[0].pose.leftWrist.x;
  leftWristY = results[0].pose.leftWrist.y;
  rightWristX = results[0].pose.rightWrist.x;
  rightWristY = results[0].pose.rightWrist.y;
  console.log("Left Wrist X = " + leftWristX + " Y = " + leftWristY + " Right Wrist X = " + rightWristX + " Y = " + rightWristY);
  leftWristAccuracy = results[0].pose.keypoints[9].score;
  rightWristAccuracy = results[0].pose.keypoints[10].score;
 }
}