document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  clearErrors();

  // Gather values
  const firstName   = document.querySelector('[name="FName"]').value.trim();
  const lastName    = document.querySelector('[name="LName"]').value.trim();
  const dob         = document.querySelector('[name="DOB"]').value.trim();
  const phoneNumber = document.querySelector('[name="PNum"]').value.trim();
  const email       = document.querySelector('[name="EAddress"]').value.trim();

  if (!validateForm(firstName, lastName, dob, phoneNumber, email)) return;

  // Send data to Django backend
  try {
    const response = await fetch('http://localhost:8000/currencyapp/registration/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name:   firstName,
        last_name:    lastName,
        dob:          dob,
        phone_number: phoneNumber,
        email:        email
      })
    });

    const result = await response.json();

    if (result.success) {
      // Redirect or show success message after successful registration
      alert('Registration successful!');
      this.reset(); // clears the form
      // window.location.href = '/thank-you.html'; // optional redirect
    } else {
      // Show server-side errors (e.g. email already registered)
      if (result.field) {
        showError(result.field, result.error);
      } else {
        alert('Error: ' + result.error);
      }
    }

  } catch (err) {
    console.error('Registration failed:', err);
    alert('Something went wrong. Please try again.');
  }
});

// ── Validation ────────────────────────────────────────────────
function validateForm(firstName, lastName, dob, phoneNumber, email) {
  let isValid = true;

  // First Name
  if (firstName.length < 2) {
    showError('FName', 'First name must be at least 2 characters.');
    isValid = false;
  }

  // Last Name
  if (lastName.length < 2) {
    showError('LName', 'Last name must be at least 2 characters.');
    isValid = false;
  }

  // Date of Birth (expects MM/DD/YYYY)
  const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!dobRegex.test(dob)) {
    showError('DOB', 'Please enter a valid date in MM/DD/YYYY format.');
    isValid = false;
  } else {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13 || age > 120) {
      showError('DOB', 'You must be at least 13 years old to register.');
      isValid = false;
    }
  }

  // Phone Number (accepts formats like 555-555-5555 or 5555555555)
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phoneRegex.test(phoneNumber)) {
    showError('PNum', 'Please enter a valid 10-digit phone number.');
    isValid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('EAddress', 'Please enter a valid email address.');
    isValid = false;
  }

  return isValid;
}

// ── Real-time validation as user types ────────────────────────
document.querySelector('[name="FName"]').addEventListener('blur', function() {
  clearError('FName');
  if (this.value.trim().length < 2)
    showError('FName', 'First name must be at least 2 characters.');
});

document.querySelector('[name="LName"]').addEventListener('blur', function() {
  clearError('LName');
  if (this.value.trim().length < 2)
    showError('LName', 'Last name must be at least 2 characters.');
});

document.querySelector('[name="DOB"]').addEventListener('blur', function() {
  clearError('DOB');
  const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!dobRegex.test(this.value.trim()))
    showError('DOB', 'Please enter a valid date in MM/DD/YYYY format.');
});

document.querySelector('[name="PNum"]').addEventListener('blur', function() {
  clearError('PNum');
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phoneRegex.test(this.value.trim()))
    showError('PNum', 'Please enter a valid 10-digit phone number.');
});

document.querySelector('[name="EAddress"]').addEventListener('blur', function() {
  clearError('EAddress');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.value.trim()))
    showError('EAddress', 'Please enter a valid email address.');
});

// ── Error Helpers ──────────────────────────────────────────────
function showError(fieldName, message) {
  const input = document.querySelector(`[name="${fieldName}"]`);

  let errorSpan = document.querySelector(`#error-${fieldName}`);
  if (!errorSpan) {
    errorSpan = document.createElement('span');
    errorSpan.id = `error-${fieldName}`;
    errorSpan.style.color = 'red';
    errorSpan.style.fontSize = '0.85em';
    errorSpan.style.display = 'block';
    input.insertAdjacentElement('afterend', errorSpan);
  }

  errorSpan.textContent = message;
  input.style.borderColor = 'red';
}

function clearError(fieldName) {
  const input = document.querySelector(`[name="${fieldName}"]`);
  const errorSpan = document.querySelector(`#error-${fieldName}`);
  if (errorSpan) errorSpan.textContent = '';
  if (input) input.style.borderColor = '';
}

function clearErrors() {
  ['FName', 'LName', 'DOB', 'PNum', 'EAddress'].forEach(clearError);
}
