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
const AddressController = require('./controllers/AddressController');
const UnitController = require('./controllers/UnitController');
const ClientController = require('./controllers/ClientController');
const DriverController = require('./controllers/DriverController');
const VehicleController = require('./controllers/VehicleController');


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
// router.post('/admin/add-admin',AddressController.addUser);
// router.post('/admin/admins',AddressController.getUsers);
// router.post('/admin/edit-admin',AddressController.editUser);
// router.post('/admin/delete-admin',AddressController.deleteUser);

// CRUD ADDRESS
router.post('/address/add-address',AddressController.addAddress);
router.post('/address/address-by-id',AddressController.getAddressesById);
router.post('/address/edit-address',AddressController.editAddress);
// router.post('/address/delete-address',AddressController.deleteUser);

// CRUD UNIT
router.post('/unit/add-unit',UnitController.addUnit);
router.post('/unit/units-by-company',UnitController.getUnitsByCompany);
router.post('/unit/edit-unit',UnitController.editUnit);
router.post('/unit/delete-unit',UnitController.deleteUnit);

// CRUD USER
router.post('/user/add-user',UserController.addUser);
router.post('/user/users-by-company',UserController.getUsersByCompany);
router.post('/user/edit-user',UserController.editUser);
router.post('/user/delete-user',UserController.deleteUser);

// CRUD CLIENT
router.post('/client/add-client',ClientController.addClient);
router.post('/client/clients-by-company',ClientController.getClientsByCompany);
router.post('/client/edit-client',ClientController.editClient);
router.post('/client/delete-client',ClientController.deleteClient);

// CRUD DRIVER
router.post('/driver/add-driver',DriverController.addDriver);
router.post('/driver/drivers-by-company',DriverController.getDriversByCompany);
router.post('/driver/edit-driver',DriverController.editDriver);
router.post('/driver/delete-driver',DriverController.deleteDriver);

// CRUD VEHICLE
router.post('/vehicle/add-vehicle',VehicleController.addVehicle);
router.post('/vehicle/vehicles-by-driver',VehicleController.getVehiclesByDriver);
router.post('/vehicle/edit-vehicle',VehicleController.editVehicle);
router.post('/vehicle/delete-vehicle',VehicleController.deleteVehicle);

// AUTH
router.post('/auth/login',AdminController.loginAdmin);

// E-MAIL CONTACT
router.post('/contact/send-email',EmailController.sendEmailContact);

module.exports = router;