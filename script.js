window.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- Ripple effect on .btn (delegated) ---
  function addRipple(e){
    const target = e.target.closest('.btn');
    if(!target) return;
    const rect = target.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.className = 'ripple-circle';
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + 'px';
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    target.appendChild(circle);
    circle.addEventListener('animationend', ()=> circle.remove());
  }
  document.body.addEventListener('click', addRipple);

  // Build the 30-button grid with inline message containers
  const wrap = document.getElementById('noButtons');
  const reveal = document.getElementById('reveal');
  const revealBtn = document.getElementById('revealBtn');
  const locationBox = document.getElementById('location');
  const revealTitle = document.getElementById('revealTitle');

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

  if (wrap) {
    for (let i = 1; i <= 30; i++){
      const cell = document.createElement('div');
      cell.className = 'no-cell';

      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn outline ripple';
      b.textContent = 'No';
      b.dataset.index = String(i);

      const inline = document.createElement('div');
      inline.className = 'notice inline';
      inline.hidden = true;

      cell.appendChild(b);
      cell.appendChild(inline);
      wrap.appendChild(cell);
    }

    wrap.addEventListener('click', (e) => {
      const btn = e.target;
      if (!(btn instanceof HTMLElement)) return;
      if (!btn.matches('button.btn')) return;

      const idx = Number(btn.dataset.index || '0');
      const cell = btn.parentElement;
      const inline = cell?.querySelector('.notice.inline');

      // Reset global reveal area
      reveal.hidden = true; locationBox.hidden = true;

      // 26th is special
      if (idx === 26){
        if (inline){ inline.hidden = true; }
        reveal.hidden = false;
        revealTitle.textContent = 'either you got lucky - or you really really worked hard';
        revealBtn.textContent = 'please dont kill me my ardhangani, last button promise';
        revealBtn.onclick = () => { locationBox.hidden = false; locationBox.scrollIntoView({behavior:'smooth'}); };
        reveal.scrollIntoView({behavior:'smooth', block:'start'});
        return;
      }

      // Others: show playful message inline under the clicked button
      if (inline){
        const msg = messages[(idx-1) % messages.length];
        inline.textContent = msg;
        inline.hidden = false;
      }
    });
  }
});
