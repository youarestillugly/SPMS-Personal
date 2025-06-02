document.getElementById('changePasswordForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const errorMessageElement = document.querySelector('#passwordError');
  const successCard = document.getElementById('successCard');
  const overlay = document.getElementById('overlay');

  // Clear any previous errors
  errorMessageElement.textContent = '';

  // Basic Validation
  if (newPassword !== confirmPassword) {
    errorMessageElement.textContent = 'New password and confirmation do not match.';
    return;
  }

  if (newPassword.length < 8) {
    errorMessageElement.textContent = 'Password must be at least 8 characters long.';
    return;
  }

  try {
    const response = await fetch('/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword
      })
    });

    const result = await response.text();

    if (!response.ok) {
      errorMessageElement.textContent = result;
    } else {
      // Show success card modal
      successCard.style.display = 'block';
      overlay.style.display = 'block';

      // Reset the form
      this.reset();

      // Close button event
      document.getElementById('closeSuccess').onclick = function () {
        successCard.style.display = 'none';
        overlay.style.display = 'none';
      };

      // Also close modal if user clicks outside the card (on overlay)
      overlay.onclick = function () {
        successCard.style.display = 'none';
        overlay.style.display = 'none';
      };
    }
  } catch (err) {
    console.error('Error:', err);
    errorMessageElement.textContent = 'An error occurred while changing password.';
  }
});
