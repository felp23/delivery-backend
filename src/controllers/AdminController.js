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
            userEmail, 
            userPhone,
            userBirthdate,
            userPasscode,
            userLevel,
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO users VALUES (
                DEFAULT, 
                '${userFirstName}', 
                '${userLastName}', 
                '${userEmail}', 
                '${userPhone}', 
                '${userBirthdate}', 
                '${userPasscode}', 
                '${userLevel}', 
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
            userEmail,
            userPhone,
            userBirthdate
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE users 
            SET userFirstName='${userFirstName}', 
                userLastName='${userLastName}' , 
                userEmail='${userEmail}' , 
                userPhone='${userPhone}' , 
                userBirthdate='${userBirthdate}' 
            WHERE userId='${userId}';
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getUsers (req, res) {
        const response = {...responseModel}

        const [, data] = await connection.query(`
            SELECT * FROM users
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
adminPasscode
        return res.json(response);
    }, 

    async loginAdmin (req, res) {
        console.log(req);
        const response = {...responseModel}

        const { 
            adminEmail, 
            adminPasscode
        } = req.body;

        const [, admin]  = await connection.query(`
            SELECT * FROM admin 
            WHERE adminEmail='${adminEmail}' AND adminPasscode='${adminPasscode}'
        `)

        const [, company]  = await connection.query(`
            SELECT * FROM company 
            WHERE companyId='${admin[0].adminCompanyId}'
        `)

        console.log('ADMIN ID: ', admin[0].adminCompanyId);
        if (admin == 0) {
            return res.json(
                {
                    error: true, 
                    message:"Falha na autenticação"
                }
            );            
        } else {
            return res.json(
                {
                    error: false, 
                    admin: admin[0],
                    company: company
                }
            );           
        }
    }

}