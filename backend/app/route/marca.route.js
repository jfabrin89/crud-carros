module.exports = (server) => {
    const marcaController = require('../controller/marca.controller')

    server.get('/api/marca', marcaController.buscarTudo)
    server.get('/api/marca/:id', marcaController.buscarID)
    server.post('/api/marca', marcaController.criar)
    server.put('/api/marca/:id', marcaController.alterar)
    server.delete('/api/marca/:id', marcaController.excluir)
}