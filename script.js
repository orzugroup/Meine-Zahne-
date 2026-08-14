const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const name = formData.get('name')?.toString().trim() || 'Patient';
    const service = formData.get('service')?.toString().trim() || 'gewählte Leistung';
    const date = formData.get('date')?.toString().trim();

    const message = date
      ? `Vielen Dank, ${name}! Ihre Anfrage für ${service} am ${date} wurde erfolgreich gesendet. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.`
      : `Vielen Dank, ${name}! Ihre Anfrage für ${service} wurde erfolgreich gesendet. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.`;

    window.alert(message);
    bookingForm.reset();
  });
}
