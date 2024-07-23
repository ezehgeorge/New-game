'use strict';


/// Select Elements
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.getElementById('score--1');
const currentOne = document.getElementById('current--0');
const currentTwo = document.getElementById('current--1');

const diceBall = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, currentPlayer, continuePlay;

/// Conditions
const game = function () {
  score = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  continuePlay = true;

  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;

  diceBall.classList.add('hidden');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
};
game();

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

/// Dice Functionality
btnRoll.addEventListener('click', function () {
  if (continuePlay) {
   
    const dice = Math.trunc(Math.random() * 6) + 1;  /// Generate  Random Dice Roll

    diceBall.classList.remove('hidden');  /// Display Dice
    diceBall.src = `dice-${dice}.png`;


    if (dice !== 1) {
      currentScore += dice; /// Check for rolled one
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (continuePlay) {
    score[currentPlayer] += currentScore;  /// Add current score to active player's score

    document.getElementById(`score--${currentPlayer}`).textContent =
      score[currentPlayer];

    if (score[currentPlayer] >= 100) {  /// Check whether player's score is >= 100 
      continuePlay = false;  /// End the game
      diceBall.classList.add('hidden');

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', game);
