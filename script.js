let quizData = [];

// エクセルファイルを読み込む関数
function loadExcelFile() {
    fetch('shitsumon.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // jsonDataをquizDataに変換
            quizData = jsonData.slice(1).map(row => ({
                question: row[0],
                answer: row[1]
            }));

            // 初回の問題を表示
            showQuestion();
        })
        .catch(error => console.error('Error loading Excel file:', error));
}

// 問題を表示する関数
function showQuestion() {
    if (quizData.length === 0) return;

    // ランダムな問題を選択
    const randomIndex = Math.floor(Math.random() * quizData.length);
    const selectedQuiz = quizData[randomIndex];

    // 問題を表示
    const questionButton = document.getElementById('question-button');
    questionButton.innerText = selectedQuiz.question;

    // 答えは初期状態で非表示にする
    const answerElement = document.getElementById('answer');
    answerElement.style.display = "none";
    answerElement.innerText = "";

    // 「次へ進む」ボタンも非表示にする
    const nextButton = document.getElementById('next-button');
    nextButton.style.display = "none";
}

// 答えを表示する関数
function showAnswer() {
    if (quizData.length === 0) return;

    const selectedQuiz = quizData.find(quiz => quiz.question === document.getElementById('question-button').innerText);

    // 答えを表示
    const answerElement = document.getElementById('answer');
    answerElement.innerText = selectedQuiz.answer;
    answerElement.style.display = "block";

    // 「次へ進む」ボタンを表示
    const nextButton = document.getElementById('next-button');
    nextButton.style.display = "inline-block";
}

// 次の問題を表示する関数
function showNextQuestion() {
    showQuestion();
}

// ページが読み込まれたらエクセルファイルを読み込む
window.onload = loadExcelFile;
