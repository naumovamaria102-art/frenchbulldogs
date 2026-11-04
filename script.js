const graduates = [
  { id: 'amelishka', name: 'Амелишка', city: null, image: 'assets/graduates/amelishka.jpg', x: 9.6, y: 62.5 },
  { id: 'archi', name: 'Арчи', city: null, image: 'assets/graduates/archi.jpg', x: 16.6, y: 64.4 },
  { id: 'buddy', name: 'Бадди', city: 'Кемерово', image: 'assets/graduates/buddy.jpg', x: 40, y: 59 },
  { id: 'brungilda', name: 'Брунгильда', city: 'Москва', image: 'assets/graduates/brungilda.jpg', x: 12.7, y: 57 },
  { id: 'bruce', name: 'Брюс', city: null, image: 'assets/graduates/bruce.jpg', x: 20, y: 63 },
  { id: 'busya', name: 'Буся', city: null, image: 'assets/graduates/busya.jpg', x: 33.8, y: 61.3 },
  { id: 'grantic-nikel', name: 'Грантик и Никель', city: 'Мурманская область', image: 'assets/graduates/grantic-nikel.jpg', x: 10.7, y: 29.8 },
  { id: 'juna', name: 'Джуна', city: null, image: 'assets/graduates/juna.jpg', x: 59, y: 57 },
  { id: 'zaychik', name: 'Зайчик', city: null, image: 'assets/graduates/zaychik.jpg', x: 30, y: 62 },
  { id: 'ivory', name: 'Иворь', city: null, image: 'assets/graduates/ivory.jpg', x: 47, y: 56 },
  { id: 'lana', name: 'Лана', city: null, image: 'assets/graduates/lana.jpg', x: 22, y: 56 },
  { id: 'magic', name: 'Магия', city: null, image: 'assets/graduates/magic.jpg', x: 10.4, y: 52 },
  { id: 'mona', name: 'Мона', city: 'Мурманская область', image: 'assets/graduates/mona.jpg', x: 12, y: 32.2 },
  { id: 'ersinda', name: 'Эрсинда', city: 'Москва', image: 'assets/graduates/ersinda.jpg', x: 15.2, y: 60.1 },
  { id: 'nikka', name: 'Никка', city: null, image: 'assets/graduates/nikka.jpg', x: 56, y: 61 },
  { id: 'nyusya', name: 'Нюся', city: null, image: 'assets/graduates/nyusya.jpg', x: 25, y: 53 },
  { id: 'oskar-larry', name: 'Оскар и Ларри', city: 'Екатеринбург', image: 'assets/graduates/oskar-larry.jpg', x: 26, y: 58.2 },
  { id: 'persik', name: 'Персик', city: null, image: 'assets/graduates/persik.jpg', x: 65, y: 56 },
  { id: 'sapphire', name: 'Сапфир', city: null, image: 'assets/graduates/sapphire.jpg', x: 73, y: 60 },
  { id: 'svipi', name: 'Свипи', city: null, image: 'assets/graduates/svipi.jpg', x: 51, y: 48 },
  { id: 'teodor', name: 'Теодор', city: null, image: 'assets/graduates/teodor.jpg', x: 33.5, y: 65.5 },
  { id: 'teddy', name: 'Тэдди', city: null, image: 'assets/graduates/teddy.jpg', x: 18, y: 60.2 },
  { id: 'teffi', name: 'Тэффи', city: null, image: 'assets/graduates/teffi.jpg', x: 50, y: 41 },
  { id: 'khan', name: 'Хан', city: null, image: 'assets/graduates/khan.jpg', x: 27, y: 63.8 },
  { id: 'sheldon', name: 'Шелдон', city: null, image: 'assets/graduates/sheldon.jpg', x: 81, y: 57 },
  { id: 'sherliz', name: 'Шерлиз', city: null, image: 'assets/graduates/sherliz.jpg', x: 37, y: 54.7 }
];

