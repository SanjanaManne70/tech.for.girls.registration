let clickCount = 0;
const whatsappBtn = document.getElementById('whatsappShare');
const clickCounter = document.getElementById('clickCount');
const shareMessage = document.getElementById('shareMessage');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMessage');

// If already submitted, hide form
if (localStorage.getItem('submitted')) {
  form.classList.add('hidden');
  successMsg.classList.remove('hidden');
}

// WhatsApp share button logic
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
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      // Try to parse result if CORS doesn't block it
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.warn('Response JSON parse failed (CORS?), assuming success.');
        result = { result: "success" }; // fallback
      }

      if (result.result === "already_submitted") {
        alert("You’ve already submitted this form using your Google account.");
        return;
      }

      if (result.result === "success") {
        localStorage.setItem('submitted', 'true');
        form.reset();
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
      } else {
        alert('Submission failed. Please try again.');
      }

    } catch (err) {
      alert('Submission may have succeeded, but browser blocked the response (CORS). Check your sheet.');
      localStorage.setItem('submitted', 'true');
      form.reset();
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    }
  };

  reader.readAsDataURL(file);
});
