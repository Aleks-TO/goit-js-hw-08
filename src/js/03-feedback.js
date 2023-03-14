import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailEl = form.querySelector('input');
const messageEl = form.querySelector('textarea');
const btnEl = form.querySelector('button');
const FORM_KEY = 'feedback-form-state';

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
form.addEventListener('input', throttle(handleFormInput, 1000));

function handleFormInput(event) {
  const formData = new FormData(form);
  // console.log(formData);
  const submitedData = {};
  formData.forEach((value, key) => {
    submitedData[key] = value;
  });
  localStorage.setItem(FORM_KEY, JSON.stringify(submitedData));
}

// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
const savedData = JSON.parse(localStorage.getItem(FORM_KEY));
if (savedData) {
  emailEl.value = savedData.email;
  messageEl.value = savedData.message;
}

// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  // перевірка чи всі поля заповнені
  if (emailEl.value === '' || messageEl.value === '') {
    return alert('ERROR!!!  Please fill oll fields');
  }
  const data = JSON.parse(localStorage.getItem(FORM_KEY));
  console.log(data);
  localStorage.removeItem(FORM_KEY);
  event.currentTarget.reset();
}
