import Sequelize, { Model } from 'sequelize'

class Establishment extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      street: Sequelize.STRING,
      number: Sequelize.INTEGER,
      city: Sequelize.STRING,
      burgh: Sequelize.STRING,
      latitude: Sequelize.STRING,
      longitude: Sequelize.STRING
    },
      {
        sequelize
      })
  }
}

export default Establishment