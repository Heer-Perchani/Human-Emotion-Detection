// Getting all the html elemenets 
const imageInput = document.getElementById("imageInput"); //this is input in html
const previewImage = document.getElementById("previewImage"); //this is img in html 
const uploadIcon = document.getElementById("uploadIcon"); //this is the upload icon image in html 
const resultBox = document.getElementById("result"); //this is the emotion detected text 
const predictBtn = document.getElementById("predictBtn"); //this is a button in html


// List of all the possibel emotions
const emotions = [
    { name: "Happy", emoji: "😊" },
    { name: "Sad", emoji: "😢" },
    { name: "Angry", emoji: "😡" },
    { name: "Surprised", emoji: "😮" },
    { name: "Neutral", emoji: "😐" }
];

let loopInterval = null;


// This is basically like when the Image input changes do this
imageInput.addEventListener("change", function () { //run this function when the user chnages the file input i.e selects a file from the directory 
    const file = this.files[0]; //this.files is like all the files the user selects and then get teh first one from that
    if (!file) return; //if that file is null, return nothing 

    const reader = new FileReader(); //create a file reader, allows to read images off internet, used to convert images into a previewable format, built in JS thing 

    reader.onload = function (e) { //defines what happens when the file is fully loaded 
        previewImage.src = e.target.result; //e.target.result cotaisn the image as a base64 link string, its like telling the previewImage img tag in html to show that image 
        previewImage.style.display = "block"; //display image as a block level elemnt (some css thing)
        uploadIcon.style.display = "none"; //this hides the upload icon 
    };

    reader.readAsDataURL(file); //this what reads the file and converts it to the base64 link to something u can display on the browser
});

//so its basically like in the function you create a file reader, tell what happens when teh reader is done reading the file (Which is the onlaod), and then readasdataurl is what basically starts that process of reading teh file

// Makes it look like the app is thinking
function startEmojiLoop() {
    let index = 0;

    loopInterval = setInterval(() => { //setInterval is used to run a code in loop so it loops the emoji every 600ms, stored in loopinterval so that we can stop it later
        const emotion = emotions[index]; //sets the current emotion as the one on that index 
        resultBox.innerHTML = `Emotion detected: ${emotion.name} <span class="emoji-loop">${emotion.emoji}</span>`;
        index = (index + 1) % emotions.length;
    }, 600);
}


// ===== Stop Loop + Show Final Emotion =====
function stopEmojiLoop(finalEmotion) {
    clearInterval(loopInterval);
    loopInterval = null;

    const match = emotions.find(e => e.name.toLowerCase() === finalEmotion.toLowerCase());
    const emoji = match ? match.emoji : "🙂";

    resultBox.innerHTML = `Emotion detected: ${finalEmotion} ${emoji}`;
}


// ===== Predict Button =====
predictBtn.addEventListener("click", async function () {

    if (!imageInput.files[0]) {
        alert("Please upload an image first!");
        return;
    }

    startEmojiLoop();

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);

    try {
        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        stopEmojiLoop(data.emotion);

    } catch (err) {
        stopEmojiLoop("Error");
        console.error(err);
    }
});
