from flask import Flask, request, jsonify, send_from_directory 
from PIL import Image
import torch
from torchvision import transforms
from model import MyCNNModule  # import your CNN class

#Creates a instance of a Flask web server 
app = Flask(__name__) 

# Sets up the device, if GPU is available that is used, otherwise CPU is used
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model
model = MyCNNModule(num_classes=5)
model.load_state_dict(torch.load("emotion_cnn.pth", map_location=device))
model.eval() #Setting to evaluation mode 
model.to(device)

# Image transforms (same as training) to make sure our model works for the input image
transform = transforms.Compose([
    transforms.Resize((128,128)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

classes = ["Angry", "Fear", "Happy", "Sad", "Surprised"]


@app.route('/')  #When the browser visits the frontend or the homepage, do this(send the index.html file to the browser)
def index():
    return send_from_directory('', 'tempelates/index.html')

#Defines a new url which is /predict, this accepts POST requests (Given to the server)
@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']  #accessing the image uploaded by the user
    img = Image.open(file).convert("RGB") #opening it and converting it into a format understood by the model
    img = transform(img).unsqueeze(0).to(device)  # adds a batch dimension which is needed

    with torch.no_grad():
        output = model(img)
        pred = output.argmax(1).item()
    
    return jsonify({"emotion": classes[pred]}) #sends the result back as a json

if __name__ == "__main__": #so when we do app.py this runs 
    app.run(debug=True)
