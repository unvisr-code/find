// 노션 API 키와 데이터베이스 ID를 입력하세요.
const NOTION_API_KEY = 'secret_IBZ0cQY55Y5ZUlGQK7Jx3gziy8RIIljenkvpgvqmKhw';
const DATABASE_ID = 'fce96a586958411d8a0b153a1563a75a';

// 페이지가 로드되면 데이터를 가져오는 함수 실행
document.addEventListener('DOMContentLoaded', fetchNotionData);

async function fetchNotionData() {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        }
    });
    
    const data = await response.json();
    const tableBody = document.querySelector('#notionTable tbody');
    tableBody.innerHTML = '';

    data.results.forEach(page => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        idCell.textContent = page.id;
        titleCell.textContent = page.properties.Name.title[0].plain_text;
        descriptionCell.textContent = page.properties.Description.rich_text[0].plain_text;

        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        tableBody.appendChild(row);
    });
}
