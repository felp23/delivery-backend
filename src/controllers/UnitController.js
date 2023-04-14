const connection = require('../database/connection');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async addUnit (req, res) {
        const response = {...responseModel}

        const { 
            unitName, 
            unitPhone, 
            unitEmail, 
            unitAddressId,
            unitCompanyId,
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO unit VALUES (
                DEFAULT, 
                '${unitName}', 
                '${unitPhone}', 
                '${unitEmail}', 
                '${unitAddressId}', 
                '${unitCompanyId}', 
                NOW()
            )
        `)

        response.success = affectRows > 0;

        return res.json(response);
    },

    async editUnit(req, res) {
        const response = {...responseModel}

        const { 
            unitId,
            unitName,
            unitPhone,
            unitEmail
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE unit 
            SET unitName='${unitName}' , 
                unitPhone='${unitPhone}' , 
                unitEmail='${unitEmail}'
            WHERE unitId='${unitId}';
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getUnitsByCompany (req, res) {
        const response = {...responseModel}
        const { 
            companyId
        } = req.body;
        console.log('COMPANY ID: ', companyId);

        const [, data] = await connection.query(`
            SELECT * FROM unit WHERE unitCompanyId='${companyId}'
        `)

        return res.json(data);
    },

    async deleteUser (req, res) {
        const response = {...responseModel}

        const { 
            userId, 
        } = req.body;

        const [, data] = await connection.query(`
            DELETE FROM users WHERE userId='${userId}'
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