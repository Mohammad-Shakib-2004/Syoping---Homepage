// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('touchstart', toggleTheme); // Better mobile response

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-theme'));
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '🌜' : '🌞';
}

// Floating Product Carousel with Touch-Swipe Support
const carouselItems = document.querySelectorAll('#product-carousel .carousel-item');
let carouselIndex = 0;

function rotateCarousel() {
    carouselItems.forEach((item, index) => {
        item.style.display = index === carouselIndex ? 'block' : 'none';
    });
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
}

setInterval(rotateCarousel, 3000);

// Detect swipe events for mobile carousel control
let startX;
document.getElementById('product-carousel').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
document.getElementById('product-carousel').addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX) {
        carouselIndex = (carouselIndex + 1) % carouselItems.length; // Swipe left
    } else if (endX > startX) {
        carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length; // Swipe right
    }
    rotateCarousel();
});

// Animated Statistics Section
const statsSection = document.getElementById('stats-section');
const stats = statsSection.querySelectorAll('.stat h3');
let statsAnimated = false;

function animateStats() {
    if (window.scrollY + window.innerHeight >= statsSection.offsetTop && !statsAnimated) {
        stats.forEach(stat => {
            const max = parseInt(stat.innerText.replace(/,/g, ''), 10);
            let count = 0;
            const interval = setInterval(() => {
                count += Math.ceil(max / 100);
                stat.innerText = count >= max ? max.toLocaleString() : count.toLocaleString();
                if (count >= max) clearInterval(interval);
            }, 30);
        });
        statsAnimated = true;
    }
}
window.addEventListener('scroll', animateStats);

// Parallax Effect on Background Video
const backgroundVideo = document.getElementById('background-video');
window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) {
        backgroundVideo.style.transform = `translateY(${window.scrollY * 0.3}px)`; // Less intense for mobile
    } else {
        backgroundVideo.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Modal Popup for Featured Product with Accessibility Enhancements
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

function openModal() {
    modal.style.display = 'block';
    updateModalAccessibility(true);
}

function closeModal() {
    modal.style.display = 'none';
    updateModalAccessibility(false);
}

document.querySelector('.carousel-item').addEventListener('click', openModal);
document.querySelector('.carousel-item').addEventListener('touchstart', openModal); // Touch event for mobile
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

// Accessibility Improvements for Modal
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-hidden', 'true');

function updateModalAccessibility(isOpen) {
    modal.setAttribute('aria-hidden', !isOpen);
}
