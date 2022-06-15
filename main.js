function preload() {
 classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(510, 290);
    background('white');
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    } else{
        console.log("results");
        document.getElementById("guess").innerHTML = results[0].label;
        document.getElementById("percen").innerHTML = Math.round(results[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}
