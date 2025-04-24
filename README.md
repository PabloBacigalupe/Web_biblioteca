
# 📚 Biblioteca NYT - Proyecto MERN

> **Una biblioteca online de los libros más vendidos según la API oficial del New York Times**.

![NYT Logo](https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg)

---

## 🌐 Descripción

Este proyecto consiste en una aplicación web que consume la [Books API del NYTimes](https://developer.nytimes.com/docs/books-product/1/overview) para mostrar las listas actualizadas de libros más vendidos por categoría.

Ofrece un **dashboard interactivo** con filtros, vistas detalladas por libro, búsquedas y enlaces de compra en Amazon. Todo el frontend está construido sin frameworks externos para fortalecer el aprendizaje de JavaScript puro (ES6+), manipulación del DOM y asincronía.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3 (Mobile First), JavaScript ES6
- **Backend (Fase futura)**: Node.js, Express
- **Stack**: MERN (proyección futura con MongoDB y React)
- **Testing y DevOps**: En preparación
- **APIs externas**: NYTimes Books API
- **Control de versiones**: Git + GitHub (gestión por ramas)

---

## 📋 Requisitos del proyecto

- ✅ Manipulación dinámica del DOM
- ✅ Manejo de ES6
- ✅ Programación asincrónica con `fetch`
- ✅ Diseño responsive (mobile first)
- ✅ Código limpio y organizado por módulos
- ✅ Gestión del proyecto desde GitHub (con ramas)
- ✅ Semántica HTML5
- 🚫 Sin frameworks ni librerías externas (en lo posible)

---

## 💡 Extras opcionales

- [ ] Uso de otras APIs complementarias
- [ ] Guardado de favoritos con Local Storage
- [ ] Firebase para login y almacenamiento
- [ ] Conversión en PWA (Progressive Web App)

---

## 🧪 Funcionalidades implementadas

### Vista principal (Dashboard de categorías)
- ✅ Animación de carga
- ✅ Listado completo de categorías con:
  - Nombre completo
  - Fecha del libro más antiguo
  - Fecha del libro más reciente
  - Frecuencia de actualización
  - Link para ver libros de la lista

### Vista de libros por categoría
- ✅ Vista detallada al hacer clic en una lista
- ✅ Botón para volver atrás
- ✅ Orden oficial por posición
- ✅ Por cada libro:
  - Carátula
  - Semanas en lista
  - Descripción
  - Título y posición (#1, #2…)
  - Link de compra en Amazon (nueva pestaña)

---

## 🧰 Filtros y búsquedas

### En la vista de categorías
- [ ] Filtro por tipo (weekly/monthly)
- [ ] Buscador por nombre de categoría (sugerencias)
- [ ] Ordenar por:
  - Fecha más antigua (`oldest_published_date`)
  - Fecha más reciente (`newest_published_date`)
  - Nombre A-Z / Z-A

### En la vista de libros
- [ ] Búsqueda por título
- [ ] Búsqueda por autor
- [ ] Orden por autor o título (A-Z / Z-A)
- [ ] Paginación (5 libros por página)

---

## 🚀 Cómo ejecutar el proyecto

```bash
git clone https://github.com/tu_usuario/biblioteca-nyt.git
cd biblioteca-nyt
open index.html