const mobileClusters = [
  { id: 'north', title: 'Выпускники на севере', x: 11, y: 31, ids: ['grantic-nikel', 'mona'] },
  { id: 'west', title: 'Выпускники на западе карты', x: 12, y: 58, ids: ['amelishka', 'archi', 'brungilda', 'ersinda', 'magic'] },
  { id: 'central', title: 'Выпускники в центральной части карты', x: 26, y: 65, ids: ['bruce', 'teddy', 'khan', 'lana', 'nyusya', 'oskar-larry', 'zaychik', 'teodor'] },
  { id: 'siberia', title: 'Выпускники в Сибири', x: 40, y: 57, ids: ['busya', 'sherliz', 'buddy'] },
  { id: 'middle', title: 'Выпускники на маршруте', x: 55, y: 46, ids: ['teffi', 'svipi', 'nikka', 'juna', 'ivory'] },
  { id: 'east', title: 'Выпускники на востоке', x: 76, y: 58, ids: ['persik', 'sapphire', 'sheldon'] }
];

const points = document.getElementById('map-points');
const clusters = document.getElementById('map-clusters');
const modal = document.getElementById('graduate-modal');
const modalImage = document.getElementById('graduate-modal-image');
const modalName = document.getElementById('graduate-modal-name');
const modalLocation = document.getElementById('graduate-modal-location');
const modalGallery = document.getElementById('graduate-modal-gallery');
const picker = document.getElementById('graduate-picker');
const pickerTitle = document.getElementById('graduate-picker-title');
const pickerCopy = document.getElementById('graduate-picker-copy');
const graduateRail = document.getElementById('graduate-rail');
const progress = document.getElementById('map-discovered');
const mapSection = document.getElementById('map');
const mobileCta = document.querySelector('.mobile-cta');
const mapArtwork = document.querySelector('.map-art');
const mapSurface = document.querySelector('.graduate-map');
const mapMotionToggle = document.querySelector('.map-motion-toggle');
const graduatesById = new Map(graduates.map(dog => [dog.id, dog]));
const clustersById = new Map(mobileClusters.map(cluster => [cluster.id, cluster]));
const stationByGraduate = new Map();
const seen = new Set();

mobileClusters.forEach(cluster => cluster.ids.forEach(id => stationByGraduate.set(id, cluster.id)));

if (stationByGraduate.size !== graduates.length || [...stationByGraduate.keys()].some(id => !graduatesById.has(id))) {
  console.warn('Проверьте группы выпускников на карте.');
}

const imageAlt = dog => `${dog.name}, выпускник питомника`;
const plural = count => `${count} ${count === 1 ? 'выпускник' : count < 5 ? 'выпускника' : 'выпускников'}`;

function updateProgress() {
  if (progress) progress.textContent = seen.size;
}

function setLocation(dog) {
  modalLocation.textContent = dog.city || '';
  modalLocation.hidden = !dog.city;
}

function renderModalGallery(cluster, selectedId) {
  modalGallery.replaceChildren();
  const hasSeveralGraduates = cluster && cluster.ids.length > 1;
  modalGallery.hidden = !hasSeveralGraduates;

  if (!hasSeveralGraduates) return;

  cluster.ids.forEach(id => {
    const dog = graduatesById.get(id);
    const button = document.createElement('button');
    const image = document.createElement('img');

    button.type = 'button';
    button.className = 'graduate-thumb';
    button.classList.toggle('selected', id === selectedId);
    button.setAttribute('aria-label', `Открыть фотографию: ${dog.name}`);
    image.src = dog.image;
    image.alt = '';
    button.append(image);
    button.addEventListener('click', () => openGraduate(id));
    modalGallery.append(button);
  });
}

function openGraduate(id) {
  const dog = graduatesById.get(id);
  if (!dog) return;

  const cluster = clustersById.get(stationByGraduate.get(id));
  seen.add(id);
  updateProgress();
  modalImage.src = dog.image;
  modalImage.alt = imageAlt(dog);
  modalName.textContent = dog.name;
  setLocation(dog);
  renderModalGallery(cluster, id);
  document.querySelectorAll('.graduate-point').forEach(point => {
    point.classList.toggle('selected', point.dataset.graduate === id);
  });

  if (!modal.open) modal.showModal();
}

