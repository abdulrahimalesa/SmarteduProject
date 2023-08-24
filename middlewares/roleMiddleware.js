module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) { // karslastirmak
            next();
        }else{
            return res.status(401).send('YOU CANT DO IT');
        }
    }
}