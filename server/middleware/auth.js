import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization || req.headers['Authorization'];
    
    if (!tokenHeader) {
        return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
    }

    const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.split(' ')[1] : tokenHeader;

    try {
        const tokenSecret = 'mi_clave_secreta_super_segura'; 
const verificado = jwt.verify(token, tokenSecret);
        
        req.usuarioLogueado = verificado;
        
        next(); 
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};