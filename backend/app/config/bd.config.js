const Sequelize = require('sequelize')
const acesso = require('./bd.acesso')

const connection = new Sequelize(acesso.database, acesso.username, acesso.password, {
    host: acesso.host,
    dialect: acesso.dialect
})

const bd = {}
bd.Sequelize = Sequelize
bd.connection = connection

bd.carro = require('../model/carro.model')(connection, Sequelize)
bd.loja = require('../model/loja.model')(connection, Sequelize)
bd.marca = require('../model/marca.model')(connection, Sequelize)

bd.carro.belongsTo(bd.marca)
bd.carro.belongsTo(bd.loja)

module.exports = bd