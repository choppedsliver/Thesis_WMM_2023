let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}

function modelReady() {
    console.log('Model Loaded!');
}

function gotPoses(results) {
    poses = results;
}

function draw() {
    image(video, 0, 0, width, height);
  
    // console.log(poses.length)

  
  
    if(poses[0]){

        let pose = poses[0].pose;


        // Draw the bounding box
        let leftShoulder = pose.leftShoulder;
        let rightShoulder = pose.rightShoulder;
        let width = rightShoulder.x - leftShoulder.x;
        let height = pose.nose.y - leftShoulder.y;

        // Extract pixels from outside the bounding box
        let outsidePixels = video.get(leftShoulder.x, leftShoulder.y, width - 100, height - 150);

        // Put pixels inside the bounding box
        let boundingBoxX = leftShoulder.x;
        let boundingBoxY = leftShoulder.y;
        video.set(boundingBoxX, boundingBoxY, outsidePixels);
        
        // Draw the bounding box
        noFill();
        noStroke();
        rect(leftShoulder.x, leftShoulder.y, width, height);
    }
}
