const checkAdmin = [
    
    (req, res, next) => {
        if (req.user.role === 'admin') {
            next();
        }
        else {
            res.status(403).json({ error: "You are not authorized to access this resource" });
        }
      },
];

export default checkAdmin;

