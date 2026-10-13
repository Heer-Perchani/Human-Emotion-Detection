# Emotion Recognition Web App

A web app that classifies the emotion in a face photo using a convolutional neural network (CNN) I trained from scratch in PyTorch. Upload an image in the browser, and a Flask backend runs the model and returns the predicted emotion.

**Result:** 71% accuracy across 5 emotion classes.

<!-- Add a screenshot of the app here, e.g. ![App screenshot](screenshot.png) -->

## How it works

1. The front end (`tempelates/index.html`, `static/script.js`) sends the uploaded image to the backend.
2. The Flask server (`app.py`) resizes the image to 128 × 128, normalizes it, and runs the CNN.
3. The `/predict` endpoint returns the result as JSON, for example `{"emotion": "Happy"}`.

## Model

- Trained in Google Colab with PyTorch on the Kaggle dataset `samithsachidanandan/human-face-emotions`
- Classes: Angry, Fear, Happy, Sad, Surprised
- Architecture (`model.py`): 4 convolutional blocks, global average pooling, and a fully connected layer with 5 outputs
- Input: 128 × 128 RGB images, normalized with mean 0.5 and std 0.5
- Weights: `emotion_cnn.pth`

## Run it locally

```bash
pip install -r requirements.txt
python app.py
```

Then open http://127.0.0.1:5000/ in your browser.

## Project structure

```
app.py              Flask server: serves the page and the /predict API
model.py            CNN architecture
emotion_cnn.pth     Trained model weights
requirements.txt    Python dependencies
static/             script.js and style.css for the front end
tempelates/         index.html
```

## Built with

Python, PyTorch, torchvision, Flask, Pillow, HTML/CSS/JavaScript
