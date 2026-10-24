const graduates = [{"id": "amelishka", "name": "Амелишка", "city": null, "image": "assets/graduates/amelishka.jpg", "x": 9.6, "y": 62.5}, {"id": "archi", "name": "Арчи", "city": null, "image": "assets/graduates/archi.jpg", "x": 15.2, "y": 61.0}, {"id": "buddy", "name": "Бадди", "city": "Кемерово", "image": "assets/graduates/buddy.jpg", "x": 40.0, "y": 59.0}, {"id": "brungilda", "name": "Брунгильда", "city": "Москва", "image": "assets/graduates/brungilda.jpg", "x": 13.5, "y": 58.4}, {"id": "bruce", "name": "Брюс", "city": null, "image": "assets/graduates/bruce.jpg", "x": 20.0, "y": 63.0}, {"id": "busya", "name": "Буся", "city": null, "image": "assets/graduates/busya.jpg", "x": 33.8, "y": 61.3}, {"id": "grantic-nikel", "name": "Грантик и Никель", "city": "Мурманская область", "image": "assets/graduates/grantic-nikel.jpg", "x": 10.7, "y": 29.8}, {"id": "juna", "name": "Джуна", "city": null, "image": "assets/graduates/juna.jpg", "x": 59.0, "y": 57.0}, {"id": "zaychik", "name": "Зайчик", "city": null, "image": "assets/graduates/zaychik.jpg", "x": 30.0, "y": 62.0}, {"id": "ivory", "name": "Иворь", "city": null, "image": "assets/graduates/ivory.jpg", "x": 47.0, "y": 56.0}, {"id": "lana", "name": "Лана", "city": null, "image": "assets/graduates/lana.jpg", "x": 22.0, "y": 56.0}, {"id": "magic", "name": "Магия", "city": null, "image": "assets/graduates/magic.jpg", "x": 10.4, "y": 52.0}, {"id": "mona", "name": "Мона", "city": "Мурманская область", "image": "assets/graduates/mona.jpg", "x": 12.0, "y": 32.2}, {"id": "ersinda", "name": "Эрсинда", "city": "Москва", "image": "assets/graduates/ersinda.jpg", "x": 15.2, "y": 60.1}, {"id": "nikka", "name": "Никка", "city": null, "image": "assets/graduates/nikka.jpg", "x": 56.0, "y": 61.0}, {"id": "nyusya", "name": "Нюся", "city": null, "image": "assets/graduates/nyusya.jpg", "x": 25.0, "y": 53.0}, {"id": "oskar-larry", "name": "Оскар и Ларри", "city": "Екатеринбург", "image": "assets/graduates/oskar-larry.jpg", "x": 26.0, "y": 58.2}, {"id": "persik", "name": "Персик", "city": null, "image": "assets/graduates/persik.jpg", "x": 65.0, "y": 56.0}, {"id": "sapphire", "name": "Сапфир", "city": null, "image": "assets/graduates/sapphire.jpg", "x": 73.0, "y": 60.0}, {"id": "svipi", "name": "Свипи", "city": null, "image": "assets/graduates/svipi.jpg", "x": 51.0, "y": 48.0}, {"id": "teodor", "name": "Теодор", "city": null, "image": "assets/graduates/teodor.jpg", "x": 31.5, "y": 63.0}, {"id": "teddy", "name": "Тэдди", "city": null, "image": "assets/graduates/teddy.jpg", "x": 18.0, "y": 60.2}, {"id": "teffi", "name": "Тэффи", "city": null, "image": "assets/graduates/teffi.jpg", "x": 50.0, "y": 41.0}, {"id": "khan", "name": "Хан", "city": null, "image": "assets/graduates/khan.jpg", "x": 28.0, "y": 60.8}, {"id": "sheldon", "name": "Шелдон", "city": null, "image": "assets/graduates/sheldon.jpg", "x": 81.0, "y": 57.0}, {"id": "sherliz", "name": "Шерлиз", "city": null, "image": "assets/graduates/sherliz.jpg", "x": 37.0, "y": 54.7}];
const points = document.getElementById('map-points');
const modal = document.getElementById('graduate-modal');
const modalImage = document.getElementById('graduate-modal-image');
const modalName = document.getElementById('graduate-modal-name');
const modalLocation = document.getElementById('graduate-modal-location');
const progress = document.getElementById('map-discovered');
const seen = new Set();
const locationText = dog => dog.city ? dog.city.toUpperCase() : 'ГОРОД УТОЧНЯЕМ';
const imageAlt = dog => `${dog.name}, выпускник питомника`;
function updateProgress() { progress.textContent = seen.size; }
function openGraduate(id) {
  const dog = graduates.find(item => item.id === id); if (!dog) return;
  seen.add(id); updateProgress();
  modalImage.src = dog.image; modalImage.alt = imageAlt(dog);
  modalName.textContent = dog.name; modalLocation.textContent = locationText(dog);
  document.querySelectorAll('.graduate-point').forEach(point => point.classList.toggle('selected', point.dataset.graduate === id));
  modal.showModal();
}
graduates.forEach((dog, index) => {
  const point = document.createElement('button'); point.type = 'button'; point.className = 'graduate-point'; point.dataset.graduate = dog.id;
  point.style.setProperty('--x', `${dog.x}%`); point.style.setProperty('--y', `${dog.y}%`); point.style.setProperty('--delay', `${(index % 6) * .42}s`);
  point.setAttribute('aria-label', `Открыть фотографию: ${dog.name}${dog.city ? ', ' + dog.city : ''}`); point.innerHTML = '<span></span>'; point.addEventListener('click', () => openGraduate(dog.id)); points.append(point);
});
document.getElementById('close-graduate-modal').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.open) modal.close(); });
updateProgress();
