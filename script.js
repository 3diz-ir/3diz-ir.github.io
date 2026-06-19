// ۱. الگوریتم سیستم ذرات تعاملی پس‌زمینه (Interactive Mesh Network)
const canvas = document.getElementById('cyberCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const maxDistance = 100; // فاصله اتصال خطوط بین ذرات
const mouse = { x: null, y: null, radius: 150 }; // شعاع اثرگذاری ماوس بر ذرات

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    initCanvas();
    createParticles();
});
initCanvas();

class CyberParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 10; // مقاومت در برابر فرار از ماوس
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        // فیزیک فرار از امواج حرکت ماوس
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.hypot(dx, dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let directionX = dx / distance;
                let directionY = dy / distance;
                this.x -= directionX * force * this.density * 0.3;
                this.y -= directionY * force * this.density * 0.3;
            } else {
                // بازگشت به جایگاه اصلی در صورت دور شدن ماوس
                if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
                if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
            }
        } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
        }
    }
}

function createParticles() {
    particlesArray = [];
    // تولید هندسی ذرات به صورت شبکه‌ای توزیع‌شده
    const quantity = Math.floor((canvas.width * canvas.height) / 18000);
    for (let i = 0; i < quantity; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new CyberParticle(x, y));
    }
}
createParticles();

function animateCyberWorld() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateCyberWorld);
}
animateCyberWorld();


// ۲. موتور تایپ خودکار کلمات کلیدی (Live Typewriter Effect)
const words = ["ابعاد خلاقیت سه‌بعدی.", "اکسسوری‌های فانتزی خاص.", "دکوراسیون مدرن و ارگانیک."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriterText');

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typewriterElement.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // مکث در انتهای کلمه نوشته شده
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();


// ۳. هماهنگ‌کننده منوی همبرگری موبایل
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});