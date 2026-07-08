const legalContent = {
    aviso: {
      title: "Aviso legal",
      body: "<p>Contenido pendiente de redacción definitiva. Aquí se incluirán los datos identificativos del despacho (nombre o razón social, NIF, domicilio profesional, colegiación si procede) y las condiciones generales de uso del sitio web, conforme a la Ley de Servicios de la Sociedad de la Información (LSSI).</p>"
    },
    privacidad: {
      title: "Política de privacidad",
      body: "<p>Contenido pendiente de redacción definitiva conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD. Se detallará qué datos personales se recogen a través del formulario de contacto, con qué finalidad, el plazo de conservación y cómo ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad.</p>"
    },
    cookies: {
      title: "Política de cookies",
      body: "<p>Contenido pendiente de redacción definitiva. Se explicará qué tipo de cookies utiliza el sitio (técnicas, analíticas, de terceros), su finalidad y cómo el usuario puede aceptarlas, rechazarlas o configurarlas.</p>"
    },
    condiciones: {
      title: "Condiciones de uso",
      body: "<p>Contenido pendiente de redacción definitiva. Se detallarán las condiciones que rigen el uso del sitio web y de los servicios de consulta solicitados a través de él.</p>"
    }
  };

  function openModal(key){
    const data = legalContent[key];
    document.getElementById('modal-body').innerHTML = `<h3>${data.title}</h3>${data.body}`;
    document.getElementById('modal-overlay').classList.add('open');
  }
  function closeModal(){
    document.getElementById('modal-overlay').classList.remove('open');
  }
  document.getElementById('modal-overlay').addEventListener('click', (e)=>{
    if(e.target.id === 'modal-overlay') closeModal();
  });

  function showTab(name, btn){
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    btn.classList.add('active');
  }

  function toggleFaq(btn){
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  // ---- simple calendar mock ----
  const dow = ['L','M','X','J','V','S','D'];
  const calGrid = document.getElementById('cal-grid');
  const daysInMonth = 31; // July
  const startOffset = 2; // July 1 2026 is a Wednesday -> offset from Monday
  dow.forEach(d => {
    const el = document.createElement('div');
    el.className = 'dow'; el.textContent = d;
    calGrid.appendChild(el);
  });
  for(let i=0;i<startOffset;i++){
    calGrid.appendChild(document.createElement('div'));
  }
  const unavailable = [4,5,11,12,18,19,25,26]; // weekends roughly
  for(let d=1; d<=daysInMonth; d++){
    const el = document.createElement('button');
    el.className = 'cal-day';
    el.textContent = d;
    if(d < 9 || unavailable.includes(d)){
      el.classList.add('disabled');
      el.disabled = true;
    } else {
      el.classList.add('avail');
      el.onclick = () => selectDay(el, d);
    }
    calGrid.appendChild(el);
  }
  function selectDay(el, d){
    document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('slots').style.display = 'flex';
    document.getElementById('cal-confirm').textContent = `Horas disponibles para el ${d} de julio de 2026:`;
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
  }
  function selectSlot(el){
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('cal-confirm').textContent = `Cita seleccionada a las ${el.textContent}. Confirma tus datos en el formulario de contacto.`;
  }

  // ---- form submit (static demo) ----
  document.getElementById('consulta-form').addEventListener('submit', function(e){
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.textContent = 'Solicitud recibida. Nos pondremos en contacto contigo muy pronto.';
    toast.classList.add('show');
    this.reset();
    setTimeout(()=> toast.classList.remove('show'), 4500);
  });
