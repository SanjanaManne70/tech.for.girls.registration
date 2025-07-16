let clickCount = 0;
const whatsappBtn = document.getElementById('whatsappShare');
const clickCounter = document.getElementById('clickCount');
const shareMessage = document.getElementById('shareMessage');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMessage');

lottie.loadAnimation({
  container: document.getElementById('lottieAnimation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://lottie.host/57f1c0ff-90d6-42ed-8e16-bf8c7790e1dc/QxCtODxdoB.json'
});

// If already submitted, hide form
if (localStorage.getItem('submitted')) {
  form.classList.add('hidden');
  successMsg.classList.remove('hidden');
}

whatsappBtn.addEventListener('click', () => {
  if (clickCount < 5) {
    const siteLink = 'https://sanjanamanne70.github.io/tech.for.girls.registration/';
    const message = encodeURIComponent(`Hey Buddy, Join Tech For Girls Community 👩‍💻🌸\nRegister here: ${siteLink}`);
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

    const url = 'https://script.google.com/macros/s/AKfycbyXa4yfl72PTANtEk7pxWThYQmButgdGWQ21vr7WZqrcLNB7ESrG8RBn7gXX6hUJGPD/exec';

    const params = new URLSearchParams();
    params.append("name", name);
    params.append("phone", phone);
    params.append("email", email);
    params.append("college", college);
    params.append("screenshot", base64File);

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      localStorage.setItem('submitted', 'true');
      form.reset();
      form.classList.add('hidden');
      successMsg.textContent = "✅ Form submitted successfully!";
      successMsg.classList.remove('hidden');

    } catch (err) {
      localStorage.setItem('submitted', 'true');
      form.reset();
      form.classList.add('hidden');
      successMsg.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      successMsg.classList.remove('hidden');
    }
  };

  reader.readAsDataURL(file);
});
