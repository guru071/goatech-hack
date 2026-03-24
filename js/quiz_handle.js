// Global Variables
let allQuestions = [];
let currentIndex = 0;
let score = 0;

// 1. Fetch JSON and initialize the quiz
async function initQuiz() {
    try {
        // IMPORTANT: Ensure this path correctly points to where you saved the JSON file
        const response = await fetch('../data/quiz.json'); 
        const data = await response.json();

        // 2. Flatten the nested JSON into a single array
        for (const subject in data) {
            for (const type in data[subject]) {
                const questionsArray = data[subject][type];
                
                // Add the subject and type to each question object and push it
                questionsArray.forEach(q => {
                    allQuestions.push({
                        subject: subject,
                        type: type,
                        question: q.question,
                        a: q.a,
                        b: q.b,
                        c: q.c,
                        d: q.d,
                        answer: q.answer
                    });
                });
            }
        }

        // 3. Start the quiz if questions loaded
        if (allQuestions.length > 0) {
            displayQuestion();
        } else {
            document.getElementById('question').innerText = "No questions found in JSON.";
        }

    } catch (error) {
        console.error("Error loading JSON file:", error);
        document.getElementById('question').innerText = "Error loading data. Are you using a local server?";
    }
}

// 4. Update the UI with the current question
function displayQuestion() {
    const currentQ = allQuestions[currentIndex];

    // Update Headers (Capitalizing the first letter for aesthetics)
    document.getElementById('display-subject').innerText = `Subject : ${currentQ.subject.toUpperCase()}`;
    document.getElementById('display-type').innerText = `Type : ${currentQ.type.toUpperCase()}`;
    document.getElementById('display-qno').innerText = currentIndex + 1; // Question number

    // Update Question text
    document.getElementById('question').innerText = currentQ.question;

    // Update Buttons
    document.getElementById('btn-a').innerText = `A) ${currentQ.a}`;
    document.getElementById('btn-b').innerText = `B) ${currentQ.b}`;
    document.getElementById('btn-c').innerText = `C) ${currentQ.c}`;
    document.getElementById('btn-d').innerText = `D) ${currentQ.d}`;
}

// 5. Check the answer and move to the next
window.checkAnswer = function(selectedOption) {
    const currentQ = allQuestions[currentIndex];

    // Check if correct
    if (selectedOption === currentQ.answer) {
        score++;
    }

    // Move to the next question
    currentIndex++;

    // Check if we reached the end of the array
    if (currentIndex < allQuestions.length) {
        displayQuestion();
    } else {
        // End of Quiz UI
        document.getElementById('display-subject').innerText = "Quiz Completed!";
        document.getElementById('display-type').innerText = "";
        document.getElementById('display-qno').innerText = "";
        
        document.getElementById('question').innerText = `Final Score: ${score} out of ${allQuestions.length}`;
        
        // Hide the buttons
        document.getElementById('buttons').style.display = "none";
    }
}

// Start the app
initQuiz();