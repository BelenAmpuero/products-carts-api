# 🛒 BackEnd 1 · API de E-commerce

API REST de e-commerce para la gestión de **productos** y **carritos de compra**, desarrollada con Node.js, Express y MongoDB. Incluye operaciones CRUD completas, paginación, filtros y ordenamiento, además de vistas dinámicas con Handlebars para ver productos, categorías y carritos.

Proyecto final de **Back End I** (Coderhouse).

## ✨ Funcionalidades

- CRUD completo de productos
- Carritos de compra: crear, agregar productos, modificar cantidades, reemplazar el contenido y vaciar
- Alta de **varios productos a la vez** (`insertMany`)
- **Paginación, filtros por categoría y ordenamiento** por precio
- `populate` de Mongoose para devolver el detalle de cada producto dentro del carrito
- Persistencia con **MongoDB (Mongoose)** y también con **FileSystem** (archivos JSON) mediante DAOs
- Middlewares personalizados para validaciones
- Vistas con **Handlebars**: inicio, productos por categoría y carrito

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB Atlas y Mongoose
- Handlebars
- FileSystem (`fs/promises`)
- dotenv

## 📁 Estructura del proyecto

```
products-carts-api/
├── dao/
│   ├── FS/
│   │   ├── ProductsDaoFS.js   # Persistencia con archivos JSON
│   │   └── testFS.js          # Prueba de los métodos CRUD del DAO
│   └── ProductsDao.js
├── data/                      # products.json
├── middlewares.js/
│   ├── category.middlewares.js
│   └── products.middlewares.js
├── models/
│   ├── productModel.js
│   └── cartModel.js
├── public/                    # CSS e imágenes
├── routes/                    # /api/products y /api/carts
├── views/                     # Plantillas Handlebars
├── app.js                     # Configuración de Express, MongoDB y rutas
├── utils.js
├── .env
└── package.json
```

La aplicación evolucionó desde una persistencia inicial con FileSystem hacia una implementación con MongoDB y Mongoose, manteniendo una arquitectura modular que separa responsabilidades.

## 🚀 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/BelenAmpuero/BackEnd1.git
   cd BackEnd1
   ```
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3. Creá un archivo `.env` en la raíz:
   ```env
   PORT=8080
   MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
   PERSISTENCE=MONGO
   ```
   > Ajustá los nombres de las variables a los que uses en tu código.
4. Iniciá el servidor:
   ```bash
   node app.js
   ```
   Si todo sale bien, verás `Server running on port 8080` y `conectado a base de datos`.

> ⚠️ No subas tu archivo `.env` al repositorio: verificá que esté en el `.gitignore`.

## 📡 Endpoints

### Productos · `/api/products`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista productos con paginación, filtro y orden |
| GET | `/api/products/:pid` | Devuelve un producto por id |
| POST | `/api/products` | Crea un producto, o varios si se envía un array |
| PUT | `/api/products/:pid` | Actualiza campos de un producto |
| DELETE | `/api/products/:pid` | Elimina un producto |

**Filtros y orden:**

```
GET /api/products?query=deporte&sort=desc
```

La respuesta incluye los datos y la información de paginación:

```json
{
  "status": "success",
  "payload": [ ... ],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false
}
```

**Ejemplo de producto:**

```json
{
  "code": "SLK100",
  "title": "Slackline X",
  "description": "Cinta",
  "status": true,
  "price": 7000,
  "stock": 5,
  "category": "deporte",
  "thumbnails": []
}
```

### Carritos · `/api/carts`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/carts` | Crea un carrito vacío |
| GET | `/api/carts/:cid` | Devuelve el carrito con los productos completos (`populate`) |
| POST | `/api/carts/:cid/products/:pid` | Agrega un producto (si ya está, suma 1 a la cantidad) |
| PUT | `/api/carts/:cid/products/:pid` | Actualiza la cantidad de un producto (`{ "quantity": 5 }`) |
| PUT | `/api/carts/:cid` | Reemplaza todos los productos del carrito |
| DELETE | `/api/carts/:cid` | Vacía el carrito |

## 🖥️ Vistas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con los botones de categorías |
| `/products?category=deporte` | Productos filtrados por categoría (`accesorios`, `deporte`, `indumentaria`, `ropa`) |
| `/carts/:cid` | Vista del carrito con precio y cantidad de cada producto |

## 🧪 Cómo probarlo

Podés usar **Postman** o `curl`:

```bash
# Crear un producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Slackline Pro","description":"Cinta profesional","code":"SLK001","price":10000,"stock":5,"status":true,"category":"deporte"}'

# Listar productos de la categoría deporte, ordenados de mayor a menor
curl "http://localhost:8080/api/products?query=deporte&sort=desc"

# Crear un carrito y agregarle un producto
curl -X POST http://localhost:8080/api/carts
curl -X POST http://localhost:8080/api/carts/<cid>/products/<pid>
```

Para probar la persistencia con FileSystem:

```bash
node dao/FS/testFS.js
```

## 👩‍💻 Autora

**Belén Ampuero**
[LinkedIn](https://www.linkedin.com/in/belén-ampuero-625047308) · [GitHub](https://github.com/BelenAmpuero)
