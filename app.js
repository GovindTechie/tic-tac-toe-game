let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button")
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");



let turnO = true;
let gameOver = false;


const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


const resetGame = () => {
    turnO = true;
    enbleBoxes();
    gameOver = false;
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
        }else {
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();

        if(!gameOver) {
            isGameDraw();
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enbleBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congrutulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
    gameOver = true;
}

const isGameDraw = () => {
    let allField = true;
    for (const box of boxes) {
        if(box.innerText === '') {
            allField = false;
            break;
        }
    }

    if(allField) {
        msg.innerText = `Draw Game, No Winner`;
        msgContainer.classList.remove('hide');
        disableBoxes();
    }

}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }

    }
}



newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);  