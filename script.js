const grid = document.querySelector('.games-grid');
const cards = Array.from(document.querySelectorAll('.game-card'));
const sun = document.querySelector('.sun');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('active'));
  card.addEventListener('mouseleave', () => card.classList.remove('active'));
});

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function organizeGames() {
  if (!grid) return;

  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  const mobileGames = cards.filter(card => card.dataset.mobile === 'yes');
  const pcGames = cards.filter(card => card.dataset.mobile !== 'yes');

  // Celular: compatíveis primeiro, depois os que pedem PC.
  // PC/tablet: catálogo aleatório para manter a experiência dinâmica.
  const ordered = isMobile
    ? [...mobileGames, ...pcGames]
    : shuffle(cards);

  ordered.forEach(card => grid.appendChild(card));
}

organizeGames();

let lastMobileState = window.matchMedia('(max-width: 760px)').matches;
window.addEventListener('resize', () => {
  const currentMobileState = window.matchMedia('(max-width: 760px)').matches;
  if (currentMobileState !== lastMobileState) {
    lastMobileState = currentMobileState;
    organizeGames();
  }
});

document.addEventListener('mousemove', (event) => {
  if (!sun) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 7;
  const y = (event.clientY / window.innerHeight - 0.5) * 4;
  sun.style.transform = `translate(${x}px, ${y}px)`;
});
