from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import joblib
import numpy as np
from datetime import datetime
import os
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Required for session

# Dummy credentials for demo
USERNAME = 'pranav'
PASSWORD = 'pok2004emon'

# Load the trained model
model = joblib.load('heart_disease_model.pkl')

# Create a predictions directory if it doesn't exist
PREDICTIONS_DIR = 'predictions'
if not os.path.exists(PREDICTIONS_DIR):
    os.makedirs(PREDICTIONS_DIR)

@app.route('/')
def landing():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        # Debug print
        print(f"Entered Username: {username}, Password: {password}")

        if username == USERNAME and password == PASSWORD:
            session['user'] = username
            return redirect(url_for('dashboard'))
        else:
            error = 'Invalid Credentials. Try again.'
    
    return render_template('login.html', error=error)

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

@app.route('/predict-page')
def predict_page():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'user' not in session:
        return redirect(url_for('login'))
    try:
        # Extract features from form
        features = [float(x) for x in request.form.values()]
        final_features = np.array([features])
        
        # Make prediction
        prediction = model.predict(final_features)
        output = 'High Risk' if prediction[0] == 1 else 'Low Risk'
        
        # Save prediction to file
        save_prediction(request.form, output)
        
        return render_template('index.html', prediction_text=f'Heart Disease Prediction: {output}')
    except Exception as e:
        return render_template('index.html', prediction_text=f'Error: {str(e)}')

@app.route('/history')
def history():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    # Get prediction history
    predictions = get_predictions()
    
    return render_template('history.html', predictions=predictions)

@app.route('/profile')
def profile():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('profile.html')

@app.route('/insights')
def insights():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('insights.html')

@app.route('/videos')
def videos():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('videos.html')

@app.route('/lifestyle')
def lifestyle():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('lifestyle.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

# Helper function to save prediction
def save_prediction(form_data, result):
    user = session.get('user', 'anonymous')
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    prediction_id = f"{user}_{timestamp}"
    
    prediction_data = {
        'id': prediction_id,
        'user': user,
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'result': result,
        'features': {
            'age': form_data.get('age'),
            'sex': form_data.get('sex'),
            'cp': form_data.get('cp'),
            'trestbps': form_data.get('trestbps'),
            'chol': form_data.get('chol'),
            'fbs': form_data.get('fbs'),
            'restecg': form_data.get('restecg'),
            'thalach': form_data.get('thalach'),
            'exang': form_data.get('exang'),
            'oldpeak': form_data.get('oldpeak'),
            'slope': form_data.get('slope'),
            'ca': form_data.get('ca'),
            'thal': form_data.get('thal')
        }
    }
    
    # Save to file
    file_path = os.path.join(PREDICTIONS_DIR, f"{prediction_id}.json")
    with open(file_path, 'w') as f:
        json.dump(prediction_data, f, indent=4)

# Helper function to get predictions
def get_predictions():
    predictions = []
    user = session.get('user', 'anonymous')
    
    # Check if predictions directory exists
    if not os.path.exists(PREDICTIONS_DIR):
        return predictions
    
    # Get all prediction files for the current user
    for filename in os.listdir(PREDICTIONS_DIR):
        if filename.startswith(f"{user}_") and filename.endswith('.json'):
            file_path = os.path.join(PREDICTIONS_DIR, filename)
            with open(file_path, 'r') as f:
                prediction_data = json.load(f)
                predictions.append(prediction_data)
    
    # Sort by date (newest first)
    predictions.sort(key=lambda x: x['date'], reverse=True)
    
    return predictions

@app.route('/api/delete-prediction/<prediction_id>', methods=['DELETE'])
def delete_prediction(prediction_id):
    if 'user' not in session:
        return jsonify({'success': False, 'error': 'Not authenticated'}), 401
    
    file_path = os.path.join(PREDICTIONS_DIR, f"{prediction_id}.json")
    
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Prediction not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)