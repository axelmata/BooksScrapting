# Proyecto: Scraping de Libros

## Descripción
Este proyecto es una prueba de concepto para scrapear libros desde **Books to Scrape**, guardar la información en un archivo **JSON** y mostrarla en un frontend interactivo con **Next.js** y **React**.  
Se incluyen funcionalidades de **ordenamiento** y **refresco dinámico** mediante un botón.

## Tecnologías
- Next.js 15 (App Router, React 18)  
- TypeScript  
- React y Hooks  
- Tailwind CSS  
- Axios  
- Cheerio  
- Node.js (`fs` y `path`)  

## Arquitectura
### API Route `/api/books`
- **POST**: Realiza el scraping de los libros y genera `data.json` en la raíz del proyecto.

### Frontend
- **Componente `BooksTable.tsx`**:
  - Renderiza los libros desde `data.json`.  
  - Permite ordenar por **título** o **precio**.  
  - Botón **Refrescar tabla** para recargar datos.

## Flujo de trabajo
1. Presionar el botón de scraping (o hacer POST a `/api/books`) para generar `data.json`.  
2. Los datos se almacenan en JSON local (`data/data.json` o `data.json` en la raíz).  
3. La tabla del frontend lee desde este JSON y muestra:
   - Título  
   - Precio  
   - Autor (si no está disponible, se indica `"N/A"`)

## Uso
### Instalar dependencias
```bash
npm install

npm run dev 
```

### Iniciar el scripting desde el boton Cargar libros

