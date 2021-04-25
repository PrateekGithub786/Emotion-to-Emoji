prediction1 = "";
prediction2 = "";

Webcam.set({
   width: 350,
   height: 300,
   image_format: 'png',
   png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
     });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is" + prediction1;
    speak_data2 = "and the second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function showPrediction(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(prediction1 == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(prediction1 == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(prediction1 == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if(prediction2 == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(prediction2 == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(prediction2 == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
    }
}

