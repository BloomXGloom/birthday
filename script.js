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
const mediaDatabase = 'birthday-media';
const mediaStore = 'uploads';
const permanentPhotoUrls = [
  'https://plain-apac-prod-public.komododecks.com/202608/25/lYXCBL8tJWIQXhxS9Ka4/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202608/25/92XJS825fDC8ATsP8oaM/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202608/25/GNpd7nyfczh7saBvozEc/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202608/25/4WNYU4oHCY0W1f9APbks/image.jpg'
];
const permanentVideoUrl = 'https://www.image2url.com/r2/default/videos/1787677649516-e67e3506-d57b-46ef-8a6b-71c5909a993c.mp4';

function openMediaDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(mediaDatabase, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(mediaStore);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveMedia(key, file) {
  const database = await openMediaDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(mediaStore, 'readwrite');
    transaction.objectStore(mediaStore).put(file, key);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
}

async function loadMedia(key) {
  const database = await openMediaDatabase();
  const file = await new Promise((resolve, reject) => {
    const request = database.transaction(mediaStore).objectStore(mediaStore).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return file;
}

function displayPhoto(input, source) {
  const card = input.closest('.photo-card');
  const placeholder = card.querySelector('.photo-placeholder');
  const imageUrl = typeof source === 'string' ? source : URL.createObjectURL(source);
  placeholder.style.backgroundImage = `url(${imageUrl})`;
  card.classList.add('has-photo');
}

function displayVideo(source) {
  const video = document.querySelector('#birthday-video');
  video.src = typeof source === 'string' ? source : URL.createObjectURL(source);
  video.classList.remove('is-hidden');
  document.querySelector('#video-placeholder').classList.add('is-hidden');
}

document.querySelector('#birthday-video').addEventListener('error', () => {
  document.querySelector('#birthday-video').classList.add('is-hidden');
  document.querySelector('#video-placeholder').classList.remove('is-hidden');
});

document.querySelectorAll('.photo-card input').forEach((input, index) => {
  const key = `photo-${index + 1}`;
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    displayPhoto(input, file);
    try { await saveMedia(key, file); } catch (error) { console.error('Could not save photo', error); }
  });
  loadMedia(key).then((file) => displayPhoto(input, file || permanentPhotoUrls[index])).catch(() => displayPhoto(input, permanentPhotoUrls[index]));
});

const videoInput = document.querySelector('#video-input');
videoInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  displayVideo(file);
  try { await saveMedia('video', file); } catch (error) { console.error('Could not save video', error); }
});
loadMedia('video').then((file) => displayVideo(file || permanentVideoUrl)).catch(() => displayVideo(permanentVideoUrl));

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