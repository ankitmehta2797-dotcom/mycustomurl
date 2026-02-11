
// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('primaryNav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll for anchor links
for (const a of document.querySelectorAll('a[href^="#"]')){
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if (id && id.length>1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
        nav?.classList?.remove('open');
        toggle?.setAttribute('aria-expanded','false');
      }
    }
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Friday poll logic (no storage)
(function(){
  const form = document.getElementById('fridayForm');
  const result = document.getElementById('fridayResult');
  const reveal = document.getElementById('fridayReveal');
  const revealBtn = document.getElementById('revealBtn');
  const revealMsg = document.getElementById('revealMsg');
  if(!form || !result) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Determine selected answer
    const fd = new FormData(form);
    const choice = fd.get('answer');

    // Reset states
    result.hidden = false;
    reveal.hidden = true;
    revealMsg.hidden = true;

    if(!choice){
      result.textContent = 'Please choose an option before submitting.';
      return;
    }

    if (choice === 'no'){
      result.textContent = 'amazing choice, but you will still have to know haha';
    } else if (choice === 'yes'){
      result.textContent = "thought you'd select this - no excitment eh?";
    } else if (choice === 'absolutely'){
      result.textContent = '';
      reveal.hidden = false; // show extra option area
    }
  });

  revealBtn?.addEventListener('click', ()=>{
    // Simple reveal action for now
    revealMsg.hidden = false;
  });
})();
