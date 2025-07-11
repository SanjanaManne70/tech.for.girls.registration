// script.js
let clickCount = 0;
const whatsappBtn = document.getElementById('whatsappShare');
const clickCounter = document.getElementById('clickCount');
const shareMessage = document.getElementById('shareMessage');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMessage');

if (localStorage.getItem('submitted')) {
  form.classList.add('hidden');
  successMsg.classList.remove('hidden');
}

whatsappBtn.addEventListener('click', () => {
  if (clickCount < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community 💖");
    window.open(`https://wa.me/?text=${message}`, '_blank');
    clickCount++;
    clickCounter.textContent = `Click count: ${clickCount}/5`;
    if (clickCount === 5) {
      shareMessage.classList.remove('hidden');
    }
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (clickCount < 5) {
    alert('Please complete WhatsApp sharing before submitting.');
    return;
  }

  const formData = new FormData(form);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const college = formData.get('college');
  const file = document.getElementById('screenshot').files[0];

  if (!file) {
    alert('Please upload a screenshot.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async function () {
    const base64File = reader.result;

    // Replace with your deployed Google Apps Script URL:
    const url = 'https://script.google.com/macros/s/AKfycbxbZCB0wJABBj1mjxEI2d6eLWCqnc95buAqISYSMyL8jLHVEyM0KYUOKJl3_NHtQLSkQA/exec';

    const payload = {
      name,
      phone,
      email,
      college,
      screenshot: base64File
    };

    const params = new URLSearchParams();
    params.append("name", name);
    params.append("phone", phone);
    params.append("email", email);
    params.append("college", college);
    params.append("screenshot", base64File);

    const response = await fetch(url, {
      method: 'POST',
      body: params
      });


    if (response.ok) {
      localStorage.setItem('submitted', 'true');
      form.reset();
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    } else {
      alert('Failed to submit. Please try again.');
    }
  };

  reader.readAsDataURL(file);
});
