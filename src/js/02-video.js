import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// отримаємо посилання на відео
const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);

// створимо конcтанту значення поточного місця
const CURRENT_TIME_KEY = 'videoplayer-current-time';

// створимо функцію яка перевіряє наявність ключа в сховищі
const checkTime = () => {
  let time = 0;
  if (localStorage.getItem(CURRENT_TIME_KEY) !== null) {
    time = localStorage.getItem(CURRENT_TIME_KEY);
  }
  return time;
};

// присвоїмо змінній повернення функції яка перевірить сховище з даними
const currentTime = checkTime();

// запишемо це значення в .setCurrentTime
iframePlayer.setCurrentTime(currentTime);

iframePlayer.on('timeupdate', throttle(setCurrentTime, 1000));

function setCurrentTime(value) {
  localStorage.setItem(CURRENT_TIME_KEY, value.seconds);
}
