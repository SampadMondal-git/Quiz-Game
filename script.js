let currentLevel = 0;
let score = 0;
let levels = [];

async function initializeGame() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error('Failed to load questions');
        levels = await response.json();
        updateLevelDisplay();
        updateProgress();
    } catch (error) {
        console.error(error);
        alert('Failed to load questions. Please try again later.');
    }
}

function updateLevelDisplay() {
    if (!levels.length) return;
    
    document.getElementById("level").textContent = `LEVEL ${levels[currentLevel].level}`;
    document.getElementById("questions").textContent = levels[currentLevel].question.text;
    const options = levels[currentLevel].question.options;
    ['option1', 'option2', 'option3', 'option4'].forEach((id, index) => {
        document.getElementById(id).textContent = options[index];
    });
}

function selectOption(selectedElement) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    selectedElement.classList.add('selected');
}

function answerCheck() {
    const selectedElement = document.querySelector('.selected');
    if (!selectedElement) return alert("Please select an option");

    const isCorrect = selectedElement.textContent === levels[currentLevel].question.correctAnswer;
    
    selectedElement.classList.add(isCorrect ? 'correct' : 'wrong');
    selectedElement.classList.remove('selected');

    if (isCorrect) {
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById("next").disabled = false;
        document.getElementById("next").style.opacity = "1";
        document.getElementById("next").style.cursor = "pointer";
    } else {
        setTimeout(() => {
            selectedElement.classList.remove('wrong');
        }, 1500);
    }
}

function nextLevel() {
    document.querySelector('.questions').classList.add('fade-out');
    
    setTimeout(() => {
        document.querySelectorAll('.option').forEach(option => {
            option.className = 'option';
        });
        
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            updateLevelDisplay();
            updateProgress();
        } else {
            showEndModal();
        }
        
        document.getElementById("next").disabled = true;
        document.getElementById("next").style.opacity = "0.5";
        document.querySelector('.questions').classList.remove('fade-out');
    }, 500);
}

function updateProgress() {
    const progress = (currentLevel / levels.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function showEndModal() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('endModal').style.display = 'flex';
}

function restartQuiz() {
    currentLevel = 0;
    score = 0;
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('endModal').style.display = 'none';
    updateLevelDisplay();
    updateProgress();
    document.querySelector('.progress').style.width = '0%';
}

document.addEventListener('DOMContentLoaded', initializeGame);