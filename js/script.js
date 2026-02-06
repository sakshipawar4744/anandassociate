document.body.classList.add('js-enabled');

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => observer.observe(el));

const counters = document.querySelectorAll('[data-counter]');
let counterStarted = false;

const startCounters = () => {
  if (counterStarted) return;
  counterStarted = true;
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    let value = 0;
    const increment = Math.ceil(target / 80);
    const update = () => {
      value += increment;
      if (value >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = value;
        requestAnimationFrame(update);
      }
    };
    update();
  });
};

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
        }
      });
    },
    { threshold: 0.4 }
  );
  statsObserver.observe(statsSection);
}

const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal img');

if (galleryItems.length && modal && modalImage) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      modalImage.src = img.src;
      modal.classList.add('active');
    });
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}
