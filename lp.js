/*
  ===== לאן הלידים נשלחים =====
  כדי שהפניות יגיעו אליכם למייל, צרו טופס חינמי בשירות כמו Formspree (formspree.io)
  והדביקו כאן את כתובת ה-endpoint שתקבלו, למשל: "https://formspree.io/f/abcdwxyz"
  כל עוד השדה ריק, שליחת הטופס פותחת ווטסאפ עם פרטי הפנייה, כגיבוי.
*/
const FORM_ENDPOINT = "";
const WHATSAPP_NUMBER = "972549700096";

document.getElementById('yr').textContent = new Date().getFullYear();

document.querySelectorAll('.lead-form').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.company_site.value) return; // bot trap
    const name = form.name, phone = form.phone;
    const phoneOk = /^0?5\d[-\s]?\d{3}[-\s]?\d{4}$|^0\d{1,2}[-\s]?\d{7}$|^\+?972/.test(phone.value.replace(/\s/g,''));
    name.parentElement.classList.toggle('invalid', !name.value.trim());
    phone.parentElement.classList.toggle('invalid', !phoneOk);
    if (!name.value.trim() || !phoneOk) { (name.value.trim() ? phone : name).focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    delete data.company_site;
    data.page = location.href;
    const card = form.closest('.form-card');
    const btn = form.querySelector('button');
    btn.disabled = true; btn.textContent = 'שולח...';

    try {
      if (FORM_ENDPOINT) {
        const r = await fetch(FORM_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(data)});
        if (!r.ok) throw new Error();
      } else {
        const msg = `היי קליקינג, אשמח לפגישת ייעוץ.\nשם: ${data.name}\nטלפון: ${data.phone}` +
          (data.business ? `\nתחום: ${data.business}` : '') + (data.interest ? `\nמתעניין ב: ${data.interest}` : '');
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      }
      card.classList.add('sent');
      if (window.gtag) gtag('event', 'generate_lead');
      if (window.fbq) fbq('track', 'Lead');
    } catch {
      btn.disabled = false; btn.textContent = 'נסו שוב';
      alert('משהו השתבש בשליחה. אפשר להתקשר אלינו: 054-9700096');
    }
  });
});

// Reveal on scroll
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), {threshold:.12}) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Count-up stats
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const so = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target, to = +el.dataset.count, t0 = performance.now(), d = 1400;
  const tick = t => { const p = Math.min((t - t0) / d, 1), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
    el.textContent = v.toLocaleString('en-US') + (p === 1 && to >= 300 ? '+' : ''); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick); so.unobserve(el);
}), {threshold:.6}) : null;
if (so) document.querySelectorAll('[data-count]').forEach(el => so.observe(el));