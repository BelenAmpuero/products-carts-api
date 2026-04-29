export async function attachManagerToRequest (req, res, next){
    req.productos = productosDAO;
    next();
}