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

  // ---- form submit (static demo) ----
  document.getElementById('consulta-form').addEventListener('submit', function(e){
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.textContent = 'Solicitud recibida. Nos pondremos en contacto contigo muy pronto.';
    toast.classList.add('show');
    this.reset();
    setTimeout(()=> toast.classList.remove('show'), 4500);
  });
