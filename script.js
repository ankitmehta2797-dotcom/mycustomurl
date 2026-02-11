
window.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Friday poll logic (NO storage)
  const form = document.getElementById('fridayForm');
  const result = document.getElementById('fridayResult');
  const reveal = document.getElementById('fridayReveal');
  const revealBtn = document.getElementById('revealBtn');
  const plan = document.getElementById('plan');

  if (form && result) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const choice = new FormData(form).get('answer');

      // Reset UI
      result.hidden = false; result.textContent = '';
      reveal.hidden = true; if (plan) plan.hidden = true;

      if (!choice) { result.textContent = 'Please choose an option before submitting.'; return; }
      if (choice === 'no')      { result.textContent = 'amazing choice, but you will still have to know haha'; }
      else if (choice === 'yes'){ result.textContent = "thought you'd select this - no excitment eh?"; }
      else if (choice === 'absolutely'){ reveal.hidden = false; }
    });
  }

  if (revealBtn && plan) {
    revealBtn.addEventListener('click', () => {
      plan.hidden = false;
      plan.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
