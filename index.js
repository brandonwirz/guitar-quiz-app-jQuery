'use strict'

function startQuiz() {
  //start quiz
  //on click hide start div
  //unhide quiz form div
   $('.quiz-start').on('click', function(event) {
   $('.quiz-start').remove();
   $('.jq-form').css('display', 'block')
});
}

function createHTMLQuestion() {
  //creates queston in the DOM
  $('.jq-form').html(renderHTML());

}
let selectedQuestion = 0;
let scoreUpdate = 0;

function renderHTML() {
  if (selectedQuestion < quizData.length) {
    //creates form with question and multiple choice answers
    //<!-- <legend>lorem ipsum</legend> -->

    return `
    <h2>${quizData[selectedQuestion].question}</h2>

    <form class="styled-form">
      <fieldset>
          <label class="answerNum">
          <input type="radio" value="${quizData[selectedQuestion].answer[0]}" name="answer" required>
          <span>${quizData[selectedQuestion].answer[0]}</span>
          </label>
          <label class="answerNum">
          <input type="radio" value="${quizData[selectedQuestion].answer[1]}" name="answer" required>
          <span>${quizData[selectedQuestion].answer[1]}</span>
          </label>
          <label class="answerNum">
          <input type="radio" value="${quizData[selectedQuestion].answer[2]}" name="answer" required>
          <span>${quizData[selectedQuestion].answer[2]}</span>
          </label>
          <label class="answerNum">
          <input type="radio" value="${quizData[selectedQuestion].answer[3]}" name="answer" required>
          <span>${quizData[selectedQuestion].answer[3]}</span>
          </label>
          <button type="submit" class="submit-button">Submit</button>
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

//user selects answer on submit run user feedback
function answer() {
    $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
      if (answer === correctAnswer) {
        selected.parent().addClass('correct');
        isCorrectAnswer();
      } else {
        selected.parent().addClass('wrong');
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
     $('.jq-form').html(`<div class="displayed-content correct-answer"><p class="red">Correct! You got it right!</p><div class="correctAnswerImg">
     <img src="${quizData[selectedQuestion].image}" alt="You got it right!"/></div><p class="guitarist-name">"${correctAnswer}"</p>
     <button type="button" class="next-button">Next Question</button>
     </div>`);
}

function userFeedbackIsWrong() {
  // the feedback for wrong answer
  let correctAnswer = `${quizData[selectedQuestion].correctAnswer}`;
     $('.jq-form').html(`<div class="wrong-answer"><p class="red">Sorry! You got it wrong!</p><div class="correctAnswerImg"><img src="${quizData[selectedQuestion].image}" alt="You got it wrong!"/></div><p class="guitarist-name">"${correctAnswer}"</p>
     <button type="button" class="next-button">Next Question</button>
     </div>`);
}
function newQuestion () {
  selectedQuestion++;
  $('.selectedQuestion').text(selectedQuestion + 1);
}

function loadNextQuestion () {
  $('main').on('click', '.next-button','ease',function (event) {
   newQuestion();
   createHTMLQuestion();
   answer();
 });
}

function changeScore () {
  scoreUpdate++;
}

function updateScore () {
  changeScore();
  $('.my-score').text(scoreUpdate);
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
