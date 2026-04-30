const products = [
  {
    title: "Remera Slackline Pro",
    description: "Remera elástica ideal para movimientos de slackline",
    code: "SLK001",
    price: 25,
    status: true,
    stock: 50,
    category: "indumentaria",
    thumbnails: ["img1.jpg"]
  },
  {
    title: "Pantalón Flex Grip",
    description: "Pantalón resistente con refuerzos en zonas clave",
    code: "SLK002",
    price: 60,
    status: true,
    stock: 30,
    category: "indumentaria",
    thumbnails: ["img2.jpg"]
  },
  {
    title: "Zapatillas Balance Pro",
    description: "Zapatillas livianas para mejor equilibrio",
    code: "SLK003",
    price: 120,
    status: true,
    stock: 20,
    category: "calzado",
    thumbnails: ["img3.jpg"]
  },
  {
    title: "Kit Slackline Básico",
    description: "Kit completo para principiantes",
    code: "SLK004",
    price: 80,
    status: true,
    stock: 15,
    category: "equipamiento",
    thumbnails: ["img4.jpg"]
  },
  {
    title: "Cinta Slackline Pro",
    description: "Cinta de alta resistencia para profesionales",
    code: "SLK005",
    price: 150,
    status: true,
    stock: 10,
    category: "equipamiento",
    thumbnails: ["img5.jpg"]
  },
  {
    title: "Guantes Grip",
    description: "Guantes con agarre antideslizante",
    code: "SLK006",
    price: 18,
    status: true,
    stock: 40,
    category: "accesorios",
    thumbnails: ["img6.jpg"]
  },
  {
    title: "Mochila Outdoor",
    description: "Mochila resistente para transportar equipo",
    code: "SLK007",
    price: 70,
    status: true,
    stock: 25,
    category: "accesorios",
    thumbnails: ["img7.jpg"]
  },
  {
    title: "Short Deportivo",
    description: "Short cómodo para entrenamiento",
    code: "SLK008",
    price: 35,
    status: true,
    stock: 60,
    category: "indumentaria",
    thumbnails: ["img8.jpg"]
  },
  {
    title: "Sudadera Técnica",
    description: "Sudadera térmica para climas fríos",
    code: "SLK009",
    price: 55,
    status: true,
    stock: 35,
    category: "indumentaria",
    thumbnails: ["img9.jpg"]
  },
  {
    title: "Gorra Deportiva",
    description: "Gorra liviana y transpirable",
    code: "SLK010",
    price: 15,
    status: true,
    stock: 80,
    category: "accesorios",
    thumbnails: ["img10.jpg"]
  },
  {
    title: "Botella Térmica",
    description: "Botella que mantiene la temperatura",
    code: "SLK011",
    price: 22,
    status: true,
    stock: 45,
    category: "accesorios",
    thumbnails: ["img11.jpg"]
  },
  {
    title: "Cinturón de Seguridad Slackline",
    description: "Sistema de seguridad para prácticas avanzadas",
    code: "SLK012",
    price: 95,
    status: true,
    stock: 12,
    category: "equipamiento",
    thumbnails: ["img12.jpg"]
  },
  {
    title: "Medias Antideslizantes",
    description: "Medias con grip para mejor estabilidad",
    code: "SLK013",
    price: 12,
    status: true,
    stock: 70,
    category: "indumentaria",
    thumbnails: ["img13.jpg"]
  },
  {
    title: "Rodillera Protectora",
    description: "Rodillera para evitar lesiones",
    code: "SLK014",
    price: 20,
    status: true,
    stock: 50,
    category: "accesorios",
    thumbnails: ["img14.jpg"]
  },
  {
    title: "Kit Reparación Slackline",
    description: "Herramientas básicas para mantenimiento",
    code: "SLK015",
    price: 30,
    status: true,
    stock: 18,
    category: "equipamiento",
    thumbnails: ["img15.jpg"]
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

