let handPose;
let hands = [];
let video;
let ractange;
let ball;


function preload(){

    let options = {
        flipped: false,
        runtime: "tfjs",
        modelType: "lite",
        detectorModelUrl: undefined,
        landmarkModeUrl: undefined,
    }

    handPose = ml5.handPose(options);
}

function setup () {

    new Canvas(640, 480);

    let constraints = {
        video:{
            mandatory:{
                midWidth: width,
                minHeight: height
            },
            optional: [{minFrameRate: 60}]
        },
        audio: false,
        flipped: false,
        };  

    video = createCapture(constraints);
    video.size(width, height);
    video.hide();

    handPose.detectStart(video, gotHands);

    ractange = new Sprite();
    ractange.width = 300;
    ractange.height = 20;
    ractange.color = "rgb(21, 0, 255)";
    ractange.collider = "static";

    ball = new Sprite();
    ball.diameter = 40;
    ball.x = 320;
    ball.y = 100;
    ball.bounciness = 1;
    ball.collider = 'static';
}

function gotHands(results){
    hands = results;
}

function draw () {
    background("black");


    image(video,0,0,640,480);
    for (let i = 0; i < hands.length; i++) { //this loops through each hand

        let hand = hands[0];
        ractange.x = hand.keypoints[4].x;
        ractange.y = hand.keypoints[4].y;

        for(let j = 0; j <= 19; j++ ) {
            let keypoint = hand.keypoints[j];
            circle(keypoint.x,keypoint.y,30);
        } 
    }   
}
function mousePressed() {
    if (mouseButton === LEFT/RIGHT) {
        ball.collider = "dynamic";
        
    }
}
