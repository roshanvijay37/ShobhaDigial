// Contact form → Web3Forms AJAX submit with native validation + status. Re-bindable.
export function initContactForm(signal: AbortSignal) {
  const form = document.getElementById('enquiry-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener(
    'submit',
    async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const accessKey = (data.get('access_key') || '').toString();
      if (!accessKey) {
        status.textContent = 'The form is not configured yet — please reach us on WhatsApp.';
        status.className = 'text-sm text-maroon';
        return;
      }
      status.textContent = 'Sending…';
      status.className = 'text-sm text-muted';
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        const json = await res.json();
        if (json.success) {
          form.reset();
          status.textContent = 'Thank you! We will get back to you shortly.';
          status.className = 'text-sm font-medium text-green-700';
        } else {
          status.textContent = json.message || 'Something went wrong. Please try WhatsApp.';
          status.className = 'text-sm text-red-700';
        }
      } catch {
        status.textContent = 'Network error. Please try again or use WhatsApp.';
        status.className = 'text-sm text-red-700';
      }
    },
    { signal },
  );
}
