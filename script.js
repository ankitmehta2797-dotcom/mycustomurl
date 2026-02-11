
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
  const locationBox = document.getElementById('location');

  function showReveal(forWhat){
    // Reset reveal area each time
    reveal.hidden = false;
    plan.hidden = true;
    locationBox.hidden = true;
    // Configure button and next step
    if (forWhat === 'plan'){
      revealBtn.textContent = 'tell me alreadyyy';
      revealBtn.onclick = () => { plan.hidden = false; plan.scrollIntoView({behavior:'smooth'}); };
    } else if (forWhat === 'location'){
      revealBtn.textContent = 'please dont kill me my ardhangani, last button promise';
      revealBtn.onclick = () => { locationBox.hidden = false; locationBox.scrollIntoView({behavior:'smooth'}); };
    }
  }

  if (form && result) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const choice = new FormData(form).get('answer');

      // Reset UI
      result.hidden = false; result.textContent = '';
      reveal.hidden = true; plan.hidden = true; locationBox.hidden = true;

      if (!choice) { result.textContent = 'Please choose an option before submitting.'; return; }
      if (choice === 'no')      { result.textContent = 'amazing choice, but you will still have to know haha'; }
      else if (choice === 'yes'){ result.textContent = "thought you'd select this - no excitment eh?"; }
      else if (choice === 'absolutely'){ showReveal('plan'); }
    });
  }

  // 30 No buttons
  const noButtonsWrap = document.getElementById('noButtons');
  const noResult = document.getElementById('noButtonsResult');
  if (noButtonsWrap && noResult) {
    const messages = [
      "Ouch… that wasn’t the button I expected.",
      "Better luck next time, champ!",
      "Try a different button—we believe in you.",
      "Sorry, wrong button. But nice try!",
      "Error 143: affection detected, recalibrating…",
      "Uhh… that button wasn’t even plugged in.",
      "Nope! But points for enthusiasm.",
      "Denied. Politely. With sparkles.",
      "Processing… processing… nope!",
      "Button malfunction? Or finger malfunction?",
      "Ahh! You scared the circuits!",
      "Incorrect button, but incredible confidence!",
      "Hmmm… that’s not how any of this works.",
      "Oopsie! That button needs a nap.",
      "Error 404: correct button not found.",
      "Nice click! Wrong outcome!",
      "The button says no, but with love.",
      "Try again… I dare you.",
      "That button hasn’t been updated since 2013.",
      "Uh-oh, I wasn’t ready—press again!",
      "Close… like, emotionally close, not technically close.",
      "Denied by the universe. Try again.",
      "My circuits blushed. Wrong button though.",
      "Almost! But also… not even close.",
      "This button is shy. Press a louder one.",
      "You pressed something, but I’m pretending not to notice.",
      "Oof—system flinched. Wrong input!",
      "If buttons had feelings, this one would be offended.",
      "Try again… maybe third, fourth, or 97th time’s the charm.",
      "Bonus round locked. Keep trying!"
    ];

    // Create 30 buttons
    for (let i = 1; i <= 30; i++){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn outline';
      b.textContent = 'No';
      b.dataset.index = String(i);
      noButtonsWrap.appendChild(b);
    }

    noButtonsWrap.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.matches('button.btn')){
        const idx = Number(target.dataset.index || '0');
        // Reset displays
        noResult.hidden = false; noResult.textContent = '';
        // hide any previous reveal areas
        reveal.hidden = true; plan.hidden = true; locationBox.hidden = true;
        // Special behavior for the 26th button
        if (idx === 26){
          // act like 100% yes logic but with different reveal button text and location popup
          noResult.hidden = true; // don't show error
          showReveal('location');
          return;
        }
        // For the rest, show the corresponding playful message
        // Note: messages array is 0-based; use (idx-1) but skip 26th special-case above
        const msg = messages[(idx-1) % messages.length];
        noResult.textContent = msg;
      }
    });
  }
});
