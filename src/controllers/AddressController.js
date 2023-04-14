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
            addressZipCode,
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
                '${addressZipCode}', 
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
            addressId,
            addressName,
            addressStreet,
            addressNumber,
            addressNeighborhood,
            addressCity,
            addressComplement,
            addressZipCode,
            addressLat,
            addressLng
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE address 
            SET addressName='${addressName}', 
                addressStreet='${addressStreet}' , 
                addressNumber='${addressNumber}' , 
                addressNeighborhood='${addressNeighborhood}', 
                addressCity='${addressCity}',
                addressComplement='${addressComplement}',
                addressZipCode='${addressZipCode}',
                addressLat='${addressLat}',
                addressLng='${addressLng}'
            WHERE addressId='${addressId}'
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getAddressesById (req, res) {
        const response = {...responseModel}

        const { 
            addressId,
        } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM address WHERE addressId='${addressId}'
        `)

        response.success = true;
        response.address = data

        return res.json(response);
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