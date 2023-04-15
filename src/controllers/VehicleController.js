const connection = require('../database/connection');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async addVehicle (req, res) {
        const response = {...responseModel}

        const { 
            vehicleModel, 
            vehicleBrand, 
            vehicleLicense,
            vehicleDocument, 
            vehicleDriverId, 
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO vehicle VALUES (
                DEFAULT,
                '${vehicleModel}',
                '${vehicleBrand}',
                '${vehicleLicense}',
                '${vehicleDocument}',
                '${vehicleDriverId}',
                NOW()
            )
        `)

        response.success = affectRows > 0;

        return res.json(response);
    },

    async editVehicle(req, res) {
        const response = {...responseModel}

        const { 
            vehicleId,
            vehicleModel,
            vehicleBrand,
            vehicleLicense,
            vehicleDocument,
            vehicleDriverId
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE vehicle
            SET vehicleModel='${vehicleModel}', 
                vehicleBrand='${vehicleBrand}', 
                vehicleLicense='${vehicleLicense}', 
                vehicleDocument='${vehicleDocument}', 
                vehicleDriverId='${vehicleDriverId}'
            WHERE vehicleId='${vehicleId}';
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getVehiclesByDriver (req, res) {
        const response = {...responseModel}

        const { 
            driverId,
        } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM vehicle WHERE vehicleDriverId='${driverId}'
        `)

        return res.json(data);
    },

    async deleteVehicle (req, res) {
        const response = {...responseModel}

        const { 
            vehicleId, 
        } = req.body;

        const [, data] = await connection.query(`
            DELETE FROM vehicle WHERE vehicleId='${vehicleId}'
        `)

        response.success = true;

        return res.json(response);
    }, 

    async login (req, res) {
        console.log(req);
        const response = {...responseModel}

        const { userEmail, userPasscode } = req.body;

        const [, data]  = await connection.query(`
            SELECT * FROM users 
            WHERE userEmail='${userEmail}' AND userPasscode='${userPasscode}'
        `)

        console.log(data);
        if (data == 0) {
            return res.json(
                {
                    error: true, 
                    message:"Usuário ou senha inválidos"
                }
            );            
        } else {
            return res.json(
                {
                    error: false, 
                    user: data[0]
                }
            );           
        }
    }

}