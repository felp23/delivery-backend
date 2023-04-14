const connection = require('../database/connection');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async addAddress (req, res) {
        const response = {...responseModel}

        const { 
            addressName, 
            addressStreet, 
            addressNumber, 
            addressNeighborhood,
            addressCity,
            addressComplement,
            addressLat,
            addressLng,
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO address VALUES (
                DEFAULT, 
                '${addressName}', 
                '${addressStreet}', 
                '${addressNumber}', 
                '${addressNeighborhood}', 
                '${addressCity}', 
                '${addressComplement}', 
                '${addressLat}', 
                '${addressLng}', 
                NOW()
            )
        `)

        const [, address] = await connection.query(`
            SELECT MAX(addressId) as addressId FROM address
        `);

        response.success = affectRows > 0;
        response.addressId = address[0].addressId;

        return res.json(response);
    },

    async editAddress(req, res) {
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

    async getAddresses (req, res) {
        const response = {...responseModel}

        const [, data] = await connection.query(`
            SELECT * FROM users
        `)

        return res.json(data);
    },

    async deleteAddress (req, res) {
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