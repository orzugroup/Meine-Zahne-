const bookingForm = document.getElementById('bookingForm');
const ORZU_WEBHOOK_URL = 'https://www.orzux.com/api/webhooks/website-forms/e225364e4b89ee1d8089996b8fe3fd9dcf03d3fead53d0d6';

if (bookingForm) {
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const payload = new URLSearchParams({
      name: formData.get('name')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      service: formData.get('service')?.toString().trim() || '',
      date: formData.get('date')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || ''
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

      const name = payload.get('name') || 'Patient';
      const service = payload.get('service') || 'gewählte Leistung';
      window.alert(`Vielen Dank, ${name}! Ihre Anfrage für ${service} wurde erfolgreich gesendet.`);
      bookingForm.reset();
    } catch (error) {
      console.error('Orzu webhook error:', error);
      window.alert('Die Anfrage konnte nicht gesendet werden. Bitte kontaktieren Sie uns telefonisch.');
    }
  });
}
