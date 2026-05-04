export async function attachManagerToRequest (req, res, next){
    req.products = productosDAO;
    next();
}