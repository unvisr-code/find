const questions = [
    {
        "question": "친구들과 여가 시간을 어떻게 보내는 것을 좋아하나요?",
        "options": [
            {"answer": "다양한 예술 전시회를 구경해요.", "weight": {"문화": 1}},
            {"answer": "책을 읽거나 스터디 그룹을 만들어요.", "weight": {"학술": 1}},
            {"answer": "스포츠 경기를 관람하거나 직접 참여해요.", "weight": {"체육": 1}},
            {"answer": "자원봉사 활동에 참여해요.", "weight": {"봉사": 1}}
        ]
    },
    {
        "question": "새로운 사람들을 만날 때 가장 먼저 무엇에 관심이 가나요?",
        "options": [
            {"answer": "그 사람의 예술적 취향", "weight": {"문화": 1}},
            {"answer": "그 사람의 학문적 배경", "weight": {"학술": 1}},
            {"answer": "그 사람의 스포츠 활동", "weight": {"체육": 1}},
            {"answer": "그 사람의 사회 봉사 경험", "weight": {"봉사": 1}}
        ]
    },
    {
        "question": "주말에 무엇을 하며 시간을 보내나요?",
        "options": [
            {"answer": "미술관이나 박물관을 방문해요.", "weight": {"문화": 1}},
            {"answer": "독서 모임에 참여해요.", "weight": {"학술": 1}},
            {"answer": "운동을 하거나 스포츠 클럽에 참여해요.", "weight": {"체육": 1}},
            {"answer": "지역 사회 봉사활동을 해요.", "weight": {"봉사": 1}}
        ]
    },
    {
        "question": "스트레스를 해소하기 위해 어떤 활동을 하나요?",
        "options": [
            {"answer": "그림을 그리거나 음악을 들어요.", "weight": {"문화": 1}},
            {"answer": "책을 읽거나 글을 써요.", "weight": {"학술": 1}},
            {"answer": "달리기나 운동을 해요.", "weight": {"체육": 1}},
            {"answer": "명상이나 기도를 해요.", "weight": {"종교": 1}}
        ]
    },
    {
        "question": "어떤 종류의 이벤트에 참석하는 것을 좋아하나요?",
        "options": [
            {"answer": "음악 콘서트나 연극", "weight": {"공연": 1}},
            {"answer": "학술 세미나나 강연", "weight": {"학술": 1}},
            {"answer": "스포츠 경기", "weight": {"체육": 1}},
            {"answer": "자원봉사 이벤트", "weight": {"봉사": 1}}
        ]
    },
    {
        "question": "여름 방학 동안 무엇을 하는 것이 가장 즐겁나요?",
        "options": [
            {"answer": "미술 워크샵에 참여해요.", "weight": {"문화": 1}},
            {"answer": "새로운 학문을 공부해요.", "weight": {"학술": 1}},
            {"answer": "야외에서 스포츠를 즐겨요.", "weight": {"체육": 1}},
            {"answer": "해외 봉사활동을 가요.", "weight": {"봉사": 1}}
        ]
    },
    {
        "question": "당신의 삶의 목표는 무엇인가요?",
        "options": [
            {"answer": "창의적인 작품을 남기는 것", "weight": {"문화": 1}},
            {"answer": "학문적으로 큰 성과를 이루는 것", "weight": {"학술": 1}},
            {"answer": "건강하고 활기찬 삶을 사는 것", "weight": {"체육": 1}},
            {"answer": "많은 사람들에게 도움을 주는 것", "weight": {"봉사": 1}}
        ]
    },
    {
        "question": "새로운 도전을 할 때 어떤 점이 가장 중요하다고 생각하나요?",
        "options": [
            {"answer": "창의성을 발휘하는 것", "weight": {"문화": 1}},
            {"answer": "지식을 쌓는 것", "weight": {"학술": 1}},
            {"answer": "신체적으로 도전하는 것", "weight": {"체육": 1}},
            {"answer": "다른 사람들과 협력하는 것", "weight": {"봉사": 1}}
        ]
    }
];

let currentQuestion = 0;
const scores = { "문화": 0, "학술": 0, "체육": 0, "종교": 0, "공연": 0, "봉사": 0 };

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

    const progressPercentage = (currentQuestion / questions.length) * 100; // 초기값 0% 설정
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

function displayResults() {
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
}

// 초기 질문 표시
displayQuestion();
