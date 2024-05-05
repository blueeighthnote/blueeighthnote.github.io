// Define the Idol class
class Idol {
  constructor(name, name_JP_order, birthMonth, birthDay, group, isCharacter, isSeiyuu) {
    this.name = name;
	this.name_JP_order = name_JP_order;
    this.birthMonth = birthMonth;
    this.birthDay = birthDay;
    this.group = group;
    this.isCharacter = isCharacter;
    this.isSeiyuu = isSeiyuu;
  }
}

// Function to fetch and parse CSV data
async function fetchData() {
  try {
    // Fetch CSV file
    const response = await fetch('birthdayData.csv');
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
      idols.push(new Idol(object.name, object.name_JP_order, parseInt(object.birthMonth), parseInt(object.birthDay), object.group, parseInt(object.isCharacter), parseInt(object.isSeiyuu)));
    });
	console.log(idols);
	
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
	// this is for after adjusting name display order (EN or JP)
	// admittedly the writing of this code is not clean
	let idol_name = 0;
	if (use_JP_name_order){
		idol_name = filterIdolsByGroup(currentGroup)[currentQuestionIndex].name_JP_order;
	} else{
		idol_name = filterIdolsByGroup(currentGroup)[currentQuestionIndex].name;
	}
	let question = `When is ${idol_name}'s ${query_string}?`;
    questionElement.textContent = question;
}

const idols = [];

