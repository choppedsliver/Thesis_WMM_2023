let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results) {
        poses = results;
    });

    video.hide();
}

function modelReady() {
    console.log('Model loaded.');
}

function draw() {
    image(video, 0, 0, width, height);

    // Loop through detected poses
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;

        let minX = width;
        let minY = height;
        let maxX = 0 ;
        let maxY = 0;
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            let x = keypoint.position.x;
            let y = keypoint.position.y;
            minX = min(minX, x);
            minY = min(minY, y);
            maxX = max(maxX, x);
            maxY = max(maxY, y);
        }

        // Pixelate effect within the bounding box of the detected pose
        let pixelSize = 7;
        for (let y = minY; y < maxY; y += pixelSize) {
            for (let x = minX; x < maxX; x += pixelSize) {
                let c = get(x, y);
                fill(c);
                rect(x , y - 45, pixelSize, pixelSize);
            }
        }

       // Draw detected keypoints and lines
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            // fill(255, 0, 0);
            noStroke();
            //rect(keypoint.position.x, keypoint.position.y, 10, 10);
       }
    }
}
