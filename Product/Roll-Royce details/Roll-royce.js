// Image Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize slider only if slides exist
if (totalSlides > 0) {
    // Show first slide initially
    slides[0].classList.add('active');
    createDots();
}

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Handle wrapping
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    // Add active class to current slide
    slides[currentSlide].classList.add('active');
    
    // Add active class to current dot
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Create slider dots
function createDots() {
    const slider = document.querySelector('.slider');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    slider.appendChild(dotsContainer);
}

// Touch support for slider (swipe gestures)
let touchStartX = 0;
let touchEndX = 0;

const sliderElement = document.querySelector('.slider');
if (sliderElement) {
    sliderElement.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderElement.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
}

// Keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    }
    if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Auto-slide (optional - uncomment to enable auto-play)
// setInterval(() => {
//     nextSlide();
// }, 5000);

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add to cart functionality
function addToCart(carName, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push({
        name: carName,
        price: price,
        image: image,
        addedAt: new Date().toISOString()
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(carName + ' has been added to your cart!\nPrice: ' + price);
    
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.querySelector('.cart-counter');
    
    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }
}

// Click outside to close any modals (if you add them later)
document.addEventListener('click', e => {
    // Add modal close logic here if needed
});