function createDesktopPoint(dog, index) {
  const point = document.createElement('button');
  const marker = document.createElement('span');
  const ticket = document.createElement('span');
  const image = document.createElement('img');
  const name = document.createElement('b');
  const location = document.createElement('small');

  point.type = 'button';
  point.className = 'graduate-point';
  point.dataset.graduate = dog.id;
  point.style.setProperty('--x', `${dog.x}%`);
  point.style.setProperty('--y', `${dog.y}%`);
  point.style.setProperty('--delay', `${(index % 6) * 0.42}s`);
  point.setAttribute('aria-label', `Открыть фотографию: ${dog.name}${dog.city ? `, ${dog.city}` : ''}`);
  marker.className = 'station-dot';
  ticket.className = 'station-ticket';
  image.src = dog.image;
  image.alt = '';
  name.textContent = dog.name;
  location.textContent = dog.city || 'Выпускник питомника';
  ticket.append(image, name, location);
  point.append(marker, ticket);
  point.addEventListener('click', () => openGraduate(dog.id));
  points.append(point);
}

function openPicker(clusterId) {
  const cluster = clustersById.get(clusterId);
  if (!cluster) return;

  pickerTitle.textContent = cluster.title;
  pickerCopy.textContent = `Здесь ${plural(cluster.ids.length)}. Выберите фотографию, чтобы познакомиться.`;
  graduateRail.replaceChildren();

  cluster.ids.forEach(id => {
    const dog = graduatesById.get(id);
    const choice = document.createElement('button');
    const image = document.createElement('img');
    const caption = document.createElement('span');
    const location = document.createElement('small');

    choice.type = 'button';
    choice.className = 'graduate-choice';
    choice.setAttribute('aria-label', `Открыть историю: ${dog.name}`);
    image.src = dog.image;
    image.alt = '';
    caption.textContent = dog.name;
    location.textContent = dog.city || 'Выпускник питомника';
    choice.append(image, caption, location);
    choice.addEventListener('click', () => {
      picker.close();
      window.requestAnimationFrame(() => openGraduate(dog.id));
    });
    graduateRail.append(choice);
  });

  if (!picker.open) picker.showModal();
}

function createMobileCluster(cluster) {
  const button = document.createElement('button');
  const marker = document.createElement('span');
  const count = document.createElement('b');

  button.type = 'button';
  button.className = 'map-cluster';
  button.style.setProperty('--x', `${cluster.x}%`);
  button.style.setProperty('--y', `${cluster.y}%`);
  button.setAttribute('aria-label', `Открыть: ${cluster.title}, ${plural(cluster.ids.length)}`);
  count.textContent = cluster.ids.length;
  marker.append(count);
  button.append(marker);
  button.addEventListener('click', () => openPicker(cluster.id));
  clusters.append(button);
}

graduates.forEach(createDesktopPoint);
mobileClusters.forEach(createMobileCluster);

document.getElementById('close-graduate-modal').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});
picker.addEventListener('click', event => {
  if (event.target === picker) picker.close();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.open) modal.close();
});

if (mapSection && mobileCta && 'IntersectionObserver' in window) {
  const mapObserver = new IntersectionObserver(entries => {
    mobileCta.classList.toggle('is-hidden', entries[0].isIntersecting);
  }, { threshold: 0.12 });
  mapObserver.observe(mapSection);
}

if (mapArtwork && mapSurface && mapMotionToggle && typeof mapArtwork.pauseAnimations === 'function') {
  const motionState = {
    held: false,
    visible: false,
    pointer: false,
    focus: false,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  const syncMapMotion = () => {
    const paused = motionState.held || !motionState.visible || motionState.pointer || motionState.focus || motionState.reduced;
    if (paused) mapArtwork.pauseAnimations();
    else mapArtwork.unpauseAnimations();
    mapMotionToggle.setAttribute('aria-pressed', String(motionState.held));
    mapMotionToggle.textContent = motionState.held ? 'Запустить поезд' : 'Остановить поезд';
  };

  mapMotionToggle.addEventListener('click', () => {
    motionState.held = !motionState.held;
    syncMapMotion();
  });

  mapSurface.addEventListener('pointerenter', () => {
    motionState.pointer = true;
    syncMapMotion();
  });
  mapSurface.addEventListener('pointerleave', () => {
    motionState.pointer = false;
    syncMapMotion();
  });
  mapSurface.addEventListener('focusin', () => {
    motionState.focus = true;
    syncMapMotion();
  });
  mapSurface.addEventListener('focusout', () => {
    motionState.focus = false;
    syncMapMotion();
  });

  if ('IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver(entries => {
      motionState.visible = entries[0].isIntersecting;
      syncMapMotion();
    }, { threshold: 0.14 });
    motionObserver.observe(mapSurface);
  } else {
    motionState.visible = true;
    syncMapMotion();
  }
}

updateProgress();
