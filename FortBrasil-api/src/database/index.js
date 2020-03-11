import Sequelize from 'sequelize'

import databaseConfig from '../config/database'

import Establishments from '../app/models/Establishment'
import User from '../app/models/User'


const models = [Establishments, User]

class DataBase {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
        models.map(model => model.init(this.connection))
    }
}


export default new DataBase()