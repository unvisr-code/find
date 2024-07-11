document.addEventListener('DOMContentLoaded', () => {
    const findClubButton = document.getElementById('findClubButton');

    findClubButton.addEventListener('click', () => {
        showLoadingAnimation();
        setTimeout(() => {
            window.location.href = '/pages/find/Q';
        }, 1000); // 애니메이션 시간과 일치하도록 설정
    });

    function showLoadingAnimation() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-animation';
        loadingDiv.innerHTML = '<p>로딩 중...</p>';
        document.body.appendChild(loadingDiv);
    }
});
