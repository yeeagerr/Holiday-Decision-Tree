let features = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let predictfeatures = [];
let featureNames = [
  "City",
  "Countryside",
  "Seaside",
  "Riverside",
  "Mountains",
  "Hotel",
  "Hostel",
  "Camping",
  "Train",
  "Train + Bike",
  "Bus",
  "Explore Nature",
  "Food",
  "Culture",
  "Party",
  "Relaxing",
  "Active Holiday",
];

function updateQuestion() {
  const questionDiv = document.getElementById("question");
  const currentQuestionIndex = features.findIndex((value) => value === 0);
  console.log(currentQuestionIndex);
  //   console.log(predictfeatures);

  if (currentQuestionIndex == -1) {
    makePrediction();
    questionDiv.innerHTML = " ";
  } else {
    questionDiv.innerHTML =
      "Is " + featureNames[currentQuestionIndex] + " a preferred feature?";
  }
}

function answerYes() {
  const currentQuestionIndex = features.findIndex((value) => value === 0);
  if (currentQuestionIndex !== -1) {
    features[currentQuestionIndex] = 1;
    predictfeatures.push(1);
    updateQuestion();
  } else {
    makePrediction();
  }
}

function answerNo() {
  const currentQuestionIndex = features.findIndex((value) => value === 0);
  if (currentQuestionIndex !== -1) {
    features[currentQuestionIndex] = -1;
    predictfeatures.push(0);

    updateQuestion();
  }
}

function makePrediction() {
  const questionDiv = document.getElementById("featuresNum");

  const questionDiv2 = document.getElementById("question");
  const desc = document.getElementById("desc");
  const img = document.querySelector(".image");

  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ features: predictfeatures }),
  })
    .then((response) => response.json())
    .then((data) => {
      questionDiv.innerHTML = `Predicted Holiday Place: ${data.prediction}`;
      questionDiv2.innerHTML = data.prediction;
      desc.innerHTML = `Description: ${data.description}`;
      img.src = data.picture;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
updateQuestion();
