const questions = [
    {
        "question": "수업이 갑자기 두개나 휴강됐을때 나는?",
        "options": [
            {"answer": "보고싶었던 영화를 보러간다", "weight": {"문화": 1}},
            {"answer": "근처 북카페에 가서 책을 읽는다", "weight": {"학술": 1}},
            {"answer": "어린이대공원에 간다", "weight": {"봉사": 1}},
            {"answer": "음악 연습을 하러 간다", "weight": {"공연": 1}},
            {"answer": "잘 모르겠음", "weight": {}}
        ]
    },
    {
        "question": "곧 개강인데,, 남은 방학동안 이것만은 꼭 하고 만다! 최근 나의 관심사는?",
        "options": [
            {"answer": "학점,자기개발,갓생", "weight": {"학술": 1}},
            {"answer": "액티비티", "weight": {"체육": 1}},
            {"answer": "봉사,공익적 활동", "weight": {"봉사": 1}},
            {"answer": "노래,춤,힙합", "weight": {"공연": 1}},
            {"answer": "잘 모르겠음", "weight": {}}
        ]
    },
    {
        "question": "주로 가는 여행은?",
        "options": [
            {"answer": "감성 여행", "weight": {"문화": 1}},
            {"answer": "액티비티 여행", "weight": {"체육": 1}},
            {"answer": "문화유산 탐방", "weight": {"학술": 1}},
            {"answer": "해외 선교 활동 겸 여행", "weight": {"종교": 1}},
            {"answer": "잘 모르겠음", "weight": {}}
        ]
    },
    {
        "question": "지긋지긋한 시험기간.. 딴짓하고 싶은데 어떤 걸 하면 좋을까?",
        "options": [
            {"answer": "신나는 유튜브 플리로 기분전환", "weight": {"문화": 1}},
            {"answer": "종교 활동", "weight": {"종교": 1}},
            {"answer": "런닝 30분 빡세게 뛰기", "weight": {"체육": 1}},
            {"answer": "동방가서 음악 연습하고 오기", "weight": {"공연": 1}},
            {"answer": "잘 모르겠음", "weight": {}}
        ]
    },
    {
        "question": "수강 신청 마감 5분전, 수강 여석이 하나씩 남았다! 수강할 과목은?",
        "options": [
            {"answer": "성(性)과 문화", "weight": {"문화": 1}},
            {"answer": "채플", "weight": {"종교": 1}},
            {"answer": "세종사회봉사", "weight": {"봉사": 1}},
            {"answer": "공연예술감상", "weight": {"공연": 1}},
            {"answer": "잘 모르겠음", "weight": {}}
        ]
    },
    {
        "question": "제일 친한 동기는 나를 어떻게 생각하고 있을까?",
        "options": [
            {"answer": "스펙쌓기에 진심인 사람", "weight": {"학술": 1}},
            {"answer": "활동적인 사람", "weight": {"체육": 1}},
            {"answer": "타인을 돕는 걸 좋아하는 사람", "weight": {"봉사": 1}},
            {"answer": "자신의 생각을 설득력있게 전달하는 사람", "weight": {"종교": 1}},
            {"answer": "잘 모르겠음", "weight": {}}
        ]
    }
];

const subCategoryQuestions = {
    '공연': [
        {
            "question": "공연에서 어떤 역할을 하고 싶나요?",
            "options": [
                {"answer": "노래 부르기", "weight": {"음악연주": 1}},
                {"answer": "연극 공연", "weight": {"공연예술": 1}}
            ]
        },
        {
            "question": "공연 준비 과정 중 어떤 활동을 좋아하나요?",
            "options": [
                {"answer": "밴드 연주", "weight": {"음악연주": 1}},
                {"answer": "연기 연습", "weight": {"공연예술": 1}}
            ]
        }
    ],
    '문화': [
        {
            "question": "문화 활동 중 어떤 것을 좋아하나요?",
            "options": [
                {"answer": "그림 그리기", "weight": {"창작예술": 1}},
                {"answer": "책 읽기", "weight": {"문화": 1}}
            ]
        },
        {
            "question": "어떤 종류의 문화를 좋아하나요?",
            "options": [
                {"answer": "사진 찍기", "weight": {"창작예술": 1}},
                {"answer": "영화 보기", "weight": {"문화": 1}}
            ]
        }
    ],
    '봉사': [
        {
            "question": "어떤 봉사 활동을 선호하나요?",
            "options": [
                {"answer": "교육 봉사", "weight": {"봉사": 1}},
                {"answer": "환경 봉사", "weight": {"봉사": 1}}
            ]
        },
        {
            "question": "봉사 활동의 주된 목적은 무엇인가요?",
            "options": [
                {"answer": "사회적 기여", "weight": {"봉사": 1}},
                {"answer": "개인적 성취", "weight": {"봉사": 1}}
            ]
        }
    ],
    '종교': [
        {
            "question": "종교 활동에서 어떤 역할을 선호하나요?",
            "options": [
                {"answer": "예배 참여", "weight": {"종교": 1}},
                {"answer": "기도 모임", "weight": {"종교": 1}}
            ]
        },
        {
            "question": "종교 활동 중 어떤 것을 더 선호하나요?",
            "options": [
                {"answer": "봉사 활동", "weight": {"종교": 1}},
                {"answer": "교회 모임", "weight": {"종교": 1}}
            ]
        }
    ],
    '체육': [
        {
            "question": "어떤 체육 활동을 좋아하나요?",
            "options": [
                {"answer": "축구", "weight": {"구기체육": 1}},
                {"answer": "마라톤", "weight": {"생활체육": 1}}
            ]
        },
        {
            "question": "체육 활동 중 어떤 것을 더 좋아하나요?",
            "options": [
                {"answer": "농구", "weight": {"구기체육": 1}},
                {"answer": "수영", "weight": {"생활체육": 1}}
            ]
        }
    ],
    '학술': [
        {
            "question": "학술 활동 중 어떤 것을 좋아하나요?",
            "options": [
                {"answer": "코딩", "weight": {"정보과학": 1}},
                {"answer": "독서", "weight": {"학술교양": 1}}
            ]
        },
        {
            "question": "어떤 학술 분야에 관심이 있나요?",
            "options": [
                {"answer": "데이터 분석", "weight": {"정보과학": 1}},
                {"answer": "문학 연구", "weight": {"학술교양": 1}}
            ]
        }
    ]
};

