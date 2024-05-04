// Define the Idol class
class Idol {
  constructor(name, birthMonth, birthDay, group, isCharacter, isSeiyuu) {
    this.name = name;
    this.birthMonth = birthMonth;
    this.birthDay = birthDay;
    this.group = group;
    this.isCharacter = isCharacter;
    this.isSeiyuu = isSeiyuu;
  }
}

// Create instances of Idol
const idols = [

  // new Idol('Test Idol',  1, 24, 'group1', 1, 0)
  // /*
  
  // all spellings based on official romanized spellings from official website
  // if you're checking the source code then .... I guess hi?
  // Don't expect quality code here as you can see I didn't even put these
  // into a csv file and stuff lol
  
  // μ's
  new Idol('Honoka Kosaka',  8,  3, 'group1', 1, 0),
  new Idol('Kotori Minami',  9, 12, 'group1', 1, 0),
  new Idol('Umi Sonoda',     3, 15, 'group1', 1, 0),
  new Idol('Rin Hoshizora', 11,  1, 'group1', 1, 0),
  new Idol('Maki Nishikino', 4, 19, 'group1', 1, 0),
  new Idol('Hanayo Koizumi', 1, 17, 'group1', 1, 0),
  new Idol('Nico Yazawa',    7, 22, 'group1', 1, 0),
  new Idol('Eli Ayase',     10, 21, 'group1', 1, 0),
  new Idol('Nozomi Tojo',    6,  9, 'group1', 1, 0),

  // aqours
  new Idol('Chika Takami',      8,  1, 'group2', 1, 0),
  new Idol('Riko Sakurauchi',   9, 19, 'group2', 1, 0),
  new Idol('Kanan Matsuura',    2, 10, 'group2', 1, 0),
  new Idol('Dia Kurosawa',      1,  1, 'group2', 1, 0),
  new Idol('You Watanabe',      4, 17, 'group2', 1, 0),
  new Idol('Yoshiko Tsushima',  7, 13, 'group2', 1, 0),
  new Idol('Hanamaru Kunikida', 3,  4, 'group2', 1, 0),
  new Idol('Mari Ohara',        6, 13, 'group2', 1, 0),
  new Idol('Ruby Kurosawa',     9, 21, 'group2', 1, 0),

  new Idol('Sarah Kazuno',  5,  4, 'ss', 1, 0),
  new Idol('Leah Kazuno',  12, 12, 'ss', 1, 0),

  // nijigasaki
  new Idol('Ayumu Uehara',   3,  1, 'group3', 1, 0),
  new Idol('Kasumi Nakasu',  1, 23, 'group3', 1, 0),
  new Idol('Shizuku Osaka',  4,  3, 'group3', 1, 0),
  new Idol('Karin Asaka',    6, 29, 'group3', 1, 0),
  
  new Idol('Ai Miyashita',   5, 30, 'group3', 1, 0),
  new Idol('Kanata Konoe',  12, 16, 'group3', 1, 0),
  new Idol('Setsuna Yuki',   8,  8, 'group3', 1, 0),
  new Idol('Emma Verde',     2,  5, 'group3', 1, 0),
  
  new Idol('Rina Tennoji',   11, 13, 'group3', 1, 0),
  new Idol('Shioriko Mifune',10,  5, 'group3', 1, 0),
  new Idol('Lanzhu Zhong',    2, 15, 'group3', 1, 0),
  new Idol('Mia Taylor',     12,  6, 'group3', 1, 0),
    
  // liella
  new Idol('Kanon Shibuya',  5,  1, 'group4', 1, 0),
  new Idol('KeKe Tang',      7, 17, 'group4', 1, 0),
  new Idol('Arashi Chisato', 2, 25, 'group4', 1, 0),
  new Idol('Sumire Heanna',  9, 28, 'group4', 1, 0),
  new Idol('Ren Hazuki',    11, 24, 'group4', 1, 0),

  new Idol('Kinako Sakurakoji', 4, 10, 'group4', 1, 0),
  new Idol('Mei Yoneme',       10, 29, 'group4', 1, 0),
  new Idol('Shiki Wakana',      6, 17, 'group4', 1, 0),
  new Idol('Natsumi Onitsuka',  8,  7, 'group4', 1, 0),
  
  new Idol('Wien Margarete',   1, 20, 'group4', 1, 0),  // going by official spelling and not Margarete Wien yet
  new Idol('Tomari Onitsuka', 12, 28, 'group4', 1, 0),
  
  new Idol('Yuna Hijirisawa',  8, 11, 'sunnypa', 1, 0),
  new Idol('Mao Hiiragi',     12,  2, 'sunnypa', 1, 0),
  
  // hasunosora
  new Idol('Kaho Hinoshita',   5, 22, 'group5', 1, 0),
  new Idol('Sayaka Murano',    1, 13, 'group5', 1, 0),
  new Idol('Kozue Otomune',    6, 15, 'group5', 1, 0),
  new Idol('Tsuzuri Yugiri',  11, 17, 'group5', 1, 0),
  new Idol('Rurino Osawa',     8, 31, 'group5', 1, 0),
  new Idol('Megumi Fujishima',12, 20, 'group5', 1, 0),
  
  new Idol('Ginko Momose',     10, 20, 'group5', 1, 0),
  new Idol('Kosuzu Kachimachi', 2, 28, 'group5', 1, 0),
  new Idol('Hime Anyoji',       9, 24, 'group5', 1, 0),
  // /*

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

function kindaGaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

shuffle(idols);

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
  } else if (group === 'group4sunnypa') {
    // console.log(idols.filter(idol => idol.group === 'group2' || idol.group === 'ss'));
    return idols.filter(idol => idol.group === 'group4' || idol.group === 'sunnypa');
  } else {
    return idols.filter(idol => idol.group === group);
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

  let question = `When is ${currentIdol.name}'s ${query_string}?`;
  questionElement.textContent = question;

  // Generate options
  const options = [];

  // TODO: Change the BDay generation options
//////////

  // determine how the intervals differ
  const intervals = [1, 2, 3, 4, 5, 7, 10];

  const ask_mode = 1 //Math.floor(Math.random() * 2.5) + 0; // high chance 0, lower for 1, 2
  
  if ((monthModeCooldown > 0) && ask_mode == 2){
	  ask_mode == 1;
  }

  if (ask_mode == 0){ // alter days
      
      let interval = intervals[Math.floor(Math.random() * intervals.length)];
      let num_options = Math.floor(Math.random() * 3) + 3;   // 3 ~ 5 options
	  
	  // expert increases number of options
	  // 13+ correct answers guarantee one more options than usual
	  // 25+ correct answers guarantee two more options than usual
	  num_options += Math.floor(Math.random() + correctAnswers * 0.08);
	  
	  // overwhelm mode (random)
	  const overwhelm_chance = 0.05 + correctAnswers * 0.004; // up to 17% for overwhelm mode
	  if ((Math.random() < overwhelm_chance) && (correctAnswers >= 3) && overwhelmCooldown <= 0){
		  num_options += 5 + Math.floor(Math.random() * 3)*10;
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
      let intervalD = intervals[Math.floor(Math.random() * intervals.length)] + 6;  // 6, 7, 8, 9, 10, 12, 15
      let num_optionsD = Math.floor(Math.random() * 1) + 2;   // 1 ~ 3 options
      let intervalM = Math.floor(Math.random() * 5) + 1  // 1 ~ 11 months difference
      let num_optionsM = Math.floor(Math.random() * 1) + 2;   // 1 ~ 3 options
	  
	  if ((num_optionsD == 3) && (num_optionsM == 3) && correctAnswers >= 10){ // rare case of 3 options on both - make one lower
		  num_optionsD = 2;
	  }
	  
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
  const nicoBustSizeCase = correctAnswer === 74 && type_to_ask === 1;
  const special1 = nicoBustSizeCase ? "..??!" : "";

  // Disable user interaction with options
  options.forEach(option => {
    option.disabled = true;
    if (option.textContent === correctAnswer) {
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

// Display first question when the page loads
displayQuestion();