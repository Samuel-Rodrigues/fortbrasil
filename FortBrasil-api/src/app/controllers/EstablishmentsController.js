import * as Yup from 'yup';

import Establishment from '../models/Establishment';

class EstablishmentControlle {

  async index(req, res) {
    const establishments = await Establishment.findAll({
      attributes: ['id', 'name', 'street', 'number','burgh', 'city', 'latitude', 'longitude']
    })

    return res.status(200).json(establishments)

  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      city: Yup.string().required(),
      burgh: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algo deu errado' });
    }

    const establishmentsExist = await Establishment.findOne({ where: { name: req.body.name } });

    if (establishmentsExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um estabelecimento com esse nome' });
    }
    const { id, name, street,burgh, number, city, longitude, latitude } = await Establishment.create(req.body);

    return res.json({
      id,
      name,
      street,
      burgh,
      number,
      city,
      latitude,
      longitude, 
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      city: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { name} = req.body
      

    const establishment = await Establishment.findByPk(req.params.id);

  
    if (name && name === Establishment.findOne({ name: { name } })) {
      return res
        .status(400)
        .json({ error: 'Já existe um estabelecimento com esse nome' });
    }

    const { id, street, number, burgh, city, laditude, longidute } = await establishment.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      city,
      burgh,
      laditude, 
      longidute
    });
  }

  async delete(req, res){
    const schema = Yup.object().shape({
      id: Yup.number().required()
  })

  if (!(await schema.isValid(req.params))) {
      return res.status(401).json({ erro: 'Id não informado' })
  }

  const existEstablishment = await Establishment.findByPk(req.params.id)

  if (!existEstablishment) {
      return res.status(401).json({ erro: 'Não existe estabelecimento com o id informado' })
  }

  await Establishment.destroy({
      where: { id: req.params.id }
  }).then(deletedOwner => {
      res.json(deletedOwner);
    });
  }
}

export default new EstablishmentControlle();