let currentQuestion = 0;
let subQuestionIndex = 0;
let currentCategory = '';
const scores = { "문화": 0, "학술": 0, "체육": 0, "종교": 0, "공연": 0, "봉사": 0 };
let subCategoryScores = {};

// Shuffle function to randomize array elements
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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
        determineCategory();
    }
}

function determineCategory() {
    const topCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    console.log(`당신의 분과 종류는: ${topCategory}`);
    currentCategory = topCategory;
    if (subCategoryQuestions[currentCategory]) {
        subCategoryScores = {};
        subQuestionIndex = 0;
        displaySubCategoryQuestion();
    } else {
        displayResults(currentCategory);
    }
}

function displaySubCategoryQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    questionElement.innerHTML = subCategoryQuestions[currentCategory][subQuestionIndex].question;
    optionsElement.innerHTML = "";
    subCategoryQuestions[currentCategory][subQuestionIndex].options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.answer;
        button.className = "option";
        button.onclick = () => handleSubAnswer(option.weight);
        optionsElement.appendChild(button);
    });
}

function handleSubAnswer(weight) {
    for (let key in weight) {
        if (weight.hasOwnProperty(key)) {
            subCategoryScores[key] = (subCategoryScores[key] || 0) + weight[key];
        }
    }
    subQuestionIndex++;
    if (subQuestionIndex < subCategoryQuestions[currentCategory].length) {
        displaySubCategoryQuestion();
    } else {
        determineSubCategory();
    }
}

function determineSubCategory() {
    const topSubCategory = Object.keys(subCategoryScores).reduce((a, b) => subCategoryScores[a] > subCategoryScores[b] ? a : b);
    console.log(`당신의 세부 분과는: ${topSubCategory}`);
    displayResults(topSubCategory);
}

async function displayResults(subCategory) {
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
    // Fetch data from the server
    const response = await fetch('/api/fetchNotionData');
    const data = await response.json();
    console.log('Fetched data:', data); // 데이터를 확인하기 위해 콘솔에 출력
    const notionList = document.querySelector('#notionList');
    notionList.style.display = 'block'; // 결과창에서 표시
    notionList.innerHTML = '';
    data.results.forEach(page => {
        const department = page.properties['분과']?.rich_text?.[0]?.plain_text || 'No Department';
        const subDepartment = page.properties['세부 분과']?.rich_text?.[0]?.plain_text || 'No SubDepartment';
        if (subDepartment !== subCategory) {
            return; // 필터링: 가장 높은 가중치 세부 분과와 일치하지 않는 경우 건너뜀
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
        departmentBox.textContent = `${department} - ${subDepartment}`;
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
            applicationButton.onclick = () => showPopup(`${daysLeft}일 뒤에 지원 가능합니다!`, clubName.textContent);
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

async function savePhoneNumber(clubName, phoneNumber) {
    try {
        const response = await fetch('/api/savePhoneNumber', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clubName, phoneNumber })
        });
        if (response.ok) {
            alert('전화번호가 저장되었습니다.');
        } else {
            alert('전화번호 저장에 실패했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('전화번호 저장 중 오류가 발생했습니다.');
    }
}

function showPopup(message, clubName) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    popupContent.appendChild(messageElement);
    // 전화번호 입력 칸 추가
    const phoneNumberInput = document.createElement('input');
    phoneNumberInput.type = 'tel';
    phoneNumberInput.placeholder = '전화번호를 입력하세요';
    phoneNumberInput.className = 'phone-input';
    popupContent.appendChild(phoneNumberInput);
    // X 아이콘 추가
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => document.body.removeChild(popup);
    popupContent.appendChild(closeButton);
    const submitButton = document.createElement('button');
    submitButton.textContent = '저장';
    submitButton.className = 'submit-button';
    submitButton.onclick = () => {
        const phoneNumber = phoneNumberInput.value;
        if (phoneNumber) {
            savePhoneNumber(clubName, phoneNumber);
            document.body.removeChild(popup);
        } else {
            alert('전화번호를 입력해주세요.');
        }
    };
    popupContent.appendChild(submitButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}
           
        
