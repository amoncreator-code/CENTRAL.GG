const cards = document.querySelectorAll('.game-card');
const sun = document.querySelector('.sun');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('active'));
  card.addEventListener('mouseleave', () => card.classList.remove('active'));
});

document.addEventListener('mousemove', (event) => {
  if (!sun) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 7;
  const y = (event.clientY / window.innerHeight - 0.5) * 4;
  sun.style.transform = `translate(${x}px, ${y}px)`;
});
