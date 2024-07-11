document.addEventListener('DOMContentLoaded', fetchNotionData);

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

    const closeButton = document.createElement('button');
    closeButton.textContent = '확인';
    closeButton.className = 'popup-button';
    closeButton.onclick = () => document.body.removeChild(popup);
    popupContent.appendChild(closeButton);

    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}

async function fetchNotionData() {
    try {
        const response = await fetch('/api/fetchNotionData');

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch data:', response.status, response.statusText, errorText);
            return;
        }

        const data = await response.json();
        console.log('Notion Data:', data);

        const notionList = document.querySelector('#notionList');
        notionList.innerHTML = '';

        const departments = new Set();
        data.results.forEach(page => {
            const department = page.properties['분과']?.rich_text?.[0]?.plain_text || 'No Department';
            departments.add(department);
        });

        // Render department filters
        const departmentFilters = document.getElementById('departmentFilters');
        departments.forEach(department => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = department;
            checkbox.className = 'department-filter';
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(department));
            departmentFilters.appendChild(label);
        });

        const applicationFilterButton = document.getElementById('applicationFilterButton');
        const showAllClubsButton = document.getElementById('showAllClubsButton');
        const departmentFilterCheckboxes = document.querySelectorAll('.department-filter');

        function filterAndDisplayResults() {
            const onlyApplication = applicationFilterButton.classList.contains('active');
            const selectedDepartments = Array.from(departmentFilterCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            notionList.innerHTML = '';

            data.results.forEach(page => {
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
                const department = page.properties['분과']?.rich_text?.[0]?.plain_text || 'No Department';
                departmentBox.textContent = department;

                const description = document.createElement('p');
                description.textContent = page.properties['한줄소개']?.rich_text?.[0]?.plain_text || 'No Description';

                const representative = document.createElement('p');
                representative.textContent = `대표자 성함: ${page.properties['대표자 성함']?.rich_text?.[0]?.plain_text || 'N/A'}`;

                const address = document.createElement('p');
                address.textContent = `동아리방 주소: ${page.properties['동아리방 주소']?.rich_text?.[0]?.plain_text || 'N/A'}`;

                const startDate = page.properties['모집 시작일']?.date?.start || 'N/A';
                const endDate = page.properties['모집 마감일']?.date?.start || 'N/A';
                const period = document.createElement('p');
                period.textContent = `모집 기간: ${startDate} ~ ${endDate}`;

                const applicationButton = document.createElement('button');
                const applicationUrl = page.properties['신청방법']?.url || '#';

                if (isTodayBetweenDates(startDate, endDate)) {
                    applicationButton.textContent = '지원하기 !';
                    applicationButton.onclick = () => window.open(applicationUrl, '_blank');
                } else {
                    const daysLeft = calculateDaysLeft(startDate);
                    applicationButton.textContent = `D-${daysLeft}`;
                    applicationButton.onclick = () => showPopup(`${daysLeft}일 뒤에 지원 가능합니다!`);
                }

                applicationButton.style.backgroundColor = '#F2A0B0';

                const curriculum = document.createElement('div');
                curriculum.className = 'curriculum-bar-container';
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
                    monthPoint.style.left = `${(index / (activeMonths.length - 1)) * 100}%`;

                    const detailDiv = document.createElement('div');
                    detailDiv.className = 'month-detail';
                    detailDiv.innerHTML = monthDetails[month].join('<br>');

                    monthPoint.appendChild(detailDiv);
                    monthPoint.onclick = () => {
                        const currentlyDisplayed = document.querySelector('.month-detail.displayed');
                        if (currentlyDisplayed && currentlyDisplayed !== detailDiv) {
                            currentlyDisplayed.classList.remove('displayed');
                            currentlyDisplayed.style.display = 'none';
                        }
                        detailDiv.style.display = detailDiv.style.display === 'block' ? 'none' : 'block';
                        detailDiv.classList.toggle('displayed');
                    };
                    
                    curriculumBar.appendChild(monthPoint);
                });

                curriculum.appendChild(curriculumBar);

                listItemContent.appendChild(clubName);
                listItemContent.appendChild(departmentBox);
                listItemContent.appendChild(description);
                listItemContent.appendChild(representative);
                listItemContent.appendChild(address);
                listItemContent.appendChild(period);

                // 버튼과 커리큘럼 바를 가로로 배치
                const actionContainer = document.createElement('div');
                actionContainer.className = 'action-container';
                actionContainer.appendChild(applicationButton);
                actionContainer.appendChild(curriculum);

                listItemContent.appendChild(actionContainer);

                listItem.appendChild(logoImg);
                listItem.appendChild(listItemContent);

                // 필터 조건 확인
                const matchesApplicationFilter = !onlyApplication || applicationButton.textContent === '지원하기 !';
                const matchesDepartmentFilter = selectedDepartments.length === 0 || selectedDepartments.includes(department);

                if (matchesApplicationFilter && matchesDepartmentFilter) {
                    notionList.appendChild(listItem);
                }
            });
        }

        applicationFilterButton.addEventListener('click', () => {
            applicationFilterButton.classList.toggle('active');
            filterAndDisplayResults();
        });

        showAllClubsButton.addEventListener('click', () => {
            departmentFilterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.parentElement.classList.remove('active');
            });
            applicationFilterButton.classList.remove('active');
            filterAndDisplayResults();
        });

        departmentFilterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                departmentFilterCheckboxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.checked = false;
                        cb.parentElement.classList.remove('active');
                    }
                });
                const label = checkbox.parentElement;
                if (checkbox.checked) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
                filterAndDisplayResults();
            });
        });

        filterAndDisplayResults(); // 초기 표시
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
