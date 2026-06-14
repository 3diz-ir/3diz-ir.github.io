// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal Elements on Scroll
const revealElements = () => {
    const reveals = document.querySelectorAll('.about-card, .product-item, .cta-content');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial Styles for Animation
document.querySelectorAll('.about-card, .product-item, .cta-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
});

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 8%';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.padding = '0.8rem 8%';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
