Webcam.set({
width:400,
height:290,
image_format:"png",
png_quality: 200
});
var cam=document.getElementById("camera");

Webcam.attach(cam);
function take_pic(){
    Webcam.snap(function(data_uri){
        document.getElementById("pic").innerHTML='<img id="captured_img" src="'+data_uri+'">';
    });
}
console.log("ml5version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/W_NPSZUdD/model.json",modelLoaded);

function modelLoaded(){
console.log("model is intialised");
}
prediction_1="";
prediction_2="";

function speak(){
    var synth= window.speechSynthesis;
    var speak_data_1= "The First Prediction is"+prediction_1;
    var speak_data_2= "The Second Prediction is"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function predict(){
    var img= document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("emotion_result_1").innerHTML=results[0].label;
        document.getElementById("emotion_result_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if (results[0].label=="Happy"){
            document.getElementById("emoji_result_1").innerHTML="&#128513;";
        }
        if (results[0].label=="Sad"){
            document.getElementById("emoji_result_1").innerHTML="&#128543;";
        }
        if (results[0].label=="Angry"){
            document.getElementById("emoji_result_1").innerHTML="&#128545;";
        }
        if (results[0].label=="Victory"){
            document.getElementById("emoji_result_1").innerHTML="&#9996;";
        }


        if (results[1].label=="Happy"){
            document.getElementById("emoji_result_2").innerHTML="&#128513;";
        }
        if (results[1].label=="Sad"){
            document.getElementById("emoji_result_2").innerHTML="&#128543;";
        }
        if (results[1].label=="Angry"){
            document.getElementById("emoji_result_2").innerHTML="&#128545;";
        }
        if (results[1].label=="Victory"){
            document.getElementById("emoji_result_2").innerHTML="&#9996;";
        }
    }
}