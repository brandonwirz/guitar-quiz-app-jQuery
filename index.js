'use strict'

function startQuiz() {
  //start quiz
  //on click hide start div
  //unhide quiz form div
   $('.quiz-start').on('click', function(event) {
   $('.quiz-start').remove();
   $('.jq-form').css('display', 'block')
   $('.question-num').text(1);
  });
}

function createHTMLQuestion() {
  //creates questions in the DOM
  $('.jq-form').html(renderHTML());

}
let selectedQuestion = 0;
let scoreUpdate = 0;

function renderHTML() {
  if (selectedQuestion < quizData.length) {
    //creates form with question and multiple choice answers
    //<!-- <legend>lorem ipsum</legend> -->
    // <legend></legend>

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
    </form>`

  } else {
    quizResultsPage();
    restart();
    $('.question-num').text(6)
  }
}
function newQuestion () {
  selectedQuestion++;
  $('.question-num').text(selectedQuestion++);
}
function changeScore () {
  scoreUpdate ++;
}

//user selects answer on submit run user feedback
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

function userFeedbackIsCorrect() {
  // the feedback for right answer
  let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
     $('.jq-form').html(`<div class="displayed-content correct-answer"><p class="red">Correct! You got it right!</p><div class="">
     <img src="${quizData[selectedQuestion].image}" alt="You got it right!"/></div><p class="guitarist-name">"${correctAnswer}"</p>
     <button type="button" class="next-button">Next Question</button>
     </div>`);
}

function userFeedbackIsWrong() {
  // the feedback for wrong answer
  let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
     $('.jq-form').html(`<div class="wrong-answer"><p class="red">Sorry! You got it wrong!</p><div class=""><img src="${quizData[selectedQuestion].image}" alt="You got it wrong!"/></div><p class="guitarist-name">"${correctAnswer}"</p>
     <button type="button" class="next-button">Next Question</button>
     </div>`);
}
function updateScore () {
  changeScore();
  $('.my-score').text(scoreUpdate);
}

function loadNextQuestion () {
  $('main').on('click', '.next-button','ease',function (event) {
   newQuestion();
   createHTMLQuestion();
   answer();
 });
}

function quizResultsPage() {
  if (scoreUpdate >= 4) {
    $('.jq-form').html(`<div class="results correct-answer"><h3>Good Job!</h3><img class="" src="" alt="" role="img"/><p>You got ${scoreUpdate} / 6</p><p>Excellent job!</p><button class="restartButton">Restart Quiz</button></div>`);

  } else if (scoreUpdate < 1 && scoreUpdate >= 3) {
    $('.jq-form').html(`<div class="results correct-answer"><h3>Good Job!</h3><img class="" src="" alt="" role="img"/><p>You got ${scoreUpdate} / 6</p><p>not too bad!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
  else {
    $('.jq-form').html(`<div class="results correct-answer"><h3></h3><img class="" src="" alt="" role="img"/><p>You got ${scoreUpdate} / 6</p><p>You didn't do so well, want to try again? </p><button class="restartButton">Restart Quiz</button></div>`);
   }
}

function restart() {
  $('main').on('click', '.restartButton', function (event) {
   location.reload();
 });
}

function createQuiz () {
  startQuiz();
  createHTMLQuestion();
  answer();
  loadNextQuestion();
}

$(createQuiz);
