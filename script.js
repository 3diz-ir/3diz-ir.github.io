// ۱. شبیه‌ساز ذرات معلق فیلامنت پرینت سه بعدی در بک‌گراند کاملاً بهینه شده
const canvas = document.getElementById('filamentCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 50;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FilamentParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 56, 56, 0.15)'; // نور ملایم قرمز هماهنگ با هویت تری دیز
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new FilamentParticle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
init();
animate();


// ۲. کنترلر منوی ریسپانسیو موبایل با انیمیشن روان همبرگری
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.querySelector('.nav-links');
const singleLinks = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// بستن منو پس از کلیک روی هر لینک
singleLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
        
        singleLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});


// ۳. افکت متمایل شدن کارت‌های ویژگی به صورت سه‌بعدی واقعی با ماوس (3D Tilt Effect)
const aboutCards = document.querySelectorAll('.about-card');

aboutCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // محاسبه مرکز کارت
        const cardX = e.clientX - rect.left - (rect.width / 2);
        const cardY = e.clientY - rect.top - (rect.height / 2);
        
        // چرخاندن کارت حداکثر تا ۱۰ درجه بر اساس موقعیت ماوس
        card.style.transform = `rotateY(${cardX / 12}deg) rotateX(${-cardY / 12}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        // بازگشت نرم کارت به حالت عادی
        card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});