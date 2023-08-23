const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userID);

        if (!user) {
            // Kullanıcı bulunamadığında oturum açma sayfasına yönlendirin
            return res.redirect('/login');
        }

        // Kullanıcı bulundu, bir sonraki adıma devam edin
        next();
    } catch (error) {
        // Hata durumunda uygun bir hata işleme yapın
        res.status(500).json({
            status: 'error',
            message: 'Bir hata oluştu',
            error: error.message,
        });
    }
};
