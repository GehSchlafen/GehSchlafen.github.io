const sendSmsButton = document.querySelector('#sendSms');
const form = document.querySelector('form');
const authTokenField = document.querySelector('#authTokenField');

const API_URL = 'https://api.telekom.com/service/sms/v1'; //Telekom-eigene API

sendSmsButton.addEventListener('click', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const requestBody = new URLSearchParams(formData);
  const authToken = authTokenField.value;

  const requestOptions = {
    "headers": {
      "X-Api-Key": authToken, // without any authorization header prefix such as Bearer or Basic
      "content-type": "application/x-www-form-urlencoded"
    },
    "body": requestBody,
    "method": "POST"
  };
  fetch(`${API_URL}/messages`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }

      return response.json();
    })
    .then((response) => {
      Notifications.show('The SMS has been successfully sent!');
      console.log(response);
    })
    .catch((error) => {
      try {
        error
          .clone()
          .json()
          .then((errorResponse) => {
            Notifications.show(`Failed response body: ${errorResponse.error}`)
          })
          .catch((parsingError) => {
            error
              .clone()
              .text()
              .then((errorResponse) => {
                Notifications.show(`Failed response body: ${errorResponse}`)
              })
          })
      } catch (err) {
        Notifications.show('An unexpected error has occurred!');
      }

      console.error(error);
    });
});