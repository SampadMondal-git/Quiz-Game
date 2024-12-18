function selectOption(selectedElement) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });

    selectedElement.classList.add('selected');
}

const levels = [
    {
        level: 1,
        question: {
            text: "Which HTML tag is used to define the most important heading on a page?",
            options: ["h1", "h6", "head", "title"],
            correctAnswer: "h1",
        },
    },
    {
        level: 2,
        question: {
            text: "What is the correct HTML tag for inserting a line break?",
            options: ["br", "lb", "break", "newline"],
            correctAnswer: "br",
        },
    },
    {
        level: 3,
        question: {
            text: "Which HTML attribute specifies a unique ID for an HTML element?",
            options: ["class", "style", "id", "name"],
            correctAnswer: "id",
        },
    },
    {
        level: 4,
        question: {
            text: "Which CSS property is used to change the text color of an element?",
            options: ["color", "text-color", "font-color", "bgcolor"],
            correctAnswer: "color",
        },
    },
    {
        level: 5,
        question: {
            text: 'What is the correct CSS syntax for applying a style to an element with the ID "myDiv"?',
            options: ["#myDiv { ... }", ".myDiv { ... }", "myDiv { ... }", "*myDiv* { ... }"],
            correctAnswer: "#myDiv { ... }",
        },
    },
    {
        level: 6,
        question: {
            text: "Which CSS property is used to set the background color of an element?",
            options: ["background-color", "bg-color", "color-background", "bgcolor"],
            correctAnswer: "background-color",
        },
    },
    {
        level: 7,
        question: {
            text: "Which JavaScript keyword is used to declare a letiable?",
            options: ["let", "let", "const", "int"],
            correctAnswer: "let",
        },
    },
    {
        level: 8,
        question: {
            text: 'What is the result of the following JavaScript expression: `5 + "5"`?',
            options: ["10", '"55"', '"10"', "An error"],
            correctAnswer: '"55"',
        },
    },
    {
        level: 9,
        question: {
            text: "Which JavaScript function is used to display a message box on the screen?",
            options: ["alert()", "console.log()", "prompt()", "confirm()"],
            correctAnswer: "alert()",
        },
    },
];

document.getElementById("level").innerHTML = "LEVEL " + levels[0].level;

document.getElementById("questions").innerHTML = levels[0].question.text;

document.getElementById("option1").innerHTML = levels[0].question.options[0];

document.getElementById("option2").innerHTML = levels[0].question.options[1];

document.getElementById("option3").innerHTML = levels[0].question.options[2];

document.getElementById("option4").innerHTML = levels[0].question.options[3];

let currentLevel = 0;

function answerCheck() {

    let selectedElement = document.querySelector('.selected');

    if (selectedElement === null) {
        alert("Please select an option");
    } else {
        let optionId = document.querySelector('.selected').id;
        let optionValue = document.getElementById(optionId).innerHTML;

        if (optionValue === levels[currentLevel].question.correctAnswer) {
            document.getElementById("next").disabled = false;
            document.getElementById("next").style.cursor = "pointer";
            document.querySelector("#next").style.opacity = "1";
            document.querySelector(".selected").style.backgroundColor = "rgb(0, 255, 0)";
            document.querySelector(".selected").style.color = "black";
            document.querySelector(".selected").style.transition = "none";
        } else {
            document.querySelector(".selected").style.backgroundColor = "red";
            document.querySelector(".selected").style.color = "white";
            document.querySelector(".selected").style.transition = "none";
            document.getElementById("next").disabled = true;
            document.querySelector("#next").style.opacity = "0.5";

            setTimeout(() => {
                document.querySelector(".selected").style.backgroundColor = "";
                document.querySelector(".selected").style.color = "";
                const options = document.querySelectorAll(".option");
                options.forEach(option => {
                    option.classList.remove("selected");
                });
            }, 1500);
        }
    }
};

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;

        console.log("You're in the next level!");

        document.getElementById("level").innerHTML = "LEVEL " + levels[currentLevel].level;

        document.getElementById("questions").innerHTML = levels[currentLevel].question.text;

        document.getElementById("option1").innerHTML = levels[currentLevel].question.options[0];

        document.getElementById("option2").innerHTML = levels[currentLevel].question.options[1];

        document.getElementById("option3").innerHTML = levels[currentLevel].question.options[2];

        document.getElementById("option4").innerHTML = levels[currentLevel].question.options[3];

        document.querySelector(".selected").style.backgroundColor = "";
        document.getElementById("next").style.cursor = "";
        document.querySelector(".selected").style.color = "";
        document.getElementById("next").disabled = true;
        document.querySelector("#next").style.opacity = "0.5";

        const options = document.querySelectorAll(".option");
        options.forEach(option => {
            option.classList.remove("selected");
        });
    } else {
        document.querySelector("#next").innerHTML = "DONE!";
        document.querySelector("#next").style.backgroundColor = "rgb(0, 255, 0)";
        document.getElementById("next").addEventListener("click", function () {
            prompt("You've aced every level! This is just the beginning. Let's keep coding, learning, and building amazing things.");
            location.reload();
        })
    };
};