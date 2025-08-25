from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
import csv
import os
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from urllib.parse import quote_plus
import logging

app = Flask(__name__)
CORS(app)

username = 'prathamshahps000'
password = 'kpratham@911'
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)
mongodb_connection_string = f"mongodb+srv://{encoded_username}:{encoded_password}@sei-lab.zbkmn.mongodb.net/senti-analysis?retryWrites=true&w=majority"

app.config["MONGO_URI"] = mongodb_connection_string
app.config['UPLOAD_FOLDER'] = 'uploads'

mongo = PyMongo(app)

try:
    mongo.db.command('ping')
    print("MongoDB connection successful.")
except Exception as e:
    print(f"MongoDB connection failed: {e}")


tokenizer = AutoTokenizer.from_pretrained("KPROCKS/Model")
model = AutoModelForSequenceClassification.from_pretrained("KPROCKS/Model")
model.eval()

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        logging.info(f"Processing file: {filename}")
        
        # Process the file and use the static collection 'comments'
        process_file(filepath)
        
        return jsonify({'message': 'File successfully uploaded and processed. Data stored in collection: comments'}), 200


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv'}

def process_file(filepath):
    # Use the static collection name 'comments'
    collection = mongo.db['comments']

    # Delete all data in the 'comments' collection
    logging.info("Deleting existing data in the 'comments' collection")
    result = collection.delete_many({})  # Delete all documents
    
    logging.info(f"Deleted {result.deleted_count} documents from the 'comments' collection")
    # Insert new data
    with open(filepath, 'r', encoding='utf-8') as file:
        print('reading csv')
        csv_reader = csv.reader(file)
        comments = []
        
        # Skip the first row (header)
        next(csv_reader, None)
        
        for row in csv_reader:
            if row:  # Ensure non-empty rows are processed
                comment = row[0]  # Assuming the comment is in the first column
                print(comment)
                sentiment = analyze_sentiment(comment)
                print(sentiment)
                comments.append({
                    'text': comment,
                    'sentiment': sentiment
                })
        
        if comments:
            logging.info(f"Inserting {len(comments)} records into the 'comments' collection")
            collection.insert_many(comments)

def analyze_sentiment(text):
    # Tokenize the input text
    # inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=128)
    inputs = tokenizer(
        text,
        # add_generation_prompt=True,
        return_tensors="pt",
        padding=True,  # Ensures sequences are padded to the same length
        truncation=True  # Optional: Truncate to model's max sequence length
    )
    # outputs = model.generate(
    #     inputs,
    #     max_new_tokens=780,
    #     do_sample=False,
    #     num_return_sequences=1,
    #     eos_token_id=tokenizer.eos_token_id
    # )
    output = model(**inputs)
    # output = tokenizer.decode(outputs[0][len(inputs[0]):], skip_special_tokens=True)

    print(output)

    # Check if tokenization worked correctly (debugging step)
    logging.info(f"Tokenized input for text '{text}': {inputs}")

    # with torch.no_grad():
    #     # Get the model logits (raw predictions)
    #     logits = model(**inputs).logits
        
    # Convert logits to probabilities
    probabilities = torch.nn.functional.softmax(output.logits, dim=-1)
    
    # Get the predicted class (index of max probability)
    predicted_class_id = probabilities.argmax().item()

    # Debugging: Log the logits and predicted probabilities for better understanding
    logging.info(f"Logits: {output.logits}")
    logging.info(f"Probabilities: {probabilities}")
    logging.info(f"Predicted class ID: {predicted_class_id}")

    # Labels for the classes (assuming your model has 3 classes: Negative, Neutral, Positive)
    sentiment_labels = ["Negative","Neutral","Positive"]

    # Return the sentiment based on the predicted class
    return sentiment_labels[predicted_class_id]

@app.route('/sentiment', methods=['POST'])
def analyze_sentiments():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    sentiment = analyze_comments(text)

    return jsonify({'sentiment': sentiment}), 200

def analyze_comments(text):
    # Tokenize the input text
    inputs = tokenizer(
        text,
        return_tensors="pt",
        padding=True,
        truncation=True
    )

    # Get the model output
    output = model(**inputs)

    # Convert logits to probabilities
    probabilities = torch.nn.functional.softmax(output.logits, dim=-1)

    # Get the predicted class (index of max probability)
    predicted_class_id = probabilities.argmax().item()

    # Labels for the classes (assuming your model has 3 classes: Negative, Neutral, Positive)
    sentiment_labels = ["Negative", "Neutral", "Positive"]

    # Return the sentiment based on the predicted class
    return sentiment_labels[predicted_class_id]
@app.route('/results', methods=['GET'])
def get_results():
    try:
        # Always query the 'comments' collection
        logging.info("Fetching results from the 'comments' collection")
        collection = mongo.db['comments']
        comments = collection.find()
        
        results = []
        for comment in comments:
            results.append({
                'id': str(comment['_id']),
                'text': comment['text'],
                'sentiment': comment['sentiment']
            })
        return jsonify(results), 200 
    except Exception as e:
        logging.error(f"Error while fetching results: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)