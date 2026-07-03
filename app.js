const CONFIG = {
  music: 'assets/music/cancion.mp3',
  photos: {
    inicio: [
      ['assets/photos/inicio/01.jpg', 'El inicio / una foto de cuando todo empezaba'],
      ['assets/photos/inicio/02.jpg', 'Una sonrisa de Yoangelis'],
      ['assets/photos/inicio/03.jpg', 'Un recuerdo del salón o de los primeros días']
    ],
    detalles: [
      ['assets/photos/detalles/01.jpg', 'Una galleta, un regalo, una sorpresa o un detalle hecho por ella'],
      ['assets/photos/detalles/02.jpg', 'Un detalle que tú le hiciste'],
      ['assets/photos/detalles/03.jpg', 'Aplicación web, cartas, chocolates o sorpresas']
    ],
    iglesia: [
      ['assets/photos/iglesia/01.jpg', 'Iglesia, fe o un recuerdo de esperanza'],
      ['assets/photos/iglesia/02.jpg', 'Una señal, una banca, una luz o un símbolo espiritual']
    ],
    'color-de-rosa': [
      ['assets/photos/color-de-rosa/01.jpg', 'Una salida feliz'],
      ['assets/photos/color-de-rosa/02.jpg', 'Cusco o un viaje juntos'],
      ['assets/photos/color-de-rosa/03.jpg', 'Moto, delivery o una noche juntos'],
      ['assets/photos/color-de-rosa/04.jpg', 'Atardecer'],
      ['assets/photos/color-de-rosa/05.jpg', 'Baile o momento espontáneo'],
      ['assets/photos/color-de-rosa/06.jpg', 'Un abrazo, una risa o un beso']
    ],
    cocina: [
      ['assets/photos/cocina/01.jpg', 'El primer plato que le cocinaste'],
      ['assets/photos/cocina/02.jpg', 'La mesa, la cocina o el momento con Juana'],
      ['assets/photos/cocina/03.jpg', 'Una comida que signifique hogar']
    ],
    suenos: [
      ['assets/photos/suenos/01.jpg', 'Uñas, trabajo o materiales'],
      ['assets/photos/suenos/02.jpg', 'Planes del salón'],
      ['assets/photos/suenos/03.jpg', 'Viajes o futuro imaginado']
    ],
    independencia: [
      ['assets/photos/independencia/01.jpg', 'Su nuevo espacio'],
      ['assets/photos/independencia/02.jpg', 'Lavadora, cocina, refrigeradora u otra meta cumplida'],
      ['assets/photos/independencia/03.jpg', 'Cama, colchón o el inicio de su independencia']
    ]
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const scrollProgress = $('#scrollProgress');
const petals = $('#petals');
const bgMusic = $('#bgMusic');
const voicePlayer = $('#voicePlayer');
const musicToggle = $('#musicToggle');
const startMusic = $('#startMusic');
const cinemaToggle = $('#cinemaToggle');
const menuToggle = $('#menuToggle');
const menuClose = $('#menuClose');
const chapterMenu = $('#chapterMenu');
const audioStatus = $('#audioStatus');
const openLetter = $('#openLetter');
const letterBody = $('#letterBody');
const closeStory = $('#closeStory');
const finalMessage = $('#finalMessage');
const photoModal = $('#photoModal');
const modalImage = $('#modalImage');
const modalCaption = $('#modalCaption');
const modalClose = $('#modalClose');

function createPetals() {
  const count = window.innerWidth < 760 ? 18 : 42;
  petals.innerHTML = '';
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 18}s`;
    petal.style.animationDelay = `${Math.random() * 14}s`;
    petal.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
    petal.style.setProperty('--opacity', `${0.15 + Math.random() * 0.45}`);
    petal.style.scale = `${0.6 + Math.random() * 0.95}`;
    petals.appendChild(petal);
  }
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  $$('.reveal').forEach((el) => observer.observe(el));
}

function jumpTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  chapterMenu.classList.remove('open');
}

function setupJumps() {
  $$('[data-jump]').forEach((button) => {
    button.addEventListener('click', () => jumpTo(button.dataset.jump));
  });
}

function setupMenu() {
  menuToggle.addEventListener('click', () => chapterMenu.classList.toggle('open'));
  menuClose.addEventListener('click', () => chapterMenu.classList.remove('open'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      chapterMenu.classList.remove('open');
      closeModal();
    }
  });
}

function setupCinema() {
  cinemaToggle.addEventListener('click', () => {
    document.body.classList.toggle('cinema');
    cinemaToggle.textContent = document.body.classList.contains('cinema') ? '◑' : '◐';
  });
}

async function toggleMusic() {
  try {
    bgMusic.src = CONFIG.music;
    bgMusic.volume = 0.34;
    if (bgMusic.paused) {
      await bgMusic.play();
      musicToggle.textContent = '❚❚';
      audioStatus.textContent = 'Reproduciendo cancion.mp3';
    } else {
      bgMusic.pause();
      musicToggle.textContent = '♫';
      audioStatus.textContent = 'Canción pausada';
    }
  } catch (error) {
    audioStatus.textContent = 'El navegador bloqueó el autoplay. Toca “Activar música”.';
  }
}

async function tryAutoplayMusic() {
  try {
    bgMusic.src = CONFIG.music;
    bgMusic.volume = 0.34;
    await bgMusic.play();
    musicToggle.textContent = '❚❚';
    audioStatus.textContent = 'Reproduciendo cancion.mp3';
  } catch (error) {
    musicToggle.textContent = '♫';
    audioStatus.textContent = 'Toca ♫ para activar la canción';
  }
}

function setupAudio() {
  musicToggle.addEventListener('click', toggleMusic);
  startMusic.addEventListener('click', toggleMusic);
  // Intento de autoplay al abrir. En varios celulares el navegador lo bloqueará
  // hasta que la persona toque la pantalla o el botón de música.
  setTimeout(tryAutoplayMusic, 450);
}

function setupEquation() {
  $$('.interactive-equation').forEach((card) => {
    const toggle = () => card.classList.toggle('active');
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
}

function setupMemoryCards() {
  const output = $('#memoryOutput');
  $$('.memory-cards button').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.memory-cards button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      output.textContent = button.dataset.memory;
    });
  });
}

function setupNightMap() {
  const output = $('#pulseOutput');
  $$('.night-map button').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.night-map button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      output.textContent = button.dataset.pulse;
    });
  });
}

function renderPhotos() {
  $$('.photo-grid, .photo-strip').forEach((grid) => {
    const album = grid.dataset.album;
    const photos = CONFIG.photos[album] || [];
    grid.innerHTML = photos.map(([src, caption]) => `
      <figure class="photo-card" data-src="${src}" data-caption="${caption}" tabindex="0" role="button" aria-label="Abrir foto: ${caption}">
        <img src="${src}" alt="${caption}" loading="lazy" />
        <div class="placeholder"><div><strong>${caption}</strong><small>Reemplaza este espacio con ${src}</small></div></div>
      </figure>
    `).join('');

    grid.querySelectorAll('.photo-card').forEach((card) => {
      const img = card.querySelector('img');
      img.addEventListener('load', () => card.classList.add('has-image'));
      img.addEventListener('error', () => card.classList.remove('has-image'));
      const open = () => {
        if (!card.classList.contains('has-image')) return;
        openModal(card.dataset.src, card.dataset.caption);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
    });
  });
}

function openModal(src, caption) {
  modalImage.src = src;
  modalImage.alt = caption;
  modalCaption.textContent = caption;
  document.body.classList.add('modal-open');
  if (typeof photoModal.showModal === 'function') photoModal.showModal();
}

function closeModal() {
  if (photoModal.open) photoModal.close();
  document.body.classList.remove('modal-open');
}

function setupModal() {
  modalClose.addEventListener('click', closeModal);
  photoModal.addEventListener('click', (event) => {
    if (event.target === photoModal) closeModal();
  });
  photoModal.addEventListener('close', () => document.body.classList.remove('modal-open'));
}

function setupLetter() {
  openLetter.addEventListener('click', () => {
    const isHidden = letterBody.hasAttribute('hidden');
    if (isHidden) {
      letterBody.removeAttribute('hidden');
      openLetter.textContent = 'Ocultar carta';
      letterBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      letterBody.setAttribute('hidden', '');
      openLetter.textContent = 'Leer carta final';
    }
  });

  closeStory.addEventListener('click', () => {
    finalMessage.removeAttribute('hidden');
    closeStory.textContent = 'Historia cerrada';
    closeStory.disabled = true;
    finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

function init() {
  createPetals();
  renderPhotos();
  setupReveal();
  setupJumps();
  setupMenu();
  setupCinema();
  setupAudio();
  setupEquation();
  setupMemoryCards();
  setupNightMap();
  setupModal();
  setupLetter();
  setupServiceWorker();
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', () => {
    updateProgress();
    createPetals();
  });
}

init();