const month_str = ["", "January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];
const month_days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  // index from 1 to avoid confusion

// random game elements global 
let overwhelmCooldown = 0;
let monthModeCooldown = 0;

// Get HTML elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultElement = document.getElementById('result');
const resultElement2 = document.getElementById('optionResult');
const groupSelect = document.getElementById('groupSelect');
const isSeiyuuSelect = document.querySelectorAll('input[name="filterType"]');
const nameJPOrderSelect = document.getElementById('nameJPorderToggle');

// important globals
let timeoutId; // for timeout ID events

let currentQuestionIndex = 0;
let correctAnswers = 0;
let currentGroup = 'all';

// question display related
let use_JP_name_order = 0;

// Function to filter idols by group
function filterIdolsByGroup(group) {
  // adding the seiyuu filters and stuff here
  let filterType = document.querySelector('input[name="filterType"]:checked').value;
  
  // Filter idols based on the selected filter type
  let filteredIdols;
  if (filterType === 'characters') {
    filteredIdols = idols.filter(idol => !idol.isSeiyuu);
  } else if (filterType === 'seiyuus') {
    filteredIdols = idols.filter(idol => idol.isSeiyuu);
  } else { // Both
    filteredIdols = idols;
  }
  
  ////// now filter by group
  if (group === 'all') {
    return filteredIdols;
  } else if (group === 'group2ss') {
    // console.log(idols.filter(idol => idol.group === 'group2' || idol.group === 'ss'));
    return filteredIdols.filter(idol => idol.group === 'group2' || idol.group === 'ss');
  } else if (group === 'group4sunnypa') {
    // console.log(idols.filter(idol => idol.group === 'group2' || idol.group === 'ss'));
    return filteredIdols.filter(idol => idol.group === 'group4' || idol.group === 'sunnypa');
  } else {
    return filteredIdols.filter(idol => idol.group === group);
  }
}

// Display current question and options
function displayQuestion() {
  const filteredIdols = filterIdolsByGroup(currentGroup);
  const currentIdol = filteredIdols[currentQuestionIndex];  

  const type_to_ask = Math.floor(Math.random() * 1);  // bday
  let size_string = "";
  let idol_day = 0;
  let idol_month = 0;
  let idol_birthday = 0;

  if (type_to_ask == 0){
      query_string = "birthday";
      idol_day = currentIdol.birthDay;
      idol_month = currentIdol.birthMonth;
	  idol_birthday = `${month_str[idol_month]} ${idol_day}`;
  } 
  
  updateQuestionText(query_string);
  //let question = `When is ${currentIdol.name}'s ${query_string}?`;
  //questionElement.textContent = question;

  // Generate options
  const options = [];

  // determine how the intervals differ
  const intervals = [1, 1, 2, 2, 3, 4, 5, 6, 7, 10];

  const ask_mode = Math.floor(Math.random() * 2.5) + 0; // high chance 0, lower for 1, 2
  console.log(ask_mode);
  if ((monthModeCooldown > 0) && ask_mode == 2){
	  ask_mode == 1;
  } else {
	  monthModeCooldown = Math.max(0, monthModeCooldown - 1);
  }

  if (ask_mode == 0){ // alter days
      
      let interval = intervals[Math.floor(Math.random() * intervals.length)];
      let num_options = Math.floor(Math.random() * 3) + 3;   // 3 ~ 5 options
	  
	  // expert increases number of options
	  // 13+ correct answers guarantee one more options than usual
	  // 25+ correct answers guarantee two more options than usual
	  let rng = Math.random();
	  console.log(`RNG: ${rng}`)
	  num_options += Math.floor(Math.random() + correctAnswers * 0.08);
	  
	  console.log(`Number of options: ${num_options}`);
	  
	  // overwhelm mode (random)
	  const overwhelm_chance = 0.05 + correctAnswers * 0.004; // up to 17% for overwhelm mode
	  if ((Math.random() < overwhelm_chance) && (correctAnswers >= 3) && overwhelmCooldown <= 0){
		  num_options += 5 + Math.floor(Math.random() * 4)*3; // + 5,8,11,14
		  overwhelmCooldown = 2;
	  }
	  else {
		  overwhelmCooldown = Math.max(0, overwhelmCooldown - 1);
	  }
	  
      let start_day = idol_day - Math.floor(Math.random() * num_options ) * interval;  // raw values, have to handle under or overflows

      let day_choices = [];
      for (let cur_day = start_day; cur_day <= start_day + interval * (num_options - 1); cur_day += interval) {
        day_choices.push(cur_day);
      }
	  //console.log(day_choices);
	  
	  let date_str = "";

      for (let i = 0; i < day_choices.length; i++) {
        let cur_month = idol_month;
        let cur_day = day_choices[i];
 		
        if (cur_day < 1){
          // underflow fix
		  while (cur_day < 1){
            cur_month = (cur_month + 11 - 1) % 12 + 1; // decrease one month
            cur_day += month_days[cur_month];   // Feb 0 -> Jan 31 (+31)
		  }
        }
        else if (cur_day > month_days[idol_month]){
          // overflow fix
		  while (cur_day > month_days[cur_month]){
            cur_month = (cur_month + 1 - 1) % 12 + 1; // increase one month
            cur_day -= month_days[cur_month - 1];  // Jan 32 -> Feb 1 (-31)
		  }
        }
        date_str = `${month_str[cur_month]} ${cur_day}`;
        options.push(date_str);
      }
      //console.log(options);
  } else if (ask_mode == 1){ // alter BOTH days and months
      let intervalD = intervals[Math.floor(Math.random() * intervals.length)] + 6;  // 6, 6, 7, 7, 8, 9, 10, 11, 12, 15
      let num_optionsD = Math.floor(Math.random() * 2) + 2;   // 2 ~ 3 options
      let intervalM = Math.floor(Math.random() * 5) + 1  // 1 ~ 11 months difference
      let num_optionsM = Math.floor(Math.random() * 2) + 2;   // 2 ~ 3 options
	  
	  if ((num_optionsD == 3) && (num_optionsM == 3) && correctAnswers >= 10){ // rare case of 3 options on both - make one lower
		  num_optionsD = 2;
	  }
	  console.log(`Number of options: ${num_optionsD * num_optionsM}`);
	  
	  let start_day = idol_day - Math.floor(Math.random() * num_optionsD ) * intervalD;
	  let start_month = idol_month - Math.floor(Math.random() * num_optionsM ) * intervalM;
	  
	  let day_choices = [];
      for (let cur_day = start_day; cur_day <= start_day + intervalD * (num_optionsD - 1); cur_day += intervalD) {
        // dodgy way of handling but I want to keep the options on the same numericacl days
		day_choices.push( cur_day );
      }
	  day_choices.sort((a, b) => a - b);
	  let month_choices = [];
      for (let cur_month = start_month; cur_month <= start_month + intervalM * (num_optionsM - 1); cur_month += intervalM) {
        month_choices.push( (cur_month-1+24)%12+1 );  // wrapping around the months
      }
	  //month_choices.sort((a, b) => a - b);  // months options are not sorted for variety
	  
	  let date_str = "";
	  
	  // months first, and then days
	  for (let j = 0; j < month_choices.length; j++) {
	      for (let i = 0; i < day_choices.length; i++) {
			  let cur_day = day_choices[i];
		      let cur_month = month_choices[j];
			  if (cur_day < 1){
				  // underflow fix
				  while (cur_day < 1){
					cur_month = (cur_month + 11 - 1) % 12 + 1; // decrease one month
					// idol_month is used ON PURPOSE to maintain gap: correct would have been [cur_month]
				    cur_day += month_days[idol_month];   // Feb 0 -> Jan 31 (+31) // decrease number of days from the changed month
				  }
			  }
			  else if (cur_day > month_days[cur_month]){
				  // overflow fix
				  
				  // edge case: if said overflow if february 29 ~ 31, force 28.
				  if (cur_day >= 28 && cur_day <= 31 && cur_month == 2){
					  cur_day -= 28;
					  cur_month = 3;
				  }
				  
				  while (cur_day > month_days[cur_month]){
					cur_month = (cur_month + 1 - 1) % 12 + 1; // increase one month
					// idol_month is used ON PURPOSE to maintain gap: correct would have been [cur_month - 1]
					cur_day -= month_days[idol_month];  // Jan 32 -> Feb 1 (-31) // decrease number of days from the changed month-1
					
					// edge case fix: day shouldn't be 0 but may happen in non-Feb months
					if (cur_day == 0) cur_day = 1; 
				  }
			  }
		      date_str = `${month_str[cur_month]} ${cur_day}`;
              options.push(date_str);
		  }
	  }
	  
  } else if (ask_mode == 2){ // alter months
      
	  // set cooldown of 2 questions to not show up
	  monthModeCooldown = 2;
	  
      let interval = intervals[Math.floor(Math.random() * 4 + 1)]; // just the first four options 2, 3, 4, 5
      let num_options = 1;
	  if (interval >= 3){
		  num_options = Math.ceil(12 / interval);
	  } else {
		  num_options = Math.floor(Math.random() * 3) + 3;   // standard 3 ~ 5 options
	  }
	  
	  console.log(`Number of options: ${num_options}`);
	  let start_month = idol_month - Math.floor(Math.random() * num_options ) * interval;  // raw values, have to handle under or overflows
	  
	  let month_choices = [];
      for (let cur_month = start_month; cur_month <= start_month + interval * (num_options - 1); cur_month += interval) {
        month_choices.push( (cur_month-1+24)%12+1 );  // wrapping around the months
      }
	  //console.log(month_choices);
	  
	  let date_str = "";
	  for (let i = 0; i < month_choices.length; i++) {
		let cur_month = month_choices[i];
        let cur_day = idol_day;
	    date_str = `${month_str[cur_month]} ${cur_day}`;
		options.push(date_str);
	  }

  }


//////////
  // special case for nico: check if options would cover 
  //if (currentIdol.name === 'Nico Yazawa' && type_to_ask == 1){
  //    if (!options.includes(71)){
  //        options.push(71);
  //        options.sort((a, b) => a - b);
  //    }
  //}

  // Display options
  optionsElement.innerHTML = ' ';
  options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.classList.add('option');
    optionButton.addEventListener('click', () => checkAnswer(option, type_to_ask, idol_birthday));
    optionsElement.appendChild(optionButton);
  });
}

