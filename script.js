document.addEventListener('DOMContentLoaded', fetchNotionData);

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
            clubName.textContent = page.properties['동아리명']?.title?.[0]?.plain_text || '';

            const description = document.createElement('p');
            description.textContent = page.properties['한줄소개']?.rich_text?.[0]?.plain_text || '';

            const representative = document.createElement('p');
            representative.textContent = `대표자 성함: ${page.properties['대표자 성함']?.rich_text?.[0]?.plain_text || ''}`;

            const address = document.createElement('p');
            address.textContent = `동아리방 주소: ${page.properties['동아리방 주소']?.rich_text?.[0]?.plain_text || ''}`;

            const startDate = document.createElement('p');
            startDate.textContent = `모집 시작일: ${page.properties['모집 시작일']?.date?.start || ''}`;

            const endDate = document.createElement('p');
            endDate.textContent = `모집 마감일: ${page.properties['모집 마감일']?.date?.start || ''}`;

            const applicationMethod = document.createElement('p');
            applicationMethod.textContent = `신청방법: ${page.properties['신청방법']?.rich_text?.[0]?.plain_text || ''}`;

            const curriculum = document.createElement('p');
            curriculum.textContent = `커리큘럼: ${page.properties['커리큘럼']?.rich_text?.[0]?.plain_text || ''}`;

            listItemContent.appendChild(clubName);
            listItemContent.appendChild(description);
            listItemContent.appendChild(representative);
            listItemContent.appendChild(address);
            listItemContent.appendChild(startDate);
            listItemContent.appendChild(endDate);
            listItemContent.appendChild(applicationMethod);
            listItemContent.appendChild(curriculum);

            listItem.appendChild(logoImg);
            listItem.appendChild(listItemContent);

            notionList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
