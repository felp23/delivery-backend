const connection = require('../database/connection');

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async addClient (req, res) {
        const response = {...responseModel}

        const { 
            clientFirstName, 
            clientLastName, 
            clientDocument, 
            clientBirthdate,
            clientEmail,
            clientPhone,
            clientPasscode,
            clientAddressesId,
            clientCompanyId,
            clientUnitId,
        } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO client VALUES (
                DEFAULT, 
                '${clientFirstName}', 
                '${clientLastName}', 
                '${clientDocument}', 
                '${clientBirthdate}', 
                '${clientEmail}', 
                '${clientPhone}', 
                '${clientPasscode}', 
                '${clientAddressesId}',
                '${clientCompanyId}', 
                '${clientUnitId}',
                NOW()
            )
        `)

        response.success = affectRows > 0;

        return res.json(response);
    },

    async editClient(req, res) {
        const response = {...responseModel}

        const { 
            clientId,
            clientFirstName,
            clientLastName,
            clientDocument,
            clientBirthdate,
            clientEmail,
            clientPhone,
            clientPasscode,
            clientAddressesId,
            clientCompanyId,
            clientUnitId
        } = req.body;

        const [, data] = await connection.query(`
            UPDATE client 
            SET clientFirstName='${clientFirstName}', 
                clientLastName='${clientLastName}', 
                clientDocument='${clientDocument}', 
                clientBirthdate='${clientBirthdate}', 
                clientEmail='${clientEmail}', 
                clientPhone='${clientPhone}', 
                clientPasscode='${clientPasscode}', 
                clientAddressesId='${clientAddressesId}', 
                clientCompanyId='${clientCompanyId}', 
                clientUnitId='${clientUnitId}' 
            WHERE clientId='${clientId}'
        `)

        response.success = true;
        response.data = data

        return res.json(response);
    },

    async getClientsByCompany (req, res) {
        const response = {...responseModel}

        const { 
            companyId,
        } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM users WHERE clientCompanyId='${companyId}'
        `)

        return res.json(data);
    },

    async deleteClient (req, res) {
        const response = {...responseModel}

        const { 
            clientId, 
        } = req.body;

        const [, data] = await connection.query(`
            DELETE FROM client WHERE clientId='${clientId}'
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