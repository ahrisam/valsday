// Create floating hearts in background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.getElementById('floatingHearts').appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

// Start creating floating hearts
setInterval(createFloatingHeart, 800);

// Handle YES button click
function handleYes() {
    // Hide the main card and show heartfelt message page
    document.querySelector('.card-container').style.display = 'none';
    document.getElementById('heartfeltPage').style.display = 'block';

    // Confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(createFloatingHeart, i * 50);
    }
}

// Show final Valentine's page
function showFinalPage() {
    document.getElementById('heartfeltPage').style.display = 'none';
    document.getElementById('finalPage').style.display = 'block';

    // More confetti
    for (let i = 0; i < 100; i++) {
        setTimeout(createFloatingHeart, i * 30);
    }
}

// Handle NO button click
function handleNo() {
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('responseMessage');

    message.innerHTML = `
                <h1>💔 Oh No... 💔</h1>
                <div style="max-width: 400px; margin: 30px auto;">
                    <p style="font-size: 22px; line-height: 1.8; color: #333; margin-bottom: 25px;">
                        Please reconsider and try again! 💕
                    </p>
                    <p style="font-size: 48px; margin: 30px 0;">🥺</p>
                </div>
                <button onclick="closeMessage()" style="background: #ff1744; padding: 18px 50px; font-size: 20px; font-weight: bold; color: white; border: none; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(255, 23, 68, 0.3);">
                    Try Again 💖
                </button>
            `;

    overlay.classList.add('show');
    message.classList.add('show');
}

// Close message overlay
function closeMessage() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('responseMessage').classList.remove('show');
}

// Close overlay on click
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('overlay').addEventListener('click', closeMessage);
});

// Try to start background audio after first user interaction (bypasses autoplay restrictions)
document.addEventListener('DOMContentLoaded', function () {
    const bgAudio = document.getElementById('bg-music');
    if (!bgAudio) return;

    function tryPlay() {
        bgAudio.play().catch(function (err) {
            console.log('bg audio play() failed:', err);
        });
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('touchstart', tryPlay);
    }

    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
});