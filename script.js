
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
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      }
    }
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
