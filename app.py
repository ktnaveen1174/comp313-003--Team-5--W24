from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

# Load the trained model and label encoder from saved files
model = pickle.load(open('model.pkl', 'rb'))
le = pickle.load(open('label_encoder.pkl', 'rb'))
disease_descriptions = pickle.load(open('disease_descriptions.pkl', 'rb'))
disease_precautions = pickle.load(open('disease_precautions.pkl', 'rb'))

# Standardize column names to avoid case sensitivity or trailing space issues
# disease_descriptions_df.columns = disease_descriptions_df.columns.str.lower().str.strip()
# disease_precautions_df.columns = disease_precautions_df.columns.str.lower().str.strip()


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms_input = data.get('symptoms', {})
    days = data.get('days', 0)
    
    symptoms_vector = convert_symptoms_to_vector(symptoms_input, model.feature_names_in_)
    
    prediction = model.predict(symptoms_vector)
    predicted_disease_index = prediction[0]
    predicted_disease = le.inverse_transform([predicted_disease_index])[0]

    # disease_description = get_disease_description(predicted_disease)
    # precautions = get_precautions(predicted_disease)

    # response = {
    #     "diagnosis": predicted_disease,
    #     "description": disease_description,
    #     "precautions": precautions,
    #     "days": days
    # }

    disease_description = disease_descriptions.get(predicted_disease, "Description not found.")
    precautions = disease_precautions.get(predicted_disease, ["No specific precautions found."])

    response = {
        "diagnosis": predicted_disease,
        "description": disease_description,
        "precautions": precautions
    }
    return jsonify(response)

def convert_symptoms_to_vector(symptoms_input, symptom_columns):
    symptoms_vector = np.zeros(len(symptom_columns))
    for symptom in symptoms_input:
        if symptom in symptom_columns:
            index = np.where(symptom_columns == symptom)[0][0]
            symptoms_vector[index] = 1
    return symptoms_vector.reshape(1, -1)

def get_disease_description_by_index(disease_index):
    # Fetch the description using the disease index
    return disease_index_to_description.get(disease_index, "Description not found.")

def get_precautions_by_index(disease_index):
    # Fetch the precautions list using the disease index
    return disease_index_to_precautions.get(disease_index, ["No specific precautions found."])





if __name__ == '__main__':
    app.run(debug=True)
