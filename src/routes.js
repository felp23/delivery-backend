// const res = require('express/lib/response');

const router = require('express').Router();
const { Router } = require('express');
const multer = require('multer');

const upload = multer({ 
    dest: 'public/images/',
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

// IMPORT CONTROLLERS
const AdminController = require('./controllers/AdminController');
const UserController = require('./controllers/UserController');
const ImageController = require('./controllers/ImageController');
const EmailController = require('./controllers/EmailController');


// IMAGES
router.post('/image/upload-image',upload.single('imagem'), (req, res) => {
    console.log("AQUI", req);
    if (req.file) {    
        res.json({ filename: req.file.filename, error: false });
        return
    }
    // res.json({ nomeArquivo: req.file.filename });
    // res.send('Arquivo enviado com sucesso!');
});

// CRUD ADMIN
router.post('/user/add-admin',UserController.addUser);
router.post('/user/admins',UserController.getUsers);
router.post('/user/edit-admin',UserController.editUser);
router.post('/user/delete-admin',UserController.deleteUser);

// CRUD USER
router.post('/user/add-user',UserController.addUser);
router.post('/user/users',UserController.getUsers);
router.post('/user/edit-user',UserController.editUser);
router.post('/user/delete-user',UserController.deleteUser);

// AUTH
router.post('/auth/login',AdminController.loginAdmin);

// E-MAIL CONTACT
router.post('/contact/send-email',EmailController.sendEmailContact);

module.exports = router;