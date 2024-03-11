// Define the Idol class
class Idol {
  constructor(name, height, bustSize, waistSize, hipSize) {
    this.name = name;
    this.height = height;
    this.bustSize = bustSize;
    this.waistSize = waistSize;
    this.hipSize = hipSize;
  }
}

// Create instances of Idol
const idols = [
  new Idol('Honoka Kosaka', 157, 78, 58, 82),
  new Idol('Kotori Minami', 159, 80, 58, 80),
  new Idol('Umi Sonoda', 159, 76, 58, 80),
  new Idol('Rin Hoshizora', 155, 75, 59, 80),
  new Idol('Maki Nishikino', 161, 78, 56, 83),
  new Idol('Hanayo Koizumi', 156, 82, 60, 83),
  new Idol('Nico Yazawa', 154, 74, 57, 79),
  new Idol('Eli Ayase', 162, 88, 60, 84),
  new Idol('Nozomi Tojo', 159, 90, 60, 82)
  // Add more idols as needed
];

// A quick shuffle function
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffle(idols);

// Get HTML elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');

let currentQuestionIndex = 0;
let correctAnswers = 0;

// Display current question and options
function displayQuestion() {
  const currentIdol = idols[currentQuestionIndex];

  const type_to_ask = Math.floor(Math.random() * 4);  // height, B, W, H
  let size_string = "";
  let idol_size = 0;

  if (type_to_ask == 0){
      size_string = "height";
      idol_size = currentIdol.height;
  } else if (type_to_ask == 1){
      size_string = "bust size";
      idol_size = currentIdol.bustSize;
  } else if (type_to_ask == 2){
      size_string = "waist size";
      idol_size = currentIdol.waistSize;
  } else if (type_to_ask == 3){
      size_string = "hip size";
      idol_size = currentIdol.hipSize;
  }

  let question = `What is the ${size_string} of ${currentIdol.name}?`;
  questionElement.textContent = question;

  // Generate options
  const options = [];
  let num_options = Math.floor(Math.random() * 3) + 3;
  let start_interval = Math.floor(Math.random() * 3) + 1;
  let start_size = idol_size - Math.floor(Math.random() * (num_options + 0)) * start_interval;

  for (let i = start_size; i <= start_size + start_interval * (num_options - 1); i += start_interval) {
    options.push(i);
  }

  // special case for nico: check if options would cover 
  if (currentIdol.name === 'Nico Yazawa' && type_to_ask == 1){
      if (!options.includes(71)){
          options.push(71);
          options.sort((a, b) => a - b);
      }
  }

  // Display options
  optionsElement.innerHTML = '';
  options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.classList.add('option');
    optionButton.addEventListener('click', () => checkAnswer(option, type_to_ask, idol_size));
    optionsElement.appendChild(optionButton);
  });
}

// Check the selected answer
function checkAnswer(selectedOption, type_to_ask, correctAnswer) {
  const currentIdol = idols[currentQuestionIndex];
  
  // Special case for Nico
  const nicoBustSizeCase = correctAnswer === 74 && type_to_ask === 1;

  if (selectedOption === correctAnswer) {
    if (nicoBustSizeCase){
      alert('Correct......?!');
    }
    else {
      alert('Correct!');
    }
    correctAnswers++;
  } else if (nicoBustSizeCase && selectedOption === 71) {  
    alert('You found the true correct answer. Don\'t tell anyone besides Nico-chan, okay? Nico Nico Nii!');
    correctAnswers++;
  } else {
    alert(`Incorrect! The correct answer is ${correctAnswer}.`);
  }
  moveToNextQuestion();
}

function moveToNextQuestion(){
  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < idols.length) {
    displayQuestion();
  } else {
    alert(`Quiz completed! You got ${correctAnswers} out of ${idols.length} questions correct.`);
    // Optionally, reset quiz or redirect to another page
    currentQuestionIndex = 0;
    correctAnswers = 0;
    displayQuestion();
  }
}

// Event listener for the next button
nextButton.addEventListener('click', () => {
  // Display next question
  moveToNextQuestion();
});



// Display first question when the page loads
displayQuestion();