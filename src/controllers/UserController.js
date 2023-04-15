const connection = require('../database/connection');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async addUser (req, res) {
        const response = {...responseModel}

        const { 
            userFirstName, 
            userLastName, 
            userDocument, 
            userPhone,
            userEmail,
            userPasscode,
            userAddressId,
            userCompanyId,
            userUnitId,
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO user VALUES (
                DEFAULT, 
                '${userFirstName}', 
                '${userLastName}', 
                '${userDocument}', 
                '${userPhone}', 
                '${userEmail}', 
                '${userPasscode}', 
                '${userAddressId}', 
                '${userCompanyId}', 
                '${userUnitId}', 
                NOW()
            )
        `)

        response.success = affectRows > 0;

        return res.json(response);
    },

    async editUser(req, res) {
        const response = {...responseModel}

        const { 
            userId,
            userFirstName,
            userLastName,
            userDocument,
            userPhone,
            userEmail,
            userPasscode,
            userAddressId,
            userCompanyId,
            userUnitId
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE user 
            SET userFirstName='${userFirstName}', 
                userLastName='${userLastName}', 
                userDocument='${userDocument}', 
                userPhone='${userPhone}', 
                userEmail='${userEmail}' , 
                userPasscode='${userPasscode}', 
                userAddressId='${userAddressId}', 
                userCompanyId='${userCompanyId}', 
                userUnitId='${userUnitId}' 
            WHERE userId='${userId}';
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getUsersByCompany (req, res) {
        const response = {...responseModel}

        const { 
            companyId,
        } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM user WHERE userCompanyId='${companyId}'
        `)

        return res.json(data);
    },

    async deleteUser (req, res) {
        const response = {...responseModel}

        const { 
            userId, 
        } = req.body;

        const [, data] = await connection.query(`
            DELETE FROM user WHERE userId='${userId}'
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