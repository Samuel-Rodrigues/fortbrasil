import * as Yup from 'yup';

import User from '../models/User';

class UserControlle {
    async index(req, res) {
        const users = await User.findAll({
            attributes: [
                'id', 'name', 'email'
            ]
        })
        return res.status(200).json(users)
    }

    async show(req, res) {

        const {userId} = req
        const users = await User.findByPk(userId,{
            attributes: [
                'id', 'name', 'email'
            ]
        })
        return res.status(200).json(users)
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .min(6)
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Algo deu errado' });
        }

        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res
                .status(400)
                .json({ error: 'Já existe um usuário com esse email' });
        }
        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email && email === user.email) {
            return res.status(400).json({ erro: 'O email é igual o atual' });
        }
        if (email && email === User.findOne({ email: { email } })) {
            return res
                .status(400)
                .json({ error: 'Já existe um usuário com esse email' });
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha errada' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
        });
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required()
        })

        if (!(await schema.isValid(req.params))) {
            return res.status(401).json({ erro: 'Id não informado' })
        }

        const existUser = await User.findByPk(req.params.id)

        if (!existUser) {
            return res.status(401).json({ erro: 'Não existe usuário com o id informado' })
        }

        await User.destroy({
            where: { id: req.params.id }
        }).then(deletedOwner => {
            res.json(deletedOwner);
          });

    }
}

export default new UserControlle();