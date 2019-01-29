
let selectedQuestion = 0;
let scoreUpdate = 0;

function startQuiz() {
   $('.quiz-start').on('click', function(event) {
   $('.quiz-start').remove();
   $('.jq-form').css('display', 'block')
  });
}

function createHTMLQuestion() {
  $('.jq-form').html(renderHTML());
}

//renders form with questions and multiple choice answers
function renderHTML() {
  if (selectedQuestion < quizData.length) {
    return `
    <h2>${quizData[selectedQuestion].question}</h2>
    <form class="styled-form">
      <fieldset>
          <label for="answer-num1">
          <input type="radio" value="${quizData[selectedQuestion].answer[0]}" name="answer" id="answer-num1" required>
          <span>${quizData[selectedQuestion].answer[0]}</span>
          </label>
          <label for="answer-num2">
          <input type="radio" value="${quizData[selectedQuestion].answer[1]}" name="answer" id="answer-num2" required>
          <span>${quizData[selectedQuestion].answer[1]}</span>
          </label>
          <label for="answer-num3">
          <input type="radio" value="${quizData[selectedQuestion].answer[2]}" name="answer" id="answer-num3" required>
          <span>${quizData[selectedQuestion].answer[2]}</span>
          </label>
          <label for="answer-num4">
          <input type="radio" value="${quizData[selectedQuestion].answer[3]}" name="answer" id="answer-num4" required>
          <span>${quizData[selectedQuestion].answer[3]}</span>
          </label>
          <button role="button" type="submit" class="submit-button">Submit</button>
      </fieldset>
    </form>
      <div id="status-bar">
        <span id="question-count">Question: ${quizData[selectedQuestion].questionNum}/6</span>
        <span id="score-count">Score: ${scoreUpdate}/${selectedQuestion}</span>
      </div>`
  } else {
    quizResultsPage();
    restart();
  }
}

function newQuestion () {
  selectedQuestion++;
  $('.question-num').text(selectedQuestion + 1);
      $('html, body').animate({scrollTop: $("body").offset().top
    }, 'slow', 'swing');
}

function changeScore () {
  scoreUpdate ++;
}

function updateScore () {
  changeScore();
  $('.my-score').text(scoreUpdate);
}

function answer() {
    $('form').on('submit', function (event) {
    event.preventDefault();
    let inputSelected = $('input:checked');
    let answerSelected = inputSelected.val();
    let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
      if (answerSelected === correctAnswer) {
        inputSelected.parent().addClass('correct');
        isCorrectAnswer();
      } else {
        inputSelected.parent().addClass('wrong');
        isWrongAnswer();
      }
  });
}

function isCorrectAnswer() {
  userFeedbackIsCorrect();
  updateScore();
}

function isWrongAnswer() {
  userFeedbackIsWrong();
}
//if user feedback is correct
function userFeedbackIsCorrect() {
  let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
     $('.jq-form').html(`<section role="region" class="displayed-content correct-answer"><p class="redAnswer">Correct! <span class="white-answer-heading">You got it right!<span></p><div class="">
     <img src="${quizData[selectedQuestion].image}" alt="You got it right!"/></div><p class="guitarist-name">"${correctAnswer}"</p>
     <button type="button" class="next-button">Next Question</button>
     </section>`);
}
//if user feedback is wrong
function userFeedbackIsWrong() {
  let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
     $('.jq-form').html(`<section role="region" class="displayed-content wrong-answer"><p class="redAnswer">Sorry! <span class="white-answer-heading">You got it wrong!</span></p><div class=""><img src="${quizData[selectedQuestion].image}" alt="You got it wrong!"/></div><p class="guitarist-name"><span class="white-answer-heading">The correct answer is</span> "${correctAnswer}"</p>
     <button type="button" class="next-button">Next Question</button>
     </section>`);
}

function loadNextQuestion () {
  $('main').on('click', '.next-button','ease',function (event) {
   newQuestion();
   createHTMLQuestion();
   answer();
 });
}
//final score results with emssage
function quizResultsPage() {
  if (scoreUpdate >= 6) {
    $('.jq-form').html(`<div class="displayed-content results correct-answer"><h3>Perfect Score! </h3><p>You got ${scoreUpdate} / 6</p><p>Excellent job!</p><button class="restart-button">Restart Quiz</button></div>`);
  }
    else if (scoreUpdate >= 4 && scoreUpdate <= 5) {
    $('.jq-form').html(`<div class="displayed-content results correct-answer"><h3>Good Job!</h3><p>You got ${scoreUpdate} / 6</p><p>Try for a perfect score!</p><button class="restart-button">Restart Quiz</button></div>`);

  } else if (scoreUpdate > 1 && scoreUpdate <= 3) {
    $('.jq-form').html(`<div class="displayed-content results correct-answer"><h3>You did ok!</h3><p>You got ${scoreUpdate} / 6</p><p>Try again?</p><button class="restart-button">Restart Quiz</button></div>`);
  }
  else {
    $('.jq-form').html(`<div class="displayed-content results correct-answer"><h3>Not so good</h3><p>You got ${scoreUpdate} / 6</p><p>You didn't do very well, want to try again?</p><button class="restart-button">Restart Quiz</button></div>`);
   }
}

function restart() {
  // console.log('init.onclick');
  $('main').on('click', '.restart-button', function (event) {
   location.reload();
  $('.jq-form').hide();
 });
}

function createQuiz () {
  startQuiz();
  createHTMLQuestion();
  answer();
  loadNextQuestion();
}

$(createQuiz);
