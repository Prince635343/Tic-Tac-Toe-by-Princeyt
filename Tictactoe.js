let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) { // playerO
                box.innerText = "Mahi";
                turnO = false;
            } else { // playerX
                box.innerText = "Nahid";
                turnO = true;
            }
            box.classList.add("disabled");
            checkWinner();
        }
    });

    // Add touch event for mobile optimization
    box.addEventListener("touchstart", (event) => {
        event.preventDefault();
        box.click();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                msg.textContent = `${pos1Val} Wins!`;
                msgContainer.classList.remove("hide");
                return;
            }
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.textContent = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

resetbtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("disabled");
    });
    msgContainer.classList.add("hide");
    turnO = true; // Reset the turn to player O
});

newGameBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("disabled");
    });
    msgContainer.classList.add("hide");
    turnO = true; // Reset the turn to player O
});
