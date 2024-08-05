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
                {"answer": "공연(춤, 연극)", "weight": {"공연예술": 1}}
            ]
        },
        {
            "question": "공연 후 어떤 성취감을 느낄 것 같나요?",
            "options": [
                {"answer": "함께 만든 노력의 결과물", "weight": {"음악연주": 1}},
                {"answer": "연습의 결과를 무대에서 실현", "weight": {"공연예술": 1}}
            ]
        },
        {
            "question": "더 선호하는 공연 장소는 어디인가요?",
            "options": [
                {"answer": "길거리 버스킹, 광장", "weight": {"음악연주": 1}},
                {"answer": "무대, 공연장", "weight": {"공연예술": 1}}
            ]
        }
    ],
    '문화': [
        {
            "question": "어떤 종류의 문화 활동을 좋아하나요?",
            "options": [
                {"answer": "스스로 탐구하는 문화 활동", "weight": {"창작예술": 1}},
                {"answer": "다른 사람들과 어울리는 문화 활동", "weight": {"문화": 1}}
            ]
        },
        {
            "question": "문화 활동 중 가장 기억에 남는 경험은 무엇인가요?",
            "options": [
                {"answer": "작품 전시회 참여", "weight": {"창작예술": 1}},
                {"answer": "문화 축제 참석", "weight": {"문화": 1}}
            ]
        },
        {
            "question": "문화 활동을 통해 얻고 싶은 것은 무엇인가요?",
            "options": [
                {"answer": "개인적 창의력과 표현력 향상", "weight": {"창작예술": 1}},
                {"answer": "다양한 문화 체험과 사회적 연결", "weight": {"문화": 1}}
            ]
        }
    ],
    // '봉사': [
    //     {
    //         "question": "어떤 봉사 활동을 선호하나요?",
    //         "options": [
    //             {"answer": "교육 봉사", "weight": {"봉사": 1}},
    //             {"answer": "환경 봉사", "weight": {"봉사": 1}}
    //         ]
    //     },
    //     {
    //         "question": "봉사 활동의 주된 목적은 무엇인가요?",
    //         "options": [
    //             {"answer": "사회적 기여", "weight": {"봉사": 1}},
    //             {"answer": "개인적 성취", "weight": {"봉사": 1}}
    //         ]
    //     }
    // ],
    // '종교': [
    //     {
    //         "question": "종교 활동에서 어떤 역할을 선호하나요?",
    //         "options": [
    //             {"answer": "예배 참여", "weight": {"종교": 1}},
    //             {"answer": "기도 모임", "weight": {"종교": 1}}
    //         ]
    //     },
    //     {
    //         "question": "종교 활동 중 어떤 것을 더 선호하나요?",
    //         "options": [
    //             {"answer": "봉사 활동", "weight": {"종교": 1}},
    //             {"answer": "교회 모임", "weight": {"종교": 1}}
    //         ]
    //     }
    // ],
    '체육': [
        {
            "question": "체육 활동을 선택할 때 가장 중요한 요소는 무엇인가요?",
            "options": [
                {"answer": "팀과의 협력", "weight": {"구기체육": 1}},
                {"answer": "개인적 도전", "weight": {"생활체육": 1}},
                {"answer": "기술 연습, 심신 단련", "weight": {"무술체육": 1}}
            ]
        },
        {
            "question": "체육 활동을 통해 얻고 싶은 신체적 변화는 무엇인가요?",
            "options": [
                {"answer": "근력과 팀워크 향상", "weight": {"구기체육": 1}},
                {"answer": "지구력과 체력 향상", "weight": {"생활체육": 1}},
                {"answer": "유연성 및 강인함", "weight": {"무술체육": 1}}
            ]
        },
        {
            "question": "체육 활동을 할 때 가장 중요하게 생각하는 것은 무엇인가요?",
            "options": [
                {"answer": "전략과 기술", "weight": {"구기체육": 1}},
                {"answer": "운동의 즐거움", "weight": {"생활체육": 1}},
                {"answer": "정신 집중과 훈련", "weight": {"무술체육": 1}}
            ]
        }
    ],
    '학술': [
        {
            "question": "학술 활동을 통해 가장 얻고 싶은 것은 무엇인가요?",
            "options": [
                {"answer": "기술적 숙련도", "weight": {"정보과학": 1}},
                {"answer": "폭 넓은 탐구", "weight": {"학술교양": 1}}
            ]
        },
        {
            "question": "학술 활동 중 어떤 환경에서 가장 효율적으로 공부하나요?",
            "options": [
                {"answer": "조용하고 집중된 환경", "weight": {"정보과학": 1}},
                {"answer": "서로 의견을 교환할 수 있는 환경", "weight": {"학술교양": 1}}
            ]
        },
        {
            "question": "학술 활동을 통해 배우고 싶은 기술이나 지식은 무엇인가요?",
            "options": [
                {"answer": "알고리즘과 데이터 구조", "weight": {"정보과학": 1}},
                {"answer": "비판적 사고와 분석", "weight": {"학술교양": 1}}
            ]
        }
    ]
};


