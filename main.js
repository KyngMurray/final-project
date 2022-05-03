const log = (arg) => console.log(arg)

// Step 1: Since the premise of the came is to be able to guess the name of a state. Create a list of states and put into an array. 
// I tried to find a API to use, but was having diffuclities locating one. 

var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','DistrictofColumbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','NewHampshire','NewJersey','NewMexico','NewYork','NorthCarolina','NorthDakota','Ohio','Oklahoma','Oregon','Pennsylvania','PuertoRico','RhodeIsland','SouthCarolina','SouthDakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','WestVirginia','Wisconsin','Wyoming']

// Since the code is relying only none numeric or special chracters. I removed the space from certain two word states. 



var game = {
    state: "",
    stateLetters: [],
    correctGuess: [],
    wrongGuess: [],
    placeHolder: [],
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    gamePlay: true
}

/* Step 2
Create a funtion that would start the game. What should the function include?
(1) The game should start off with a white background. 
(2) The status bar should be green. So remove any and all previous colors and add bg-success.
(3) All following arrays should be emptied stateLetters, correctGuess, placeHolder, and wrongGusses. 
*/
function newGamePrep() {

// Game needed to start with the bg-success... Since the game may end with bg danger or warning. Remove both and add bg success
    
    document.getElementById("status").style.backgroundColor = "#e9ecef";
    document.getElementById("progress").classList.remove("bg-danger")
    document.getElementById("progress").classList.remove("bg-warning")
    document.getElementById("progress").classList.add("bg-success")
    document.getElementById("progress").setAttribute("style", "width: 100%;");
    game.state = states[Math.floor(Math.random() * states.length)]
    game.stateLetters = [];
    game.correctGuess = [];
    game.placeHolder = [];
    game.wrongGuess = [];
    
    document.getElementById("message").innerHTML = ""
    document.getElementById("wrong").innerHTML = ""
    game.gamePlay = true;


    //splits the state into letters into the stateLetters array
    for (i = 0; i < game.state.length; i++) {
        game.stateLetters.push(game.state.charAt(i).toLowerCase())
    }
   // The code below takes the individuals letters in the state and mask them with _. 
   // it also provides a slight hint due to the number of spaces. California and Iowa are different in letter count.
    for (i = 0; i < game.stateLetters.length; i++) {
        game.placeHolder.push("_")
    }
    var place = ""
    for (i = 0; i < game.placeHolder.length; i++) {
        place += "_ "
    }
    log(game.stateLetters)
    document.getElementById("state").innerHTML = place;
}


