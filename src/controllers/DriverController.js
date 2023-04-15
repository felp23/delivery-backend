const connection = require('../database/connection');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async addDriver (req, res) {
        const response = {...responseModel}

        const { 
            driverName, 
            driverDocument, 
            driverBirthdate,
            driverPhone, 
            driverPasscode, 
            driverVehicleId,
            driverCompanyId,
            driverUnitId,
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO driver VALUES (
                DEFAULT,
                '${driverName}',
                '${driverDocument}',
                '${driverBirthdate}',
                '${driverPhone}',
                '${driverPasscode}',
                '${driverVehicleId}',
                '${driverCompanyId}',
                '${driverUnitId}',
                NOW()
            )
        `)

        response.success = affectRows > 0;

        return res.json(response);
    },

    async editDriver(req, res) {
        const response = {...responseModel}

        const { 
            driverId,
            driverName,
            driverDocument,
            driverBirthdate,
            driverPhone,
            driverPasscode,
            driverVehicleId,
            driverCompanyId,
            driverUnitId
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE driver 
            SET driverName='${driverName}', 
                driverDocument='${driverDocument}', 
                driverBirthdate='${driverBirthdate}', 
                driverPhone='${driverPhone}', 
                driverPasscode='${driverPasscode}', 
                driverVehicleId='${driverVehicleId}', 
                driverCompanyId='${driverCompanyId}' , 
                driverUnitId='${driverUnitId}' 
            WHERE driverId='${driverId}';
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getDriversByCompany (req, res) {
        const response = {...responseModel}

        const { 
            companyId,
        } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM driver WHERE driverCompanyId='${companyId}'
        `)

        return res.json(data);
    },

    async deleteDriver (req, res) {
        const response = {...responseModel}

        const { 
            driverId, 
        } = req.body;

        const [, data] = await connection.query(`
            DELETE FROM driver WHERE driverId='${driverId}'
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