const questions = [
    // ... (기존 질문 내용)
];

const subCategoryQuestions = {
    // ... (기존 세부 분과 질문 내용)
};

let currentQuestion = 0;
let subQuestionIndex = 0;
let currentCategory = '';
const scores = { "문화": 0, "학술": 0, "체육": 0, "종교": 0, "공연": 0, "봉사": 0 };
let subCategoryScores = {};
let totalQuestions = questions.length; // 전체 질문 수
let totalSubQuestions = 0; // 세부분과 질문 수

const subCategoryDescriptions = {
    // ... (기존 세부 분과 설명 내용)
};

displayQuestion();

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = document.getElementById("progress-percent");
    const progressIcon = document.getElementById("progress-icon");

    const currentTotalQuestions = totalQuestions + totalSubQuestions;
    const currentAnsweredQuestions = currentQuestion + subQuestionIndex;
    const progressPercentage = (currentAnsweredQuestions / currentTotalQuestions) * 100;

    progressBar.style.width = progressPercentage + '%';
    progressPercent.innerHTML = `${progressPercentage.toFixed(0)}%`;
    progressIcon.style.left = `calc(${progressPercentage}% - 10px)`;
}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.innerHTML = questions[currentQuestion].question;
    optionsElement.innerHTML = "";

    let options = questions[currentQuestion].options;
    const dontKnowOption = options.find(option => option.answer === "잘 모르겠음");
    options = options.filter(option => option.answer !== "잘 모르겠음");
    shuffle(options);
    options.push(dontKnowOption);

    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.answer;
        button.className = "option";
        button.onclick = () => handleAnswer(option.weight);
        optionsElement.appendChild(button);
    });

    updateProgressBar();
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
    currentCategory = topCategory;
    if (subCategoryQuestions[currentCategory]) {
        subCategoryScores = {};
        subQuestionIndex = 0;
        totalSubQuestions = subCategoryQuestions[currentCategory].length;
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

    updateProgressBar();
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
    displayResults(topSubCategory);
}

async function displayResults(subCategory) {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = document.getElementById("progress-percent");
    const progressIcon = document.getElementById("progress-icon");

    const resultImage = document.getElementById("result-image");
    const resultDepartment = document.getElementById("result-department");
    const notionList = document.getElementById("notionList");
    const resultContainer = document.querySelector('.result-container');

    document.body.classList.add("no-background");

    questionElement.innerHTML = "";
    optionsElement.innerHTML = "";
    progressBar.style.width = '100%';
    progressPercent.innerHTML = '100%';
    progressIcon.style.left = `calc(100% - 10px)`;

    resultImage.style.display = 'block';
    resultImage.style.backgroundImage = "url('/pages/find/donghwa.png')";

    resultDepartment.innerHTML = `
        <div class="result-text">${subCategory} 분과를 추천드려요!</div>
        <div class="description-text">${subCategoryDescriptions[subCategory]}</div>
    `;

    const showButton = document.createElement("button");
    showButton.className = "show-button";
    showButton.innerText = "세부 분과 보기";
    showButton.onclick = () => {
        if (notionList.style.display === 'block') {
            notionList.style.display = 'none';
            resultContainer.classList.remove("show-content");
            resultContainer.classList.add("center-content");
            showButton.innerText = "세부 분과 보기";
        } else {
            loadNotionData(subCategory);
            notionList.style.display = 'block';
            resultContainer.classList.add("show-content");
            resultContainer.classList.remove("center-content");
            showButton.innerText = "세부 분과 닫기";
        }
    };
    resultDepartment.appendChild(showButton);

    loadNotionData(subCategory);
}

