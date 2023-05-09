const userDatamapper = require('../datamappers/userDatamapper');
const bcrypt = require('bcrypt');
const token = require('../utils/auth')

const userController = {
    getAll: async(req, res) => {

        const users = await userDatamapper.findAll()

        if(users instanceof Error){
            next(users)
        }
        res.status(200).json(users);
    },

    getOne: async (req, res) => {
        
        const id = req.params.id;
        const user = await userDatamapper.findOne(id);

        if (user instanceof Error) {
            next(user)
        }
        res.status(200).json(user);
    },

    update: async (req, res) => {
        
        const id = req.params.id;        
        const update = await userDatamapper.update(id, req.body);

        if (update instanceof Error) {
            next(update)
        }
        res.status(200).json("L'utilisateur a bien été modifié");

    },

    destroy: async (req, res) => {
        
        const id = req.params.id;
        const destroy = await userDatamapper.destroy(id);

        if (destroy instanceof Error) {
            next(destroy)
        }
        res.status(200).json("L'utilisateur a bien été supprimé");

    },

    register: async (req, res) => {
        
        const {firstname, lastname, email, password} = req.body;
        const hash = await bcrypt.hash(password, 10);

        if (hash instanceof Error) {
            next(hash)
        }
        const user = {
            firstname,
            lastname,
            email,
            password: hash
        }
        const create = await userDatamapper.create(user);

        if (create instanceof Error) {
            next(create)
        }
        res.status(201).json("L'utilisateur a bien été créé");
    },

    login: async (req, res, next) => {
        
        const login = await token(req, res, next, req.body);
        
        if (login instanceof Error) {
            next(login)
        }       
    },
}

module.exports = userController;