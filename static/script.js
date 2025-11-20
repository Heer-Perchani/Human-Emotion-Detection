// ===== HTML Elements =====
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const uploadIcon = document.getElementById("uploadIcon");
const resultBox = document.getElementById("result");
const predictBtn = document.getElementById("predictBtn");


// ===== Emoji Loop Setup =====
const emotions = [
    { name: "Happy", emoji: "😊" },
    { name: "Sad", emoji: "😢" },
    { name: "Angry", emoji: "😡" },
    { name: "Surprised", emoji: "😮" },
    { name: "Neutral", emoji: "😐" }
];

let loopInterval = null;


// ===== Show Preview Image in Fixed Box =====
imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
        uploadIcon.style.display = "none";
    };

    reader.readAsDataURL(file);
});


// ===== Start Emoji Loop =====
function startEmojiLoop() {
    let index = 0;

    loopInterval = setInterval(() => {
        const emotion = emotions[index];
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
