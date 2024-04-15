# MusicPro

MusicPro es una aplicación de comercio electrónico para la compra de instrumentos musicales. Esta aplicación está construida con el framework Angular y el SDK IONIC. Utiliza APIs para obtener datos de los instrumentos y también integra una pasarela de pago con Transbank. Además, permite visualizar el stock de los productos según la tienda en cada región.

## Características

- Compra de instrumentos musicales
- Pasarela de pago con Transbank
- Visualización de stock de productos por tienda y región
-

## Requisitos

- Node.js
- Angular CLI
- IONIC SDK

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/TomGGB/MusicPro.git
```

2. Navega al directorio del proyecto

```bash
cd MusicPro
```

3. Instala las dependencias

```bash
npm install
```

4. Inicia la aplicacion

```bash
ionic serve
```

o

```bash
ng serve
```

La aplicación ahora debería estar corriendo en <http://localhost:4200>.

Uso
Para utilizar la aplicación, simplemente navega a <http://localhost:4200> en tu navegador.

## Servidor Proxy

Dentro de la raíz del proyecto, encontrará un archivo llamado `server.py`. Este archivo actúa como un servidor proxy para la pasarela de pago de Transbank.

El servidor proxy se encarga de las siguientes tareas:

- Recibe las solicitudes de transacción desde la aplicación.
- Crea una nueva transacción en Transbank con los datos recibidos.
- Devuelve el token y la URL de redirección a la aplicación.
- Recibe las solicitudes de confirmación de transacción desde la aplicación.
- Confirma la transacción en Transbank con el token recibido.
- Devuelve los datos de la transacción confirmada a la aplicación.

Para iniciar el servidor proxy, ejecute el siguiente comando en la terminal:

```bash
python server.py
```

Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para cualquier cambio o mejora que desees realizar.
