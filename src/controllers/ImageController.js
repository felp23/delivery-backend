const connection = require('../database/connection');
const multer = require('multer');

const responseModel = {
    success: false,
    data: [],
    error: []
}

// const publicationTitle = 'Titulo1'
// const publicationText = 'Texto1'
// const publicationLink = 'Link1'

module.exports = {
        // async uploadImage (req, res) {
        //     parser.single('image')(req, res, err => {
        //         if (err)
        //             res.status(500).json({ error: 1, payload: err });
        //         else {
        //             const image = {};
        //             image.id = req.filename;
        //             image.url = `/uploads/${image.id}`;
        //             res.status(200).json({ 
        //                 error: 0, 
        //                 payload: { 
        //                     id: image.id, 
        //                     url: image.url 
        //                 } 
        //             });
        //         }
        //     })
        // },
    async uploadImage (req, res) {
        console.log('TESTE');
        console.log('Request', req.image);
        console.log('Resposta', res);

        const response = {...responseModel}

        const storage = multer.diskStorage({
            destination: function (req, req, cb) {
                cb(null, './public/images')
            },
            filename: function (req, req, cb) {
                const uniqueSuffix = Date.now().toString() + '-' + Math.round(Math.random() * 1E9)
                cb(null, req.filename + '-' + uniqueSuffix)
            }
        })
        const imageFilename = cb.filename;

        response.success = true;
        response.data = imageFilename

        console.log("FILENAME: ", imageFilename);

        return res.json(response);
    },

    // async uploadImage(req, res) {
    //     const response = { ...responseModel };
    //     try {
    //         if (!req.files || req.files.length === 0) {
    //         response.success = false;
    //         response.message = 'Nenhuma imagem enviada';
    //         return res.json(response);
    //         }

    //         const imagesFilenames = [];

    //         // processar cada imagem
    //         for (const image of req.files) {
    //         const imageFilename = image.filename;
    //         console.log('Nome do arquivo de imagem:', imageFilename);

    //         // adicionar nome do arquivo ao array
    //         imagesFilenames.push(imageFilename);
    //         }

    //         response.success = true;
    //         response.data = imagesFilenames;
    //         return res.json(response);
    //     } catch (error) {
    //         console.log('Erro ao processar imagens', error);
    //         response.success = false;
    //         response.message = 'Erro ao processar imagens';
    //         return res.status(500).json(response);
    //     }
    // }
    
}