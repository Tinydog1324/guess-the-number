document.addEventListener('DOMContentLoaded', function () {
    var randomNumberBetween = document.querySelector('.randomNumberBetween');
    var result = document.querySelector('.result');
    var guessInput = document.querySelector('input[type="text"]');
    var submitButton = document.querySelector('button');
    var playAgainButton = document.querySelector('.playAgainButton');

    var guessCount = 0;
    var maxGuesses = 3;
    var hasWon = false;

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startNewGame() {
        guessCount = 0;
        hasWon = false;
        var minValue = 1;
        var maxValue = 100;
        var randomNum1 = generateRandomNumber(minValue, maxValue);
        var randomNum2 = generateRandomNumber(minValue, maxValue);

        // Make sure randomNum1 is always smaller than randomNum2
        var minNum = Math.min(randomNum1, randomNum2);
        var maxNum = Math.max(randomNum1, randomNum2);

        randomNumberBetween.textContent = 'Guess the number between ' + minNum + ' and ' + maxNum + '.';
        result.textContent = '';
        guessInput.value = '';
        submitButton.disabled = false;
        playAgainButton.style.display = 'none';
    }

    function checkGameEnd() {
        if (guessCount >= maxGuesses && !hasWon) {
            result.textContent = 'You lost! The correct number was not guessed within ' + maxGuesses + ' attempts.';
            submitButton.disabled = true;
            playAgainButton.style.display = 'block';
        }
    }

    startNewGame();

    submitButton.addEventListener('click', function () {
        var guess = parseInt(guessInput.value);
        var minNum = parseInt(randomNumberBetween.textContent.match(/\d+/g)[0]);
        var maxNum = parseInt(randomNumberBetween.textContent.match(/\d+/g)[1]);

        if (isNaN(guess)) {
            result.textContent = 'Please enter a valid number.';
        } else if (guess < minNum || guess > maxNum) {
            result.textContent = 'Your guess is outside the valid range.';
        } else if (guess === Math.floor((minNum + maxNum) / 2)) {
            result.textContent = 'Congratulations! You guessed the correct number.';
            hasWon = true;
            submitButton.disabled = true;
            playAgainButton.style.display = 'block';
        } else {
            result.textContent = 'Sorry, your guess is incorrect. Try again.';
            guessCount++;
            checkGameEnd();
        }
    });

    playAgainButton.addEventListener('click', function () {
        startNewGame();
    });
});