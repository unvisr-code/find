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

        data.results.forEach(page => {
            console.log('Page properties:', page.properties);

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
            } else {
                const daysLeft = calculateDaysLeft(startDate);
                applicationButton.textContent = `D-${daysLeft}`;
            }

            applicationButton.onclick = () => window.open(applicationUrl, '_blank');
            applicationButton.style.backgroundColor = '#F2A0B0';

            const curriculum = document.createElement('div');
            curriculum.className = 'curriculum-bar';
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
            const totalPoints = activeMonths.length;
            const pointSize = 40; // 포인트의 크기(px)
            const gapSize = 10; // 포인트 간의 간격(px)
            const barWidth = (pointSize + gapSize) * totalPoints - gapSize; // 바의 전체 너비 계산

            // curriculum-bar의 가로 크기를 설정
            curriculum.style.width = `${barWidth}px`;

            activeMonths.forEach(month => {
                const monthPoint = document.createElement('div');
                monthPoint.className = 'month-point';
                monthPoint.textContent = month;

                const detailDiv = document.createElement('div');
                detailDiv.className = 'month-detail';
                detailDiv.innerHTML = monthDetails[month].join('<br>');

                monthPoint.appendChild(detailDiv);
                curriculum.appendChild(monthPoint);
            });

            listItemContent.appendChild(clubName);
            listItemContent.appendChild(description);
            listItemContent.appendChild(representative);
            listItemContent.appendChild(address);
            listItemContent.appendChild(period);
            listItemContent.appendChild(applicationButton);
            listItemContent.appendChild(curriculum);

            listItem.appendChild(logoImg);
            listItem.appendChild(listItemContent);

            notionList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
