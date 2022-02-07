"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = checkAdmin;
//# sourceMappingURL=checkAdmin.js.map