const productos = [
  {
    status: true,
    id: 1,
    nombre: "Cartera Urbana Negra",
    categoria: "carteras",
    status: true,
    precio: 45000,
    stock: 12,
    material: "cuero vacuno",
    descripcion: "Cartera de cuero negro con cierre metálico y correa regulable"
  },
  {
    status: true,
    id: 2,
    nombre: "Cartera Marrón Clásica",
    categoria: "carteras",
    precio: 52000,
    stock: 8,
    material: "cuero genuino",
    descripcion: "Diseño clásico con múltiples compartimentos internos"
  },
  {
    status: true,
    id: 3,
    nombre: "Cinto Negro Hebilla Acero",
    categoria: "cintos",
    precio: 18000,
    stock: 20,
    material: "cuero vacuno",
    descripcion: "Cinto resistente con hebilla de acero inoxidable"
  },
  {
    status: true,
    id: 4,
    nombre: "Cinto Marrón Vintage",
    categoria: "cintos",
    precio: 20000,
    stock: 15,
    material: "cuero envejecido",
    descripcion: "Estilo vintage ideal para uso diario"
  },
  {
    status: true,
    id: 5,
    nombre: "Billetera Compacta Negra",
    categoria: "billeteras",
    precio: 15000,
    stock: 25,
    material: "cuero genuino",
    descripcion: "Billetera pequeña con espacio para tarjetas y billetes"
  },
  {
    status: true,
    id: 6,
    nombre: "Billetera Marrón Premium",
    categoria: "billeteras",
    precio: 22000,
    stock: 10,
    material: "cuero vacuno",
    descripcion: "Billetera amplia con múltiples divisiones"
  },
  {
    status: true,
    id: 7,
    nombre: "Campera de Cuero Negra",
    categoria: "camperas",
    precio: 120000,
    stock: 5,
    material: "cuero vacuno",
    descripcion: "Campera clásica estilo biker con cierre frontal"
  },
  {
    status: true,
    id: 8,
    nombre: "Campera Marrón Estilo Vintage",
    categoria: "camperas",
    precio: 135000,
    stock: 3,
    material: "cuero envejecido",
    descripcion: "Campera con acabado vintage y detalles artesanales"
  }
];

const productosDAO = {
    getAll: () => productos,
    getById: (id) => productos.find (p => p.id === id),

     createProduct: (nuevoProducto) => {
    productos.push(nuevoProducto);
    return nuevoProducto;
  },

};

export default productosDAO

