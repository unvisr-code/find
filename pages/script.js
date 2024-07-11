document.addEventListener('DOMContentLoaded', () => {
    const findClubButton = document.getElementById('findClubButton');

    findClubButton.addEventListener('click', () => {
        showLoadingAnimation();
        fetchNotionData().then(() => {
            window.location.href = '/index.html';
        });
    });

    function showLoadingAnimation() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-animation';
        loadingDiv.innerHTML = '<p>로딩 중...</p>';
        document.body.appendChild(loadingDiv);
    }

    async function fetchNotionData() {
        try {
            const response = await fetch('/api/fetchNotionData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Notion Data:', data);
            // 데이터를 저장하거나 처리하는 로직 추가
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
});
