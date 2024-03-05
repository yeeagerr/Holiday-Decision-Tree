from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)

# Load the pre-trained model
data = pd.read_csv('Database Holiday Mate.csv')
X = data[['City', 'Countryside', 'Seaside', 'Riverside', 'Mountains', 'Hotel', 'Hostel', 'Camping', 'Train', 'Train + Bike', 'Bus', 'Explore Nature', 'Food', 'Culture', 'Party', 'Relaxing', 'Active Holiday']]
y = data[['HolidayPlace', 'Description', 'Picture']]

model = DecisionTreeClassifier()
model.fit(X, y)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    features = request.json['features']
    prediction = model.predict([features])[0]

    place = prediction[0]
    description = prediction[1]
    picture = prediction[2]

    return jsonify({
        "prediction": place,
        "description" : description,
        "picture" : picture
        })

if __name__ == '__main__':
    app.run(debug=True)
