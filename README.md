# Ritmo

App personal en español: calorías y proteína, récords del gym (kg y repeticiones), minutos de cardio y horas de sueño. Panel diario, fechas anteriores, historial, edición, eliminación y objetivos configurables. Sin dependencias de producción ni servicios externos de analítica.

## Desarrollo

Node.js 24 y Python 3. `npm test` ejecuta las pruebas. `npm run dev` sirve `web/` en el puerto 4173. No requiere instalación de paquetes.

## GitHub Pages

La acción `.github/workflows/pages.yml` prueba y publica únicamente `web/` al subir a `main`. En Settings → Pages selecciona GitHub Actions si la habilitación automática requiere permisos de administrador. URL prevista: https://abpalomeque.github.io/deficitcalorico/

## Persistencia

Los cambios se guardan inmediatamente en localStorage. «Conectar GitHub» permite leer y escribir `data/tracker.json` en `main` usando la API Contents. Crea un fine-grained personal access token limitado a este repositorio con Contents: Read and write. Introdúcelo únicamente en la app: permanece en memoria y se pierde al cerrar o recargar. Nunca se guarda en localStorage, código ni commits. Después de conectar, cada edición intenta sincronizar automáticamente. El estado indica si solo existe una copia local o está sincronizada.

En otro dispositivo, conecta GitHub antes de registrar datos para descargar el historial. Si hay cambios incompatibles en dos dispositivos se conserva la copia local y no se sobrescribe la remota. Exporta los cambios pendientes antes de usar «Cargar desde GitHub»; luego vuelve a registrar los cambios necesarios. Una conexión sin registros remotos crea el archivo al guardar el primer cambio. Con la página abierta, vuelve a conectar para refrescar o reintentar sincronización.

**GitHub Pages no hace privada una app.** Cualquier persona con acceso al repositorio puede leer los registros y su historial Git. En un repositorio público, los datos serán públicos aunque el enlace no se comparta. El artefacto Pages no incluye `data/`, pero eso no protege un repositorio público. No guardes información que quieras mantener privada en un repositorio público. Los visitantes no pueden escribir sin un token autorizado.

Exportar descarga una copia JSON. Los objetivos iniciales son valores editables, no recomendaciones médicas. Dormir se asigna a la fecha seleccionada; registra el descanso nocturno en la fecha en que despiertas. Los PR muestran el mayor peso por ejercicio; en empates, las mayores repeticiones.
