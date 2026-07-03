# La última forma de amarte — Versión final ajustada

Esta carpeta contiene una web estática lista para subir a Netlify. No necesita npm, instalación ni build.

## Cómo probar

Abre `index.html` en tu navegador.

## Cómo subir a Netlify

1. Entra a Netlify.
2. Ve a **Add new site** > **Deploy manually**.
3. Arrastra la carpeta `despedida-yoangelis-v5` completa.
4. Espera a que Netlify genere el enlace.

También puedes subir el ZIP y descomprimirlo antes si Netlify no reconoce la carpeta correctamente.

## Archivos principales

- `index.html`: contenido y estructura completa.
- `styles.css`: diseño, animaciones y responsive.
- `app.js`: interacciones, música, fotos, carta final, modal y menú.
- `manifest.webmanifest`: permite que se instale como app/PWA en celular.
- `sw.js`: soporte básico offline cuando está publicada en HTTPS.
- `netlify.toml`: configuración segura y simple para Netlify.

## Dónde colocar la canción larga de fondo

Coloca tu canción larga aquí:

`assets/music/cancion.mp3`

Debe llamarse exactamente `cancion.mp3`.

La app intentará reproducirla automáticamente al abrir la página. Importante: algunos navegadores, sobre todo en celular, bloquean el audio automático con sonido. Por eso la app también deja visible el botón `Activar música si no empieza`.

## Audios de voz

En esta versión se quitaron los audios de voz para que solo suene una canción larga de fondo.

## Dónde colocar fotos

Reemplaza los espacios por imágenes JPG con estos nombres:

### Inicio
- `assets/photos/inicio/01.jpg`
- `assets/photos/inicio/02.jpg`
- `assets/photos/inicio/03.jpg`

### Detalles
- `assets/photos/detalles/01.jpg`
- `assets/photos/detalles/02.jpg`
- `assets/photos/detalles/03.jpg`

### Hito / papá Alcides
No coloques fotos aquí. Esta parte queda solo con texto, recuerdos interactivos y ambiente visual.

### Iglesia
- `assets/photos/iglesia/01.jpg`
- `assets/photos/iglesia/02.jpg`

### Color de rosa
- `assets/photos/color-de-rosa/01.jpg`
- `assets/photos/color-de-rosa/02.jpg`
- `assets/photos/color-de-rosa/03.jpg`
- `assets/photos/color-de-rosa/04.jpg`
- `assets/photos/color-de-rosa/05.jpg`
- `assets/photos/color-de-rosa/06.jpg`

### Cocina
- `assets/photos/cocina/01.jpg`
- `assets/photos/cocina/02.jpg`
- `assets/photos/cocina/03.jpg`

### Sueños
- `assets/photos/suenos/01.jpg`
- `assets/photos/suenos/02.jpg`
- `assets/photos/suenos/03.jpg`

### Independencia
- `assets/photos/independencia/01.jpg`
- `assets/photos/independencia/02.jpg`
- `assets/photos/independencia/03.jpg`

Si una foto no existe, la app mostrará un placeholder con la ruta exacta.

## Recomendación de tamaño de fotos

Para que cargue rápido en celular:

- JPG o WebP.
- Ancho recomendado: 1200px a 1600px.
- Peso ideal: menos de 400 KB por foto.

## Editar el texto

Puedes modificar el texto directamente en `index.html`. Busca el capítulo por número o título.

## Nota sobre la canción de YouTube

El botón externo de YouTube fue retirado. Esta versión usa solo una canción larga de fondo: `assets/music/cancion.mp3`.
