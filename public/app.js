const API_URL = '/api/productos';

async function cargarProductos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const contenedor = document.getElementById('product-list');
    contenedor.innerHTML = '';

    data.productos.forEach((producto) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'product-card';
      tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <div class="content">
          <span class="product-tag">${producto.categoria}</span>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <div class="product-meta">
            <span>${producto.color}</span>
            <span>${producto.stock} disponibles</span>
          </div>
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error('Error al cargar productos', error);
    document.getElementById('product-list').innerHTML = '<p>No se pudieron cargar los productos.</p>';
  }
}

async function enviarConsulta(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const estado = document.getElementById('form-status');
  const datos = Object.fromEntries(new FormData(formulario));

  try {
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    const resultado = await response.json();
    estado.textContent = resultado.message;
    estado.style.color = resultado.success ? '#86efac' : '#fca5a5';

    if (resultado.success) {
      formulario.reset();
    }
  } catch (error) {
    estado.textContent = 'No se pudo enviar la consulta. Intentalo nuevamente.';
    estado.style.color = '#fca5a5';
  }
}

cargarProductos();

document.getElementById('contact-form').addEventListener('submit', enviarConsulta);
