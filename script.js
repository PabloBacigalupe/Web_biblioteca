//clave API NYTimes
const apiKey = 'fAJ5ieugILEYIlHc9MeUAoiMpQHXZPxc';
//obtiene categorias libros
const urlListas = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`;

//funcion para generar URL de libros de una categoría específica
const urlLibros = (listName) =>
  `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${apiKey}`;

const loader = document.getElementById('loader');
const container = document.getElementById('listas-container');

loader.style.display = 'block';
container.style.visibility = 'hidden';

// Simular carga LOADER
window.addEventListener('DOMContentLoaded', () => {
  console.log(loader)
  setTimeout(() => {
    loader.style.display = 'none';
    container.style.visibility = 'visible';
  }, 2000);
}); 
    

let listasOriginales = []; // variable para aplicar filtros



// Mostrar listas de categorías
async function obtenerListas() {
  try {
    loader.style.display = 'block';
    const res = await fetch(urlListas);
    const data = await res.json();
    const listas = data.results;

    listasOriginales = listas; // Guardamos las listas originales
    // Generar sugerencias para el datalist
    const datalist = document.getElementById('categorias');
    datalist.innerHTML = ''; // Limpia si ya existía

    listas.forEach(lista => {
    const option = document.createElement('option');
    option.value = lista.display_name;
    datalist.appendChild(option);
    });

    aplicarFiltros(); // Mostramos por primera vez  

    loader.style.display = 'none';
    container.innerHTML = ''; // Limpia contenido

    listas.forEach((lista) => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>${lista.display_name}</h3>
        <p><strong>Frecuencia:</strong> ${lista.updated}</p>
        <p><strong>Desde:</strong> ${lista.oldest_published_date}</p>
        <p><strong>Hasta:</strong> ${lista.newest_published_date}</p>
        <button data-list="${lista.list_name_encoded}">Ver libros</button>
      `;

      container.appendChild(card);
    });

    // Añadir evento a cada botón
    const botones = document.querySelectorAll('button[data-list]');
    botones.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const listaSeleccionada = e.target.dataset.list;
        mostrarLibros(listaSeleccionada);
      });
    });
  } catch (error) {
    loader.textContent = 'Error al cargar las listas.';
    console.error(error);
  }
}




//Funcion filtros

function aplicarFiltros() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const frecuencia = document.getElementById('filtro-frecuencia').value;
    const orden = document.getElementById('ordenar').value;
  
    let filtradas = [...listasOriginales];
  
    // Filtro por texto
    if (texto) {
      filtradas = filtradas.filter(lista =>
        lista.display_name.toLowerCase().includes(texto)
      );
    }
  
    // Filtro por frecuencia
    if (frecuencia) {
      filtradas = filtradas.filter(lista =>
        lista.updated.toLowerCase() === frecuencia
      );
    }
  
    // Orden
    if (orden === 'oldest-asc') {
      filtradas.sort((a, b) => new Date(a.oldest_published_date) - new Date(b.oldest_published_date));
    } else if (orden === 'oldest-desc') {
      filtradas.sort((a, b) => new Date(b.oldest_published_date) - new Date(a.oldest_published_date));
    } else if (orden === 'newest-asc') {
      filtradas.sort((a, b) => new Date(a.newest_published_date) - new Date(b.newest_published_date));
    } else if (orden === 'newest-desc') {
      filtradas.sort((a, b) => new Date(b.newest_published_date) - new Date(a.newest_published_date));
    } else if (orden === 'nombre-asc') {
      filtradas.sort((a, b) => a.display_name.localeCompare(b.display_name));
    } else if (orden === 'nombre-desc') {
      filtradas.sort((a, b) => b.display_name.localeCompare(a.display_name));
    }
  
    // Pintar las cards filtradas
    pintarListas(filtradas);
}


//Pintar listas
function pintarListas(listas) {
    container.innerHTML = '';
    listas.forEach((lista) => {
      const card = document.createElement('div');
      card.className = 'card';
  
      card.innerHTML = `
        <h3>${lista.display_name}</h3>
        <p><strong>Frecuencia:</strong> ${lista.updated}</p>
        <p><strong>Desde:</strong> ${lista.oldest_published_date}</p>
        <p><strong>Hasta:</strong> ${lista.newest_published_date}</p>
        <button data-list="${lista.list_name_encoded}">Ver libros</button>
      `;
  
      container.appendChild(card);
    });
  
    // Reactivar botones
    document.querySelectorAll('button[data-list]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const listaSeleccionada = e.target.dataset.list;
        mostrarLibros(listaSeleccionada);
      });
    });
}

// conectar filtros
document.getElementById('buscador').addEventListener('input', aplicarFiltros);
document.getElementById('filtro-frecuencia').addEventListener('change', aplicarFiltros);
document.getElementById('ordenar').addEventListener('change', aplicarFiltros);




// Mostrar libros de una categoría
async function mostrarLibros(listName) {
  try {
    loader.style.display = 'block';
    container.innerHTML = '';

    const res = await fetch(urlLibros(listName)); //llamada a la API
    const data = await res.json(); //convierte res de la API a json
    const libros = data.results.books; //extrae en array books de results

    loader.style.display = 'none'; //al cargar datos oculta loader
    container.innerHTML = `
      <button id="volver">← Volver a las listas</button>
      <h2>${data.results.display_name}</h2>
    `;

    libros.forEach((libro, index) => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>#${index + 1} - ${libro.title}</h3>
        <img src="${libro.book_image}" alt="Portada de ${libro.title}" style="width:100%; border-radius: 0.5rem;">
        <p><strong>Autor:</strong> ${libro.author}</p>
        <p><strong>Semanas en lista:</strong> ${libro.weeks_on_list}</p>
        <p>${libro.description || 'Sin descripción disponible.'}</p>
        <a href="${libro.amazon_product_url}" target="_blank">
          <button>Comprar en Amazon</button>
        </a>
      `;

      container.appendChild(card);
    });

    // Botón para volver atrás
    document.getElementById('volver').addEventListener('click', obtenerListas);
  } catch (error) {
    loader.textContent = 'Error al cargar los libros.';
    console.error(error);
  }
}

// Inicializa con las listas
obtenerListas();