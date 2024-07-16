const questions = [
    {
        "question": "오늘 수업이 갑자기 두개나 휴강됐을때 나는?",
        "options": [
            {"answer": "보고싶었던 영화를 보러가요", "weight": {"문화": 1}},
            {"answer": "북카페에 가서 책을 읽어요", "weight": {"학술": 1}},
            {"answer": "스포츠 경기를 관람하거나 직접 참여해요.", "weight": {"종교": 1}},
            {"answer": "음악 콘서트나 연극을 감상해요.", "weight": {"공연": 1}} 
        ]
    },
    {
        "question": "나의 최근 관심사는?",
        "options": [
            {"answer": "학점,자기개발,갓생", "weight": {"학술": 1}},
            {"answer": "액티비티", "weight": {"체육": 1}},
            {"answer": "봉사,도덕적 가치", "weight": {"봉사": 1}},
            {"answer": "노래,춤,힙합", "weight": {"공연": 1}}
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

    questionElement.innerHTML = "노션 데이터 테이블";
    optionsElement.innerHTML = "";

    progressBar.style.width = '100%';
    progressPercent.innerHTML = '100%';
    progressIcon.style.left = `calc(100% - 10px)`;

    // 결과 이미지 표시
    const resultImage = document.getElementById("result-image");
    resultImage.style.backgroundImage = "url('/pages/find/donghwa.png')";

    // 가장 높은 가중치 분과 찾기
    let maxScore = -1;
    let maxDepartment = '';
    for (let key in scores) {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            maxDepartment = key;
        }
    }

    // 결과 분과 표시
    const resultDepartment = document.getElementById("result-department");
    resultDepartment.innerHTML = `가장 높은 점수의 분과: ${maxDepartment}`;

    // Fetch data from the server
    const response = await fetch('/api/fetchNotionData');
    const data = await response.json();

    console.log('Fetched data:', data); // 데이터를 확인하기 위해 콘솔에 출력

    const notionList = document.querySelector('#notionList');
    notionList.style.display = 'block'; // 결과창에서 표시

    notionList.innerHTML = '';

    data.results.forEach(page => {
        const department = page.properties['분과']?.rich_text?.[0]?.plain_text || 'No Department';
        if (department !== maxDepartment) {
            return; // 필터링: 가장 높은 가중치 분과와 일치하지 않는 경우 건너뜀
        }

        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        const logoImg = document.createElement('img');
        const logoUrl = page.properties['로고']?.files?.[0]?.external?.url || '';
        if (logoUrl) {
            logoImg.src = logoUrl;
        } else {
            logoImg.alt = 'No logo';
        }

        const listItemContent = document.createElement('div');
        listItemContent.className = 'list-item-content';

        const clubName = document.createElement('h2');
        clubName.textContent = page.properties['동아리명']?.title?.[0]?.plain_text || 'No Name';

        const departmentBox = document.createElement('div');
        departmentBox.className = 'department-box';
        departmentBox.textContent = department;

        const description = document.createElement('p');
        description.textContent = page.properties['한줄소개']?.rich_text?.[0]?.plain_text || 'No Description';

        const representative = document.createElement('p');
        representative.textContent = `대표자 성함: ${page.properties['대표자 성함']?.rich_text?.[0]?.plain_text || 'N/A'}`;

        const address = document.createElement('p');
        address.textContent = `동아리방 주소: ${page.properties['동아리방 주소']?.rich_text?.[0]?.plain_text || 'N/A'}`;

        // 추가 데이터 표시
        const recruitmentPeriod = document.createElement('p');
        const startDate = page.properties['모집 시작일']?.date?.start || 'N/A';
        const endDate = page.properties['모집 마감일']?.date?.start || 'N/A';
        recruitmentPeriod.textContent = `모집 기간: ${startDate} ~ ${endDate}`;

        // 커리큘럼 표시
        const curriculumBarContainer = document.createElement('div');
        curriculumBarContainer.className = 'curriculum-bar-container';
        const curriculumBar = document.createElement('div');
        curriculumBar.className = 'curriculum-bar';

        const curriculumText = page.properties['커리큘럼']?.rich_text?.[0]?.plain_text || 'N/A';

        // 커리큘럼 텍스트를 월별로 분리
        const curriculumItems = curriculumText.split('\n');
        const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        let monthDetails = {};

        curriculumItems.forEach(item => {
            const month = months.find(m => item.startsWith(m));
            if (month) {
                if (!monthDetails[month]) {
                    monthDetails[month] = [];
                }
                monthDetails[month].push(item.trim());
            }
        });

        const activeMonths = months.filter(month => monthDetails[month]);

        activeMonths.forEach((month, index) => {
            const monthPoint = document.createElement('div');
            monthPoint.className = 'month-point';
            monthPoint.textContent = month.slice(0, -1); // "월" 제거하여 숫자만 표시

            // Adjust left position to ensure the last point is correctly aligned
            let leftPosition = (index / (activeMonths.length - 1)) * 100;

            // Shift the last point slightly to the left
            if (index === activeMonths.length - 1) {
                leftPosition -= 2; // Adjust this value as needed
            }

            monthPoint.style.left = `${leftPosition}%`;

            const detailDiv = document.createElement('div');
            detailDiv.className = 'month-detail';
            detailDiv.innerHTML = monthDetails[month].join('<br>');

            monthPoint.appendChild(detailDiv);
            curriculumBar.appendChild(monthPoint);

            // 모바일에서는 클릭 시 디테일 표시 후 1.5초 뒤에 사라지게 설정,1.3초로 변경
            if (window.innerWidth <= 600) {
                monthPoint.addEventListener('click', () => {
                    detailDiv.style.display = 'block';
                    setTimeout(() => {
                        detailDiv.classList.add('fade-out');
                        setTimeout(() => {
                            detailDiv.style.display = 'none';
                            detailDiv.classList.remove('fade-out');
                        }, 500); // duration of fade-out animation
                    }, 1300);
                });
            }
        });

        curriculumBarContainer.appendChild(curriculumBar);

        // "지원하기" 버튼 추가
        const applicationButton = document.createElement('button');
        const applicationUrl = page.properties['신청방법']?.url || '#';

        if (isTodayBetweenDates(startDate, endDate)) {
            applicationButton.textContent = '지원하기 !';
            applicationButton.style.backgroundColor = '#F2A0B0';
            applicationButton.style.color = 'white';
            applicationButton.onclick = () => window.open(applicationUrl, '_blank');
        } else {
            const daysLeft = calculateDaysLeft(startDate);
            applicationButton.textContent = `D-${daysLeft}`;
            applicationButton.style.backgroundColor = 'white';
            applicationButton.style.color = '#F2A0B0';
            applicationButton.style.border = '1px solid #F2A0B0';
            applicationButton.onclick = () => showPopup(`${daysLeft}일 뒤에 지원 가능합니다!`);
        }

        const actionContainer = document.createElement('div');
        actionContainer.className = 'action-container';
        actionContainer.appendChild(applicationButton);
        actionContainer.appendChild(curriculumBarContainer);

        listItemContent.appendChild(clubName);
        listItemContent.appendChild(departmentBox);
        listItemContent.appendChild(description);
        listItemContent.appendChild(representative);
        listItemContent.appendChild(address);
        listItemContent.appendChild(recruitmentPeriod);
        listItemContent.appendChild(actionContainer); // actionContainer 추가

        listItem.appendChild(logoImg);
        listItem.appendChild(listItemContent);

        notionList.appendChild(listItem);
    });
}

// 초기 질문 표시
displayQuestion();

// 보조 함수
function calculateDaysLeft(startDate) {
    const today = new Date();
    const start = new Date(startDate);
    const difference = start.getTime() - today.getTime();
    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    return daysLeft;
}

function isTodayBetweenDates(startDate, endDate) {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return today >= start && today <= end;
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    popupContent.appendChild(messageElement);

    // 이메일 입력 칸 추가
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = '이메일을 입력하세요';
    emailInput.className = 'email-input';
    popupContent.appendChild(emailInput);

    const closeButton = document.createElement('button');
    closeButton.textContent = '확인';
    closeButton.className = 'popup-button';
    closeButton.onclick = () => document.body.removeChild(popup);
    popupContent.appendChild(closeButton);

    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}
