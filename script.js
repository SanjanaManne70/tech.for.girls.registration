let clickCount = 0;
const whatsappBtn = document.getElementById('whatsappShare');
const clickCounter = document.getElementById('clickCount');
const shareMessage = document.getElementById('shareMessage');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMessage');

// If already submitted, show success message
if (localStorage.getItem('submitted')) {
  form.classList.add('hidden');
  successMsg.classList.remove('hidden');
}

// WhatsApp Share button click handler
whatsappBtn.addEventListener('click', () => {
  if (clickCount < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community ");
    window.open(`https://wa.me/?text=${message}`, '_blank');
    clickCount++;
    clickCounter.textContent = `Click count: ${clickCount}/5`;

    if (clickCount === 5) {
      shareMessage.classList.remove('hidden');
    }
  }
});

// Form submission handler
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

  // Read file as base64
  const reader = new FileReader();
  reader.onload = async function () {
    const base64File = reader.result;

    // 🔗 Your deployed Google Apps Script URL
    const url = 'https://script.google.com/macros/s/AKfycbyXa4yfl72PTANtEk7pxWThYQmButgdGWQ21vr7WZqrcLNB7ESrG8RBn7gXX6hUJGPD/exec';

    const params = new URLSearchParams();
    params.append("name", name);
    params.append("phone", phone);
    params.append("email", email);
    params.append("college", college);
    params.append("screenshot", base64File);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // Important to avoid triggering preflight
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      const result = await response.json();

      if (result.result === "success") {
        localStorage.setItem('submitted', 'true');
        form.reset();
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
      } else {
        alert('Submission failed: ' + JSON.stringify(result));
      }

    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  reader.readAsDataURL(file);
});