function newGame() {
    newGamePrep();

    document.onkeyup = function (event) {
        var status = game.correctGuess.length
        /* Each letter on the key board has a associated numerical number that reference it. 
         with the below code I am targeting all letters and no special chracters
         https://css-tricks.com/snippets/javascript/javascript-keycodes/*/

        if (event.which >= 65 && event.which <= 90) {
            document.getElementById("coolkid").classList.add("rollIn")
            var keyPressed = (event.key).toLocaleLowerCase()

        } else {
            //Instead of using an Alert, I am using a Modal to alert the user that the input they just entered was not a letter
            //alert("Only letters A-Z are allowed")
            $('#exampleModal').modal('show');
        }

        var place = ""

        if (game.placeHolder.indexOf("_") != -1) {
            for (i = 0; i < game.stateLetters.length; i++) {
                if (keyPressed === game.stateLetters[i]) {
                    game.correctGuess.push(i);
                    game.placeHolder[i] = keyPressed;
                    //document.getElementById("state").innerHTML = game.placeHolder;
                    document.getElementById("message").innerHTML = ""
                }
            }

            for (i = 0; i < game.placeHolder.length; i++) {
                if(game.placeHolder[i] === "_")
                {
                    place += "_ "
                    log(place)
                }
                else
                {
                    place += game.placeHolder[i] + " "
                }
                
            }
            log(game.stateLetters)
            document.getElementById("state").innerHTML = place;
            
            if (status === game.correctGuess.length)//items on right guesses didnt change
            {
                if (game.wrongGuess.length != 9)//If you still have more tries
                {
                    if (game.wrongGuess.indexOf(keyPressed) == -1)//letter is not on the array, hasnt been pressed 
                    {
                        // 100% is the game starting progress bar percentage, and each wrong answer deducts 10%.
                        var gameStatus = (100 - (game.wrongGuess.length * 10))
                        //each incorrectly entered key press will be pushed to the wrong guesses array and displayed to user. 
                        game.wrongGuess.push(keyPressed);
                        document.getElementById("message").innerHTML = "";
                        document.getElementById("wrong").innerHTML = game.wrongGuess;

                        //Up until the 50% mark the status of the progress will remain in green. However once it crosses the 50% mark it will change and 
                        // arlert the user. 
                        if (gameStatus <= 50 && gameStatus > 40) {
                            alert("Warning zone you 4 more chances")
                            document.getElementById("progress").classList.remove("bg-success")
                            document.getElementById("progress").classList.add("bg-warning")
                        }
                        if (gameStatus <= 40 && gameStatus > 30) {
                            alert("Warning zone you 3 more chances")
                        }
                        if (gameStatus <= 30 && gameStatus > 20) {
                            alert("Warning zone you 2 more chances")
                        }
                        if (gameStatus <= 20 && gameStatus > 10) {
                            alert("Warning zone you 1 more chances")
                        }
                        else if (gameStatus >= 20 && gameStatus < 10) {
                            document.getElementById("progress").classList.remove("bg-warning")
                            document.getElementById("progress").classList.add("bg-danger")
                        }
                        document.getElementById("progress").setAttribute("style", `width: ${gameStatus}%`);

                    }
                    else {//letter is on the array meaning it was tried already
                        document.getElementById("message").innerHTML = "Letter already tried";
                    }
                }
                else //no more tries, game is OVER
                {
                    while (game.gamePlay) {
                        gameOver();
                    }

                }
            }


        }
        else {// if all of the states are found, run winGame function. 
            while (game.gamePlay) {
                winsGame();
            }
        }
        if (game.placeHolder.indexOf("_") == -1) {
            while (game.gamePlay) {
                winsGame();
            }
        }

    }
    
}

// Function if player loses game
function gameOver() {
    var displayLetters = ""
    log("game over")
    for (i = 0; i < game.stateLetters.length; i++) {
        displayLetters += game.stateLetters[i] + " ";
    }
    document.getElementById("state").innerHTML = displayLetters;
    document.getElementById("status").style.backgroundColor = "#e74c3c";
    game.losses++
    document.getElementById("loses").innerHTML = game.losses;
    game.gamesPlayed += 1;
    document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed
    game.gamePlay = false;
    game.placeHolder = game.stateLetters.slice(0);
    document.getElementById("progress").setAttribute("style", "width:0%")
    document.getElementById("coachK").style.display = "block"
    document.getElementById("coachK").classList.add("rollIn")
    var audio = new Audio('assets/sounds/gameover.mp3');
    audio.play();
    setTimeout(function () {
        document.getElementById("coachK").classList.remove("rollIn")
        document.getElementById("coachK").classList.add("zoomInUp")
    }, 3000);
    
}

function winsGame() {
    document.getElementById("status").style.backgroundColor = "#27ae60";
    document.getElementById("progress").classList.remove("bg-danger")
    document.getElementById("progress").classList.remove("bg-warning")
    document.getElementById("progress").classList.add("bg-success")
    document.getElementById("progress").setAttribute("style", "width: 100%;");
    document.getElementById("greatJobCorrect").style.display = "block"
    document.getElementById("greatJobCorrect").classList.add("fadeInRightBig")
    var audio = new Audio('assets/sounds/Applause-SoundBible.com-151138312.mp3');
    audio.play();
    setTimeout(function () {
        document.getElementById("greatJobCorrect").classList.remove("fadeInRightBig")
        //https://mdbootstrap.com/docs/b4/jquery/css/animations/ to get additional animations
        //Bounce Animation effect is used to move the element quick up, back, or away from a surface after hitting it.
        document.getElementById("greatJobCorrect").classList.add("zoomOutUp")
    }, 2000);

    game.wins++
    document.getElementById("wins").innerHTML = game.wins;
    game.gamesPlayed += 1;
    document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed;
    game.gamePlay = false;

}