const questions = [
    {
        "question": "친구들과 여가 시간을 어떻게 보내는 것을 좋아하나요?",
        "options": [
            {"answer": "다양한 예술 전시회를 구경해요.", "weight": {"문화": 1}},
            {"answer": "책을 읽거나 스터디 그룹을 만들어요.", "weight": {"학술": 1}},
            {"answer": "스포츠 경기를 관람하거나 직접 참여해요.", "weight": {"체육": 1}},
            {"answer": "음악 콘서트나 연극을 감상해요.", "weight": {"공연": 1}}
        ]
    },
    {
        "question": "새로운 사람들을 만날 때 가장 먼저 무엇에 관심이 가나요?",
        "options": [
            {"answer": "그 사람의 지적인 모습", "weight": {"학술": 1}},
            {"answer": "그 사람의 스포츠 활동", "weight": {"체육": 1}},
            {"answer": "그 사람의 종교적 신념", "weight": {"종교": 1}},
            {"answer": "그 사람의 공연 관람 경험", "weight": {"공연": 1}}
        ]
    },
    {
        "question": "주말에 무엇을 하며 시간을 보내나요?",
        "options": [
            {"answer": "미술관이나 박물관을 방문해요.", "weight": {"문화": 1}},
            {"answer": "운동을 하거나 스포츠 클럽에 참여해요.", "weight": {"체육": 1}},
            {"answer": "지역 사회 봉사활동을 해요.", "weight": {"봉사": 1}},
            {"answer": "종교적 활동에 참여해요.", "weight": {"종교": 1}}
        ]
    },
    {
        "question": "스트레스를 해소하기 위해 어떤 활동을 하나요?",
        "options": [
            {"answer": "그림을 그리거나 음악을 들어요.", "weight": {"문화": 1}},
            {"answer": "명상이나 기도를 해요.", "weight": {"종교": 1}},
            {"answer": "자원봉사 활동을 해요.", "weight": {"봉사": 1}},
            {"answer": "공연을 보러 가요.", "weight": {"공연": 1}}
        ]
    },
    {
        "question": "어떤 종류의 이벤트에 참석하는 것을 좋아하나요?",
        "options": [
            {"answer": "예술 전시회", "weight": {"문화": 1}},
            {"answer": "학술 세미나나 강연", "weight": {"학술": 1}},
            {"answer": "자원봉사 이벤트", "weight": {"봉사": 1}},
            {"answer": "음악 콘서트나 연극", "weight": {"공연": 1}}
        ]
    },
    {
        "question": "여름 방학 동안 무엇을 하는 것이 가장 즐겁나요?",
        "options": [
            {"answer": "새로운 학문을 공부해요.", "weight": {"학술": 1}},
            {"answer": "야외에서 스포츠를 즐겨요.", "weight": {"체육": 1}},
            {"answer": "해외 봉사활동을 가요.", "weight": {"봉사": 1}},
            {"answer": "종교적 활동에 참여해요.", "weight": {"종교": 1}}
        ]
    }
];

// Shuffle function to randomize array elements
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuestion = 0;
const scores = { "문화": 0, "학술": 0, "체육": 0, "종교": 0, "공연": 0, "봉사": 0 };

// Shuffle questions and options
shuffle(questions);
questions.forEach(question => shuffle(question.options));

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = document.getElementById("progress-percent");
    const progressIcon = document.getElementById("progress-icon");

    questionElement.innerHTML = questions[currentQuestion].question;
    optionsElement.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.answer;
        button.className = "option";
        button.onclick = () => handleAnswer(option.weight);
        optionsElement.appendChild(button);
    });

    const progressPercentage = (currentQuestion / questions.length) * 100;
    progressBar.style.width = progressPercentage + '%';
    progressPercent.innerHTML = `${progressPercentage.toFixed(0)}%`;
    progressIcon.style.left = `calc(${progressPercentage}% - 10px)`;
}

function handleAnswer(weight) {
    for (let key in weight) {
        if (weight.hasOwnProperty(key)) {
            scores[key] += weight[key];
        }
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
}

async function displayResults() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = document.getElementById("progress-percent");
    const progressIcon = document.getElementById("progress-icon");

    let maxKey = null;
    let maxScore = -1;

    for (let key in scores) {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            maxKey = key;
        }
    }

    questionElement.innerHTML = `가장 높은 점수의 키 값은: ${maxKey}`;
    optionsElement.innerHTML = "";

    progressBar.style.width = '100%';
    progressPercent.innerHTML = '100%';
    progressIcon.style.left = `calc(100% - 10px)`; // 아이콘을 프로그레스 바 끝에 위치

    // 결과 이미지 표시
    const resultImage = document.getElementById("result-image");
    resultImage.style.backgroundImage = "url('/pages/find/donghwa.png')"; // 결과 이미지 경로 설정

    // Fetch data from the server
    const response = await fetch('/api/fetchNotionData');
    const data = await response.json();

    // Get the matching rows from the data based on the maxKey
    const matchingRows = data.filter(row => row.keyword === maxKey);

    // 결과 분과 리스트 표시
    const resultDepartmentContainer = document.getElementById('result-department');
    resultDepartmentContainer.innerHTML = '';

    if (matchingRows.length > 0) {
        matchingRows.forEach(row => {
            const div = document.createElement('div');
            div.className = `departmentBox ${row.department}`;
            div.innerText = `분과: ${row.department}`;
            resultDepartmentContainer.appendChild(div);
        });
    } else {
        resultDepartmentContainer.innerHTML = `
            <p>No matching department found</p>
        `;
    }
}

// 초기 질문 표시.
displayQuestion();