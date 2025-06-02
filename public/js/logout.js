const logoutButton = document.getElementById('logout-button');
const cancelButton = document.getElementById('cancel-button');
const logoutModal = document.getElementById('logout-modal');
const confirmLogoutButton = document.getElementById('confirm-logout');
const cancelLogoutButton = document.getElementById('cancel-logout');

// Show the confirmation modal
if (logoutButton) {
  logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logoutModal.style.display = 'flex';
  });
}

// Cancel logout and go back to home
if (cancelButton) {
  cancelButton.addEventListener('click', function() {
    window.location.href = '/home';
  });
}

// Confirm and call backend logout route
if (confirmLogoutButton) {
  confirmLogoutButton.addEventListener('click', function() {
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  });
}

// Cancel the modal only
if (cancelLogoutButton) {
  cancelLogoutButton.addEventListener('click', function() {
    logoutModal.style.display = 'none';
  });
}
