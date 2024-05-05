// Define the Idol class
class Idol {
  constructor(name, name_JP_order, nickname, firstname, height, bustSize, waistSize, hipSize, group, schoolYear) {
    this.name = name;
	this.name_JP_order = name_JP_order;
	this.nickname = nickname;
	this.firstname = firstname;
    this.height = height;
    this.bustSize = bustSize;
    this.waistSize = waistSize;
    this.hipSize = hipSize;
    this.group = group;
    this.schoolYear = schoolYear;
  }
}

// Function to fetch and parse CSV data
async function fetchData() {
  try {
    // Fetch CSV file
    const response = await fetch('sizesData.csv');
    const data = await response.text();
    
    // Parse CSV data
    const rows = data.split('\n');
    const objects = [];
    const headers = rows[0].split(','); // Assuming the first row contains headers
	// console.log(headers);
    for (let i = 1; i < rows.length-1; i++) {
      const values = rows[i].split(',');
	  // console.log(values);
      const object = {};
      for (let j = 0; j < headers.length; j++) {
        object[headers[j].trim()] = values[j].trim();
      }
	  // console.log(object);
      objects.push(object);
    }
	return objects;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function initializeGame() {
  try {
    const objects = await fetchData();
	// Create objects
    idols.length = 0; // Clear existing data in the global variable
    objects.forEach(object => {
      idols.push(new Idol(object.name, object.name_JP_order, object.nickname, object.first_name, 
	                      parseInt(object.height), parseInt(object.bustSize), parseInt(object.waistSize), parseInt(object.hipSize), 
						  object.group, parseInt(object.schoolYear)));
    });
	// console.log(idols);
	
	// shuffle them
	shuffle(idols);

	// Display first question when the page loads
	displayQuestion();
	
  } catch (error) {
	  console.error('Error loading data:', error);
  }
}

// A quick shuffle function
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function updateQuestionText(query_string){
	
	// admittedly the writing of this code is not clean
	const current_idol = filterIdolsByGroup(currentGroup)[currentQuestionIndex];
	
	let question = "";
	
	// names display
	let idol_name = "";
	if (use_nicknames){
		idol_name = current_idol.nickname;
		// possibility of NA due to no nickname - use first name instead
		if (idol_name === "NA"){
			idol_name = current_idol.firstname;
		}
		// use a different phrasing for nickname cases
		question = `What is ${idol_name}'s ${size_string}?`;
		
    } else if (use_JP_name_order){
		idol_name = current_idol.name_JP_order;
		question = `What is the ${size_string} of ${idol_name}?`;
	} else{
		idol_name = current_idol.name;
		question = `What is the ${size_string} of ${idol_name}?`;
	}
    questionElement.textContent = question;
}

const idols = [];

// Get HTML elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultElement = document.getElementById('result');
const resultElement2 = document.getElementById('optionResult');
const groupSelect = document.getElementById('groupSelect');
const questionTypeSelect = document.querySelectorAll('input[name="questionType"]');
const nameJPOrderSelect = document.getElementById('nameJPorderToggle');
const useNicknamesSelect = document.getElementById('nicknamesToggle');

// important globals
let timeoutId; // for timeout ID events

let currentQuestionIndex = 0;
let correctAnswers = 0;
let currentGroup = 'all';

// question display related
let size_string = ""
let use_JP_name_order = 0;
let use_nicknames = 0;

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
  
  // height, B, W, H
  let type_to_ask;
  let questionType = document.querySelector('input[name="questionType"]:checked').value;
  if (questionType === 'allstats'){
	  type_to_ask = Math.floor(Math.random() * 4);
  } else if (questionType === 'height'){
	  type_to_ask = 0;
  } else if (questionType === 'threesizes'){
	  type_to_ask = Math.floor(Math.random() * 3) + 1; // 1, 2, 3
  } else if (questionType === 'bustsize'){
	  type_to_ask = 1;
  } else if (questionType === 'waistsize'){
	  type_to_ask = 2;
  } else if (questionType === 'hipsize'){
	  type_to_ask = 3;
  }
  
  // look-up size 
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
  
  updateQuestionText(); 

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

// Event listener for the radio buttons
questionTypeSelect.forEach(input => {
  input.addEventListener('change', startNewQuiz);

});

// Event listener for the JP name order toggle
nameJPOrderSelect.addEventListener('change', () => {
	// console.log(nameJPOrderSelect.checked);
	if (nameJPOrderSelect.checked){
		use_JP_name_order = 1;
	} else {
	    use_JP_name_order = 0;
	}
	updateQuestionText();
}); 

// Add event listener to the "Use JP name order" checkbox
useNicknamesSelect.addEventListener('change',function (){
	// Disable the "Use JP name order" checkbox if the "Use nicknames" checkbox is checked
	
	if (useNicknamesSelect.checked){
		use_nicknames = 1;
	} else {
	    use_nicknames = 0;
	}
	updateQuestionText();
	nameJPOrderSelect.disabled = this.checked;
});

// Everything ready, initialize
initializeGame();