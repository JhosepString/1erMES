# 1 mes · Potona hermosa

Página dedicada: playlist visual interactiva del primer mes.

## Cómo verla

Abre `index.html` en el navegador, o desde la carpeta del proyecto:

```bash
npx --yes serve .
```

## Música dentro de la página

Sí: cada canción usa el **embed oficial de Spotify**. Al tocar un track, el reproductor aparece y se puede escuchar ahí mismo.

- Con cuenta de Spotify (gratis o Premium) en el navegador suele sonar la canción completa.
- Sin sesión, a veces solo hay preview o pide login.

## Agregar fotos después

1. Crea la carpeta `photos/`.
2. Guarda las imágenes (ej. `piscanos.jpg`).
3. En `app.js`, en el track correspondiente, descomenta y completa:

```js
photo: "photos/piscanos.jpg",
```

Si hay `photo`, se usa esa imagen en vez de la portada de Spotify.

## Canciones incluidas

| # | Canción | Artista |
|---|---------|---------|
| 1 | Piscanos | Bipoxx |
| 2 | \<3 | Jean Paul Medroa |
| 3 | Enigmática | Maldito Antisocial |
| 4 | Enamorado | Jean Paul Medroa |
| 5 | La diferencia | Enjambre |
