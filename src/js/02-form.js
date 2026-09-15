const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

populateFormFields();

form.addEventListener('input', onFormInput);

form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formData = {
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormFields() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState) {
    try {
      const { email = '', message = '' } = JSON.parse(savedState);
      emailInput.value = email;
      messageInput.value = message;
    } catch (error) {
      console.error('LocalStorage okunurken hata oluştu:', error);
    }
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (!emailValue || !messageValue) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  const submittedData = {
    email: emailValue,
    message: messageValue,
  };

  console.log('Form Verileri:', submittedData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}
