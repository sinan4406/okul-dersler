const slides = [...document.querySelectorAll('.slide')];
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const currentSlideNumber = document.getElementById('currentSlideNumber');
const currentSlideTitle = document.getElementById('currentSlideTitle');
const totalSlides = document.getElementById('totalSlides');
const progressBar = document.getElementById('progressBar');
const progressTrack = document.querySelector('.progress-track');

let currentIndex = 0;
let isTransitioning = false;
let flowTimer;
let touchStartX = 0;

totalSlides.textContent = String(slides.length).padStart(2, '0');
progressTrack.setAttribute('aria-valuemax', String(slides.length));

function updateInterface() {
    const slide = slides[currentIndex];
    const displayNumber = String(currentIndex + 1).padStart(2, '0');
    currentSlideNumber.textContent = displayNumber;
    currentSlideTitle.textContent = slide.dataset.title;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
    progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
    progressTrack.setAttribute('aria-valuenow', String(currentIndex + 1));
    document.title = `${displayNumber} · ${slide.dataset.title} | HTML-1`;
    history.replaceState(null, '', `#${slide.id}`);
}

function showSlide(nextIndex) {
    if (isTransitioning || nextIndex === currentIndex || nextIndex < 0 || nextIndex >= slides.length) return;
    isTransitioning = true;
    clearInterval(flowTimer);
    const currentSlide = slides[currentIndex];
    currentSlide.classList.add('is-leaving');
    window.setTimeout(() => {
        currentSlide.classList.remove('is-active', 'is-leaving');
        currentSlide.setAttribute('aria-hidden', 'true');
        currentIndex = nextIndex;
        const nextSlide = slides[currentIndex];
        nextSlide.classList.add('is-active');
        nextSlide.removeAttribute('aria-hidden');
        nextSlide.scrollTop = 0;
        updateInterface();
        window.setTimeout(() => { isTransitioning = false; }, 480);
    }, 250);
}

slides.forEach((slide, index) => {
    if (index !== 0) slide.setAttribute('aria-hidden', 'true');
});

previousButton.addEventListener('click', () => showSlide(currentIndex - 1));
nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

document.addEventListener('keydown', (event) => {
    if (event.target.matches('button, a')) return;
    if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); showSlide(currentIndex + 1); }
    if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); showSlide(currentIndex - 1); }
    if (event.key === 'Home') { event.preventDefault(); showSlide(0); }
    if (event.key === 'End') { event.preventDefault(); showSlide(slides.length - 1); }
});

document.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
document.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) < 60) return;
    showSlide(distance < 0 ? currentIndex + 1 : currentIndex - 1);
}, { passive: true });

const favoriteButton = document.getElementById('favoriteButton');
const favoriteResult = document.getElementById('favoriteResult');
favoriteButton.addEventListener('click', () => {
    const isFavorite = favoriteButton.getAttribute('aria-pressed') === 'true';
    favoriteButton.setAttribute('aria-pressed', String(!isFavorite));
    favoriteButton.classList.toggle('is-favorite', !isFavorite);
    favoriteButton.querySelector('.heart').textContent = isFavorite ? '♡' : '♥';
    favoriteButton.querySelector('.favorite-label').textContent = isFavorite ? 'Favoriye ekle' : 'Favoriden çıkar';
    favoriteResult.textContent = isFavorite ? 'JavaScript durumu geri aldı.' : 'JavaScript tıklama olayını yakaladı ve arayüzü değiştirdi.';
});

document.querySelectorAll('.code-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.code-tab').forEach((item) => {
            item.classList.remove('active');
            item.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.code-panel').forEach((panel) => panel.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.querySelector(`[data-panel="${tab.dataset.code}"]`).classList.add('active');
    });
});

const detailDemoButton = document.getElementById('detailDemoButton');
const detailDemoResult = document.getElementById('detailDemoResult');
detailDemoButton.addEventListener('click', () => {
    detailDemoResult.classList.add('show');
    window.setTimeout(() => detailDemoResult.classList.remove('show'), 2200);
});

const playFlowButton = document.getElementById('playFlowButton');
const flowNodes = [...document.querySelectorAll('[data-flow-step]')];
const flowReturn = document.getElementById('flowReturn');
playFlowButton.addEventListener('click', () => {
    clearInterval(flowTimer);
    flowNodes.forEach((node) => node.classList.remove('is-flowing'));
    flowReturn.classList.remove('show');
    playFlowButton.disabled = true;
    playFlowButton.textContent = 'İstek ilerliyor…';
    let step = 0;
    flowNodes[step].classList.add('is-flowing');
    flowTimer = window.setInterval(() => {
        flowNodes[step].classList.remove('is-flowing');
        step += 1;
        if (step < flowNodes.length) {
            flowNodes[step].classList.add('is-flowing');
        } else {
            clearInterval(flowTimer);
            flowReturn.classList.add('show');
            playFlowButton.disabled = false;
            playFlowButton.textContent = 'Yeniden oynat';
        }
    }, 850);
});

document.querySelectorAll('.reveal-button').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.quiz-card');
        const revealed = card.classList.toggle('revealed');
        button.textContent = revealed ? 'Yanıtı gizle' : 'Yanıtı göster';
    });
});

const hashIndex = slides.findIndex((slide) => `#${slide.id}` === location.hash);
if (hashIndex > 0) {
    slides[0].classList.remove('is-active');
    slides[0].setAttribute('aria-hidden', 'true');
    currentIndex = hashIndex;
    slides[currentIndex].classList.add('is-active');
    slides[currentIndex].removeAttribute('aria-hidden');
}

updateInterface();
