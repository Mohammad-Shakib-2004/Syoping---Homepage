// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-theme'));
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '🌜' : '🌞';
});

// Floating Product Carousel
const carouselItems = document.querySelectorAll('#product-carousel .carousel-item');
let carouselIndex = 0;

function rotateCarousel() {
    carouselItems.forEach((item, index) => {
        item.style.display = index === carouselIndex ? 'block' : 'none';
    });
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
}
setInterval(rotateCarousel, 3000);

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
    backgroundVideo.style.transform = `translateY(${window.scrollY * 0.5}px)`;
});

// Modal Popup for Featured Product
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

document.querySelector('.carousel-item').addEventListener('click', () => {
    modal.style.display = 'block';
});
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Accessibility Improvements
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-hidden', 'true');

const updateModalAccessibility = (isOpen) => {
    modal.setAttribute('aria-hidden', !isOpen);
};

document.querySelector('.carousel-item').addEventListener('click', () => {
    modal.style.display = 'block';
    updateModalAccessibility(true);
});
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    updateModalAccessibility(false);
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        updateModalAccessibility(false);
    }
});
