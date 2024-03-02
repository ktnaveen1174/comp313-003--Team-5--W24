# comp313-003 (Team 5, W24)
 Software Development 2

 Steps to run front-end:
 =======================
 Within frontend folder run below commands:
 - npm install
 - npm start

 Steps to run the Flask API
 ==========================
 run this command: 
 python app.py

Sample Request Body::::
{
  "symptoms": {
    "stomach_pain": "yes",
    "acidity": "yes",
    "ulcers_on_tongue": "no",
    "vomiting": "no",
    "cough": "yes",
    "chest_pain": "no"
  },
  "days": 4
}

Sample Response:
{
    "description": "Gastroesophageal reflux disease, or GERD, is a digestive disorder that affects the lower esophageal sphincter (LES), the ring of muscle between the esophagus and stomach. Many people, including pregnant women, suffer from heartburn or acid indigestion caused by GERD.",
    "diagnosis": "GERD",
    "precautions": [
        "avoid fatty spicy food",
        "avoid lying down after eating",
        "maintain healthy weight",
        "exercise"
    ]
}

