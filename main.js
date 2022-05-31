function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}
function draw(){
  image(video,0,0,250,250);
  classifier.classify(video,gotResults);
}
function modelLoaded(){
  console.log("model is loaded");
}
var previous_result = '';
function gotResults(error,results){
  if(error){
    console.log(error);
  }
  else{
    if((results[0].confidence>0.5) && (previous_result != results[0].label)){
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      data = 'object detected is ' + results[0].label;
      utterThis = new SpeechSynthesisUtterance(data);
      synth.speak(utterThis);
      document.getElementById("object").innerHTML= results[0].label;
      document.getElementById("accuracy").innerHTML= results[0].confidence.toFixed(3);
    }
  }
}