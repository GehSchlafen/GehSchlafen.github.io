const notificationContainer = document.querySelector('#notification-container');

function createNotificationElement(message) {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="toast d-flex align-items-center bg-light text-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close ml-auto mr-2" data-dismiss="toast" aria-label="Close"></button>
    </div>
  `.trim();

  return container.querySelector('.toast');
}

const Notifications = {
  show: (message) => {
    const notificationElement = createNotificationElement(message);
    notificationContainer.prepend(notificationElement);

    notificationElement.addEventListener('hidden.bs.toast', () => {
      notificationElement.remove();
    });

    const options = {
      delay: 5000,
    }
    const notification = new bootstrap.Toast(notificationElement, options);

    notification.show();

    return notification;
  }
};

window.Notifications = Notifications;
