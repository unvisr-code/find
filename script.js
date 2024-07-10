document.addEventListener('DOMContentLoaded', fetchNotionData);

async function fetchNotionData() {
    try {
        const response = await fetch('/api/fetchNotionData');

        if (!response.ok) {
            console.error('Failed to fetch data:', response.statusText);
            return;
        }

        const data = await response.json();
        console.log('Notion Data:', data);

        const tableBody = document.querySelector('#notionTable tbody');
        tableBody.innerHTML = '';

        data.results.forEach(page => {
            const row = document.createElement('tr');

            const clubNameCell = document.createElement('td');
            const representativeCell = document.createElement('td');
            const clubRoomAddressCell = document.createElement('td');
            const introductionCell = document.createElement('td');
            const startDateCell = document.createElement('td');
            const endDateCell = document.createElement('td');
            const applicationMethodCell = document.createElement('td');
            const curriculumCell = document.createElement('td');
            const logoCell = document.createElement('td');

            clubNameCell.textContent = page.properties['동아리명']?.title?.[0]?.plain_text || '';
            representativeCell.textContent = page.properties['대표자 성함']?.rich_text?.[0]?.plain_text || '';
            clubRoomAddressCell.textContent = page.properties['동아리방 주소']?.rich_text?.[0]?.plain_text || '';
            introductionCell.textContent = page.properties['한줄소개']?.rich_text?.[0]?.plain_text || '';
            startDateCell.textContent = page.properties['모집 시작일']?.date?.start || '';
            endDateCell.textContent = page.properties['모집 마감일']?.date?.start || '';
            applicationMethodCell.textContent = page.properties['신청방법']?.rich_text?.[0]?.plain_text || '';
            curriculumCell.textContent = page.properties['커리큘럼']?.rich_text?.[0]?.plain_text || '';
            logoCell.innerHTML = page.properties['로고']?.files?.[0]?.external?.url ? `<img src="${page.properties['로고'].files[0].external.url}" alt="로고" width="50" height="50">` : '';

            row.appendChild(clubNameCell);
            row.appendChild(representativeCell);
            row.appendChild(clubRoomAddressCell);
            row.appendChild(introductionCell);
            row.appendChild(startDateCell);
            row.appendChild(endDateCell);
            row.appendChild(applicationMethodCell);
            row.appendChild(curriculumCell);
            row.appendChild(logoCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
