// 노션 API 키와 데이터베이스 ID를 입력하세요.
const NOTION_API_KEY = 'secret_IBZ0cQY55Y5ZUlGQK7Jx3gziy8RIIljenkvpgvqmKhw';
const DATABASE_ID = 'fce96a586958411d8a0b153a1563a75a';

// 페이지가 로드되면 데이터를 가져오는 함수 실행
document.addEventListener('DOMContentLoaded', fetchNotionData);

async function fetchNotionData() {
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-02-22' // 최신 버전 확인 후 업데이트
            },
            body: JSON.stringify({ page_size: 100 }) // 필요한 경우, 요청 본문 추가
        });

        if (!response.ok) {
            console.error('Failed to fetch data:', response.statusText);
            return;
        }

        const data = await response.json();
        console.log('Notion Data:', data);  // 응답 데이터 로그 출력

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

            // 각 셀에 값을 할당
            clubNameCell.textContent = page.properties['동아리명']?.title?.[0]?.plain_text || '';
            representativeCell.textContent = page.properties['대표자 성함']?.rich_text?.[0]?.plain_text || '';
            clubRoomAddressCell.textContent = page.properties['동아리방 주소']?.rich_text?.[0]?.plain_text || '';
            introductionCell.textContent = page.properties['한줄소개']?.rich_text?.[0]?.plain_text || '';
            startDateCell.textContent = page.properties['모집 시작일']?.date?.start || '';
            endDateCell.textContent = page.properties['모집 마감일']?.date?.start || '';
            applicationMethodCell.textContent = page.properties['신청방법']?.rich_text?.[0]?.plain_text || '';
            curriculumCell.textContent = page.properties['커리큘럼']?.rich_text?.[0]?.plain_text || '';
            logoCell.innerHTML = page.properties['로고']?.url ? `<img src="${page.properties['로고'].url}" alt="로고" width="50" height="50">` : '';

            // 각 셀을 행에 추가
            row.appendChild(clubNameCell);
            row.appendChild(representativeCell);
            row.appendChild(clubRoomAddressCell);
            row.appendChild(introductionCell);
            row.appendChild(startDateCell);
            row.appendChild(endDateCell);
            row.appendChild(applicationMethodCell);
            row.appendChild(curriculumCell);
            row.appendChild(logoCell);

            // 행을 테이블 본문에 추가
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
