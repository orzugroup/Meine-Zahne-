const bookingForm = document.getElementById('bookingForm');
const ORZU_WEBHOOK_URL = 'https://www.orzux.com/api/webhooks/website-forms/e225364e4b89ee1d8089996b8fe3fd9dcf03d3fead53d0d6';

if (bookingForm) {
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const service = formData.get('service')?.toString().trim() || '';
    const date = formData.get('date')?.toString().trim() || '';
    const time = formData.get('time')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    if (!name || !email || !phone || !service || !date || !time) {
      window.alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    const payload = new URLSearchParams({
      name,
      email,
      phone,
      service,
      date,
      time,
      message
    });

    try {
      const response = await fetch(ORZU_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: payload.toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      window.alert(`Vielen Dank, ${name}! Ihr Termin für ${service} am ${date} um ${time} wurde erfolgreich gebucht.`);
      bookingForm.reset();
    } catch (error) {
      console.error('Orzu webhook error:', error);
      window.alert('Die Anfrage konnte nicht gesendet werden. Bitte senden Sie uns eine E-Mail oder rufen Sie uns an.');
    }
  });
}
