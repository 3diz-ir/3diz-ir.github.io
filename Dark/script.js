// ۱. سیستم پرتو لیزر تعاملی ماوس و ذرات کوانتومی (Quantum Laser Trail)
const canvas = document.getElementById('quantumCanvas');
const ctx = canvas.getContext('2d');

let pointerHistory = [];
const maxHistoryLength = 20; // طول ردپای لیزر

window.addEventListener('mousemove', (e) => {
    pointerHistory.push({ x: e.clientX, y: e.clientY });
    if (pointerHistory.length > maxHistoryLength) {
        pointerHistory.shift();
    }
});

function syncCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', syncCanvasSize);
syncCanvasSize();

function renderQuantumLaser() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رندر کردن ردپای لیزر ذوب کننده متریال پرینتر
    if (pointerHistory.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pointerHistory[0].x, pointerHistory[0].y);
        
        for (let i = 1; i < pointerHistory.length; i++) {
            ctx.lineTo(pointerHistory[i].x, pointerHistory[i].y);
        }
        
        // تنظیم گرادیان نوری برای خط لیزر ماوس
        ctx.strokeStyle = 'rgba(0, 255, 170, 0.25)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    
    requestAnimationFrame(renderQuantumLaser);
}
renderQuantumLaser();


// ۲. سیستم تعقیب‌کننده زاویه نور ماوس روی کارت‌های کریستالی (Real-time Ray Tracking)
const crystalCards = document.querySelectorAll('.crystal-card');

crystalCards.forEach(card => {
    const tracker = card.querySelector('.light-tracker');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // انتقال کانون نور نئونی دقیقاً زیر نشانگر ماوس روی کارت
        tracker.style.left = `${x}px`;
        tracker.style.top = `${y}px`;
        
        // افکت مایل شدن سه‌بعدی ارگانیک
        const tiltX = (x - (rect.width / 2)) / 15;
        const tiltY = (y - (rect.height / 2)) / 15;
        card.style.transform = `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        tracker.style.top = '-500px';
        tracker.style.left = '-500px';
    });
});


// ۳. عملکرد هوشمند منوی موبایل ریسپانسیو
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const singleLinks = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

singleLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        
        singleLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});