const express = require('express')
const bodyParser = require('body-parser')

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
    next()
})

const bd = require('./app/config/bd.config')

bd.connection.sync({force: false}).then(() => {
    console.log('Conexão de banco realizada com sucesso')
    console.log('Para recriar/atualizar as tabelas ativar a opção force: {force: true}')
})

require('./app/route/marca.route')(server)
require('./app/route/carro.route')(server)
require('./app/route/loja.route')(server)

server.listen(3000, () => {
    console.log('Servidor online em http://localhost:3000')
    console.log('Para encerrar servidor: CTRL+C')
})