# Emotion Recognition Web App

A simple web application that uses a Convolutional Neural Network (CNN) to classify human facial emotions from an uploaded image.  
Built using **PyTorch**, **Flask**, **HTML/CSS/JavaScript**, and the **Human Face Emotions Kaggle Dataset**.

---

## 🚀 Features

- Upload an image from your device  
- Backend automatically preprocesses the image  
- Model predicts one of the 5 emotions:
  - Angry  
  - Fear  
  - Happy  
  - Sad  
  - Surprised  
- Fast inference using PyTorch  
- Clean and simple front-end interface  

---

## 📂 Project Structure

HUMAN-EMOTION-DETECTION/

├── app.py # Flask server
├── model.py # Model architecture + load function
├── emotion_cnn.pt # Saved PyTorch model weights
│
├── static/
│ ├── style.css # Optional front-end styling
│ └── script.js # Handles sending the image to backend
│
└── templates/
└── index.html # Front-end UI

---

## 🧠 Model

The CNN was trained in Google Colab using PyTorch on the  
**samithsachidanandan/human-face-emotions** dataset from Kaggle.

### **Input**
- Images resized to **224 × 224**
- Normalized to mean=`0.5`, std=`0.5`

### **Architecture (Simplified)**

- 4 convolutional blocks  
- Global Average Pooling  
- Fully connected layer with 5 outputs  
- Trained for emotion classification  

Model weights were saved using:

```python
torch.save(model.state_dict(), "emotion_cnn.pt")
```
## 💻 Running the Project Locally

### **Install requirements**
pip install flask torch torchvision pillow
### **Run the Flask server**
python app.py
### **Open the web app**
http://127.0.0.1:5000/
