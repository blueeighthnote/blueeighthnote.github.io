// Define the Idol class
class Idol {
  constructor(name, height, bustSize, waistSize, hipSize, group, schoolYear) {
    this.name = name;
    this.height = height;
    this.bustSize = bustSize;
    this.waistSize = waistSize;
    this.hipSize = hipSize;
    this.group = group;
    this.schoolYear = schoolYear;
  }
}

// Create instances of Idol
const idols = [
  new Idol('Honoka Kosaka',  157, 78, 58, 82, 'group1', 2),
  new Idol('Kotori Minami',  159, 80, 58, 80, 'group1', 2),
  new Idol('Umi Sonoda',     159, 76, 58, 80, 'group1', 2),
  new Idol('Rin Hoshizora',  155, 75, 59, 80, 'group1', 1),
  new Idol('Maki Nishikino', 161, 78, 56, 83, 'group1', 1),
  new Idol('Hanayo Koizumi', 156, 82, 60, 83, 'group1', 1),
  new Idol('Nico Yazawa',    154, 74, 57, 79, 'group1', 3),
  new Idol('Eli Ayase',      162, 88, 60, 84, 'group1', 3),
  new Idol('Nozomi Tojo',    159, 90, 60, 82, 'group1', 3),

  new Idol('Chika Takami',      157, 82, 59, 83, 'group2', 2),
  new Idol('Riko Sakurauchi',   160, 80, 58, 82, 'group2', 2),
  new Idol('Kanan Matsuura',    162, 83, 58, 84, 'group2', 3),
  new Idol('Dia Kurosawa',      162, 80, 57, 80, 'group2', 3),
  new Idol('You Watanabe',      157, 82, 57, 81, 'group2', 2),
  new Idol('Yoshiko Tsushima',  156, 79, 58, 80, 'group2', 1),
  new Idol('Hanamaru Kunikida', 152, 83, 57, 83, 'group2', 1),
  new Idol('Mari Ohara',        163, 87, 60, 84, 'group2', 3),
  new Idol('Ruby Kurosawa',     154, 76, 56, 79, 'group2', 1),

  new Idol('Sarah Kazuno', 162, 85, 59, 84, 'ss', 3),
  new Idol('Leah Kazuno',  153, 79, 56, 81, 'ss', 1),

  new Idol('Ayumu Uehara',   159, 82, 58, 84, 'group3', 2),
  new Idol('Kasumi Nakasu',  155, 76, 55, 79, 'group3', 1),
  new Idol('Shizuku Osaka',  157, 80, 58, 83, 'group3', 1),
  new Idol('Karin Asaka',    167, 88, 57, 89, 'group3', 3),

  new Idol('Ai Miyashita',   163, 84, 53, 86, 'group3', 2),
  new Idol('Kanata Konoe',   158, 85, 60, 86, 'group3', 3),

  new Idol('Setsuna Yuki',   154, 83, 56, 81, 'group3', 2),
  new Idol('Emma Verde',     166, 92, 61, 88, 'group3', 3),
  new Idol('Rina Tennoji',   149, 71, 52, 75, 'group3', 1),

  new Idol('Shioriko Mifune',160, 79, 56, 78, 'group3', 1),
  new Idol('Lanzhu Zhong',   166, 87, 55, 82, 'group3', 2),
  new Idol('Mia Taylor',     156, 80, 50, 80, 'group3', 3),

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
const resultElement = document.getElementById('result');
const resultElement2 = document.getElementById('optionResult');
const groupSelect = document.getElementById('groupSelect');

// important globals
let timeoutId; // for timeout ID events

let currentQuestionIndex = 0;
let correctAnswers = 0;
let currentGroup = 'all';

// Function to filter idols by group
function filterIdolsByGroup(group) {
  if (group === 'all') {
    return idols;
  } else if (group === 'group2ss') {
    // console.log(idols.filter(idol => idol.group === 'group2' || idol.group === 'ss'));
    return idols.filter(idol => idol.group === 'group2' || idol.group === 'ss');
  } else if (group === 'Year1' || group === 'Year2' || group === 'Year3'){
    const schoolYear = parseInt(group.slice(-1));
    console.log(schoolYear);
    return idols.filter(idol => idol.schoolYear === schoolYear);
  } else {
    return idols.filter(idol => idol.group === group);
  }
}

// Display current question and options
function displayQuestion() {
  const filteredIdols = filterIdolsByGroup(currentGroup);
  const currentIdol = filteredIdols[currentQuestionIndex];

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
  optionsElement.innerHTML = ' ';
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
  const filteredIdols = filterIdolsByGroup(currentGroup);
  const currentIdol = filteredIdols[currentQuestionIndex];
  const options = optionsElement.querySelectorAll('.option');

  // Special case for Nico
  const nicoBustSizeCase = correctAnswer === 74 && type_to_ask === 1;
  const special1 = nicoBustSizeCase ? "..??!" : "";

  // Disable user interaction with options
  options.forEach(option => {
    option.disabled = true;
    if (parseInt(option.textContent) === correctAnswer) {
      option.classList.add('correct');
    } else if (nicoBustSizeCase && parseInt(option.textContent) === 71 && selectedOption != 74) {
      option.classList.add('premium'); // Nico case, and only display when wrong
    } else {
      option.classList.add('incorrect');
    }
  });

  if (selectedOption === correctAnswer) {
    if (nicoBustSizeCase){
      // alert('Correct......?!');
      resultElement2.textContent = 'Correct......?!';
    }
    else {
      // alert('Correct!');
      resultElement2.textContent = 'Correct!';
    }
    correctAnswers++;
  } else if (nicoBustSizeCase && selectedOption === 71) {  
    // alert('You found the true correct answer. Let\'s keep it a secret between us, okay? Nico Nico Nii!');
    resultElement2.textContent = 'You found the true correct answer. Let\'s keep it a secret between us, okay? Nico Nico Nii!';
    correctAnswers++;
  } else {
    // alert(`Incorrect! The correct answer is ${correctAnswer}.`);
    resultElement2.textContent = `Incorrect! The correct answer is ${correctAnswer}.${special1}`;
  }

  // Wait for 1 second before moving to the next question
  timeoutId = setTimeout(moveToNextQuestion, 1000);
  
}

function moveToNextQuestion(){
  // Move to the next question
  currentQuestionIndex++;
  resultElement.textContent = ' ';
  resultElement2.textContent = ' ';
  if (currentQuestionIndex < filterIdolsByGroup(currentGroup).length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Show quiz results
function showResult() {
  resultElement.textContent = `Quiz completed! You got ${correctAnswers} out of ${filterIdolsByGroup(currentGroup).length} questions correct.`;
  nextButton.textContent = 'Start New Quiz';
  nextButton.addEventListener('click', startNewQuiz);
}

// Start a new quiz
function startNewQuiz() {
  nextButton.textContent = 'PASS';
  shuffle(idols);

  correctAnswers = 0; // Reset correctAnswers for next quiz
  currentQuestionIndex = 0; // Reset currentQuestionIndex for next quiz
  clearTimeout(timeoutId); // clear any timeouts unused
  resultElement.textContent = ' '; // Clear previous result
  resultElement2.textContent = ' '; // Clear previous result
  nextButton.removeEventListener('click', startNewQuiz);
  currentGroup = groupSelect.value; // Update current group based on selection
  displayQuestion();
}

// Event listener for the next button
nextButton.addEventListener('click', () => {
  // Display next question
  moveToNextQuestion();
});

// Event listener for group selection change
groupSelect.addEventListener('change', startNewQuiz);

// Display first question when the page loads
displayQuestion();