# Heart Disease Detection System

![Heart Disease Detection](https://img.shields.io/badge/Health-Heart%20Disease%20Detection-red)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.3-lightgrey)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive web application for heart disease risk assessment and management. This system uses machine learning to predict the risk of heart disease based on various health parameters and provides educational resources for heart health.

![Dashboard Screenshot](https://via.placeholder.com/800x400?text=Heart+Disease+Detection+Dashboard)

## Features

- **User Authentication**: Secure login system to protect user data
- **Heart Disease Prediction**: Advanced machine learning model to predict heart disease risk
- **Risk Assessment Quiz**: Simple questionnaire to assess heart health risk
- **Prediction History**: Track and review previous risk assessments
- **User Profile**: Manage personal health information
- **Health Insights**: Visualize risk factors and prevention strategies
- **Educational Resources**: Access articles, videos, and guides about heart health
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/heart-disease-detection.git
   cd heart-disease-detection
   \`\`\`

2. Create a virtual environment:
   \`\`\`bash
   python -m venv venv
   \`\`\`

3. Activate the virtual environment:
   - On Windows:
     \`\`\`bash
     venv\Scripts\activate
     \`\`\`
   - On macOS/Linux:
     \`\`\`bash
     source venv/bin/activate
     \`\`\`

4. Install the required packages:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

5. Make sure you have the heart disease model file:
   - The application expects a file named `heart_disease_model.pkl` in the root directory
   - If you don't have this file, you can train your own model using the provided Jupyter notebook in the `model` directory

## Usage

1. Start the application:
   \`\`\`bash
   python app.py
   \`\`\`

2. Open your web browser and navigate to:
   \`\`\`
   http://127.0.0.1:5000/
   \`\`\`

3. Login with the demo credentials:
   - Username: pranav
   - Password: pok2004emon

4. Navigate through the dashboard to access different features:
   - Make a prediction
   - Take the risk assessment quiz
   - View your prediction history
   - Explore health insights
   - Browse educational resources

## Project Structure

\`\`\`
heart-disease-detection/
├── app.py                  # Main Flask application
├── heart_disease_model.pkl # Trained machine learning model
├── requirements.txt        # Python dependencies
├── predictions/            # Directory for storing prediction data
├── ui/
|    └── chart.js           # For the Chart to be generated 
├── static/                 # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── script.js       # JavaScript functionality
└── templates/              # HTML templates
    ├── dashboard.html      # Dashboard page
    ├── history.html        # Prediction history page
    ├── index.html          # Prediction page
    ├── insights.html       # Health insights page
    ├── login.html          # Login page
    ├── profile.html        # User profile page
    ├── videos.html         # Educational videos related to Heart Health
    └── lifestyle.html      # Life Style Tips
\`\`\`

## Machine Learning Model

The heart disease prediction model is built using scikit-learn and trained on the UCI Heart Disease dataset. The model uses the following features:

- Age
- Sex
- Chest Pain Type
- Resting Blood Pressure
- Serum Cholesterol
- Fasting Blood Sugar
- Resting ECG Results
- Maximum Heart Rate
- Exercise Induced Angina
- ST Depression
- Slope of Peak Exercise ST Segment
- Number of Major Vessels
- Thalassemia

The model achieves approximately 85% accuracy in predicting heart disease risk.

## Future Enhancements

- User registration system
- Integration with wearable devices
- PDF report generation
- Email notifications for high-risk predictions
- Mobile application
- Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UCI Machine Learning Repository for the heart disease dataset
- scikit-learn for the machine learning tools
- Flask for the web framework
- Bootstrap and Font Awesome for UI components

## Contact

Your Name - pranavvp1507@gmail.com

