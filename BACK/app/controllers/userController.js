const userDatamapper = require('../datamappers/userDatamapper');
const bcrypt = require('bcrypt');

const userController = {
    getAll: async(req, res) => {

        const users = await userDatamapper.findAll()

        res.status(200).json(users);


    },
    getOne: async (req, res) => {
        
        const id = req.params.id;

        const user = await userDatamapper.findOne(id);

        res.status(200).json(user);

    },
    update: async (req, res) => {
        
        const id = req.params.id;        

        await userDatamapper.update(id, req.body);

        res.status(200).json("L'utilisateur a bien été modifié");

    },
    delete: async (req, res) => {
        
        const id = req.params.id;

        await userDatamapper.delete(id);

        res.status(200).json("L'utilisateur a bien été supprimé");

    },
    register: async (req, res) => {
        
        const {firstname, lastname, email, password} = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = {
            firstname,
            lastname,
            email,
            password: hash
        }

        await userDatamapper.create(user);

        res.status(201).json("L'utilisateur a bien été créé");
    },
    login: async (req, res) => {
        
        const { email, password } = req.body;

        const user = await userDatamapper.findByEmail(email);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.status(200).json("Vous êtes connecté");
            } else {
                res.status(401).json("Mot de passe incorrect");
            }
        } else {
            res.status(404).json("Email incorrect");
        }
    },
}


module.exports = userController;