async function loadNotionData(subCategory) {
    try {
        const response = await fetch('/api/fetchNotionData');
        const data = await response.json();
        console.log('Fetched data:', data);
        const notionList = document.querySelector('#notionList');
        notionList.innerHTML = '';
        data.results.forEach(page => {
            const subDepartment = page.properties['세부 분과']?.rich_text?.[0]?.plain_text || 'No SubDepartment';
            console.log('SubDepartment:', subDepartment);
            if (subDepartment !== subCategory) {
                return;
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
            departmentBox.textContent = `${subDepartment}`;
            const description = document.createElement('p');
            description.textContent = page.properties['한줄소개']?.rich_text?.[0]?.plain_text || 'No Description';
            const representative = document.createElement('p');
            representative.textContent = `대표자 성함: ${page.properties['대표자 성함']?.rich_text?.[0]?.plain_text || 'N/A'}`;
            const address = document.createElement('p');
            address.textContent = `동아리방 주소: ${page.properties['동아리방 주소']?.rich_text?.[0]?.plain_text || 'N/A'}`;
            const recruitmentPeriod = document.createElement('p');
            const startDate = page.properties['모집 시작일']?.date?.start || 'N/A';
            const endDate = page.properties['모집 마감일']?.date?.start || 'N/A';
            recruitmentPeriod.textContent = `모집 기간: ${startDate} ~ ${endDate}`;

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

            const curriculum = document.createElement('div');
            curriculum.className = 'curriculum-bar-container';
            const curriculumBar = document.createElement('div');
            curriculumBar.className = 'curriculum-bar';

            const curriculumText = page.properties['커리큘럼']?.rich_text?.[0]?.plain_text || 'N/A';
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
                monthPoint.textContent = month.slice(0, -1);

                let leftPosition = (index / (activeMonths.length - 1)) * 100;

                if (index === activeMonths.length - 1) {
                    leftPosition -= 2;
                }

                monthPoint.style.left = `${leftPosition}%`;

                const detailDiv = document.createElement('div');
                detailDiv.className = 'month-detail';
                detailDiv.innerHTML = monthDetails[month].join('<br>');

                monthPoint.appendChild(detailDiv);
                curriculumBar.appendChild(monthPoint);

                if (window.innerWidth <= 600) {
                    monthPoint.addEventListener('click', () => {
                        detailDiv.style.display = 'block';
                        setTimeout(() => {
                            detailDiv.classList.add('fade-out');
                            setTimeout(() => {
                                detailDiv.style.display = 'none';
                                detailDiv.classList.remove('fade-out');
                            }, 500);
                        }, 1300);
                    });
                }
            });

            curriculum.appendChild(curriculumBar);

            listItemContent.appendChild(clubName);
            listItemContent.appendChild(departmentBox);
            listItemContent.appendChild(description);
            listItemContent.appendChild(representative);
            listItemContent.appendChild(address);
            listItemContent.appendChild(recruitmentPeriod);

            const actionContainer = document.createElement('div');
            actionContainer.className = 'action-container';
            actionContainer.appendChild(applicationButton);
            actionContainer.appendChild(curriculum);

            listItemContent.appendChild(actionContainer);

            listItem.appendChild(logoImg);
            listItem.appendChild(listItemContent);

            notionList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        const notionList = document.querySelector('#notionList');
        notionList.innerHTML = `<p>데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.</p>`;
    }
}

displayQuestion();

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

function showPopup(message, clubName) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    popupContent.appendChild(messageElement);

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.placeholder = '총동아리연합회 카톡 채널을 추가하고 전화번호를 입력해주시면 카톡을 드릴게요!';
    phoneInput.className = 'phone-input';
    popupContent.appendChild(phoneInput);

    const closeButton = document.createElement('button');
    closeButton.textContent = '확인';
    closeButton.className = 'popup-button';
    closeButton.onclick = async () => {
        const phoneNumber = phoneInput.value;
        console.log('Entered phone number:', phoneNumber);
        if (phoneNumber) {
            const isSaved = await savePhoneNumber(clubName, phoneNumber);
            if (isSaved) {
                window.location.href = 'http://pf.kakao.com/_xjsxmXG';
            } else {
                alert('전화번호 저장에 실패했습니다.');
            }
        }
        document.body.removeChild(popup);
    };
    popupContent.appendChild(closeButton);

    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}

async function savePhoneNumber(clubName, phoneNumber) {
    console.log('savePhoneNumber function called');
    const pageUrl = window.location.href;
    try {
        const response = await fetch('/api/savePhoneNumber', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clubName, phoneNumber, pageUrl })
        });
        if (response.ok) {
            console.log('Phone number saved successfully');
            return true;
        } else {
            const errorText = await response.text();
            console.error('Failed to save phone number:', errorText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

displayQuestion();