// Check the selected answer
function checkAnswer(selectedOption, type_to_ask, correctAnswer) {
  const filteredIdols = filterIdolsByGroup(currentGroup);
  const currentIdol = filteredIdols[currentQuestionIndex];
  const options = optionsElement.querySelectorAll('.option');

  // Special case for Nico
  const kekeOldBirthdayCase = correctAnswer === "July 17" && type_to_ask === 0;
  const oninatsuOldBirthdayCase = correctAnswer === "August 7" && type_to_ask === 0;

  // Disable user interaction with options
  options.forEach(option => {
    option.disabled = true;
    if (option.textContent === correctAnswer) {
      option.classList.add('correct');
    } else if (kekeOldBirthdayCase && option.textContent === "July 7" && selectedOption != "July 17") {
      option.classList.add('premium'); // KeKe case, only display if wrong
	} else if (oninatsuOldBirthdayCase && option.textContent === "August 13" && selectedOption != "August 7") {
      option.classList.add('premium'); // Natsumi case, only display if wrong
    } else {
      option.classList.add('incorrect');
    }
  });
  
  if (selectedOption === correctAnswer) {
    resultElement2.textContent = 'Correct!';
    correctAnswers++;
  } else if (kekeOldBirthdayCase && selectedOption === "July 7") {  
    resultElement2.textContent = 'Looks like you found KeKe\'s original birthday. Nice one!';
    correctAnswers++;
  } else if (oninatsuOldBirthdayCase && selectedOption === "August 13") {  
    resultElement2.textContent = 'You found Natsumi\'s original birthday before it was changed. ONINATSUUUUUUUUU';
    correctAnswers++;
  } else {
    resultElement2.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
  }

  // Wait for 1 second before moving to the next question
  timeoutId = setTimeout(moveToNextQuestion, 1500);
  
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
isSeiyuuSelect.forEach(input => {
  input.addEventListener('change', startNewQuiz);

});
// Event listener for the JP name order toggle
nameJPOrderSelect.addEventListener('change', () => {
	console.log(nameJPOrderSelect.checked);
	if (nameJPOrderSelect.checked){
		use_JP_name_order = 1;
	} else {
	    use_JP_name_order = 0;
	}
	updateQuestionText("birthday"); // birthday cuz that's the only thing right now lol
}); 


initializeGame();