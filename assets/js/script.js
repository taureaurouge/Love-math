// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {              // lyssna efter att hela dokumentet (inte nödv bilder o sånt) har laddat och kör följande funktion när detta har skett
    let buttons = document.getElementsByTagName("button");              // Hämtar alla <button>-element i dokumentet och sparar dem i variabeln "buttons"

    for (let button of buttons) {                                       // Loopar igenom varje knapp för att lägga till en klick-händelse (event listener).
         button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {          // Om knappen som klickats har attributet data-type="submit", visa en popup meddelande: 'You clicked Submit!'
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");          // Om knappen har en annan data-type, visa ett popup-meddelande med den typen.
                runGame(gameType);
            }
         })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * the main game "loop", called when the script is first loaded
 * and after the users's answer has been processed
 */

function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    }
    
    else {
        alert(`Uknown game type: ${gameType}`);
        throw(`Uknown game type: ${gameType}. Aborting!`);
    }
}

/**
 * checks the answer against the first element in the returned calculatedCorrectAnswer array
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);                                     // userAnswer = värdet i "answer-box"
    let calculatedAnswer = calculateCorrectAnswer();                                                            // calculatedAnswer = beräknat värde
    let isCorrect = userAnswer === calculatedAnswer[0];                                                         // isCorrect är ett binärt (boolean) värde – alltså true eller false – som beror på om userAnswer är exakt lika med calculatedAnswer[0].

    if (isCorrect) {                                                                                            // som du ser behövs endast "ifCorrect" skrivas (alltså inte if iscorrect = true för detta är redan givet då värdet är en boolean)
        alert("correct answer");
        incrementScore();
    } else {
        alert(`incorrect. u answered ${userAnswer}. THE CORRECT ANSWER WAS ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */

function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);             // hämtar operand-värde genom att läsa av vilket värde vi har (parseInt omvandlar den från string till int)
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;                       // hämtar operator-värde

    if (operator === "+") {                                                             // om operator-värde = + return:a en array bestående av resultatet av operand1+operand2 OCH värdet "addition"
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    }
    
    else {
        alert(`Unimplemented operator ${operator}`);                                    // om så inte är fallet ge ett error-meddelande och trasha current operator
        throw(`Unimplemented operator ${operator}. Aborting!`);
    }
}

/**
 * gets the current score from the DOM and increments it by 1
 */

function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * gets the current tally of incorrect answers from the DOM and increments it by 1
 */

function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
    
}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {
    operand1 = operand1 * operand2;
    document.getElementById("operand1").textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";

}