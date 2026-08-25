const screens = [...document.querySelectorAll('.screen')];
const show = (id) => { screens.forEach((screen) => screen.classList.toggle('is-active', screen.id === id)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
const message = `Happy Birthday meri jaan ❤️🎂

Tu kitna bhi bada ho jaaye, mere liye tu hamesha mera chhotu sa cutu sa bhai hi rahega. 😚😚

Tujhe pareshan karna, teri leg-pulling karna aur kabhi-kabhi daantna toh mera haq hai 😌😂

Lekin sach mein, I’m always going to be there for you. I hope teri life hamesha khushiyon se bhari rahe, tu jo chahe woh achieve kare aur hamesha aise hi hasta rahe.🥰❣️

Happy Birthday once again, Kuku! ❤️

Lots of love,
Junnu — your Badi Behen 🫶🏻`;
const confetti = document.querySelector('.confetti');
let cakeChoice = '';

document.querySelector('#yes-btn').addEventListener('click', () => show('choices'));
document.querySelector('#no-btn').addEventListener('click', () => { document.querySelector('#tease').textContent = 'Nice try Kuku 😂 Ab surprise toh dekhna hi padega!'; setTimeout(() => show('choices'), 1200); });
document.querySelectorAll('.cake-option').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.cake-option').forEach((item) => item.classList.remove('selected'));
  button.classList.add('selected'); cakeChoice = button.dataset.choice;
  document.querySelector('#mood-step').classList.remove('is-hidden');
  document.querySelector('.progress span').style.width = '62%';
  document.querySelector('#selection-note').textContent = 'Excellent choice, cake connoisseur ✨';
}));
document.querySelectorAll('.mood-option').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.mood-option').forEach((item) => item.classList.remove('selected')); button.classList.add('selected');
  document.querySelector('#chosen').textContent = `${cakeChoice} + ${button.dataset.mood} = perfect Kuku energy ✨`;
  document.querySelector('.progress span').style.width = '100%'; show('reveal');
}));
document.querySelector('#open-btn').addEventListener('click', () => { show('letter'); typeLetter(); });
let typed = false;
function typeLetter() { if (typed) return; typed = true; const target = document.querySelector('#message'); let index = 0; const tick = () => { target.textContent = message.slice(0, index); index += 2; if (index <= message.length) setTimeout(tick, 16); }; tick(); }
document.querySelector('#memories-btn').addEventListener('click', () => show('memories'));
document.querySelector('#video-btn').addEventListener('click', () => show('video-section'));
document.querySelector('#final-btn').addEventListener('click', () => { show('finale'); confetti.classList.remove('party'); void confetti.offsetWidth; confetti.classList.add('party'); });
document.querySelector('#replay-btn').addEventListener('click', () => { typed = false; document.querySelector('#message').textContent = ''; show('intro'); });
document.querySelectorAll('.photo-card input').forEach((input) => input.addEventListener('change', () => { const file = input.files[0]; if (!file) return; const card = input.closest('.photo-card'); const placeholder = card.querySelector('.photo-placeholder'); placeholder.style.backgroundImage = `url(${URL.createObjectURL(file)})`; card.classList.add('has-photo'); }));
document.querySelector('#video-input').addEventListener('change', (event) => { const file = event.target.files[0]; if (!file) return; const video = document.querySelector('#birthday-video'); video.src = URL.createObjectURL(file); video.classList.remove('is-hidden'); document.querySelector('#video-placeholder').classList.add('is-hidden'); });