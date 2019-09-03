module.exports = (server) => {
    const lojaController = require('../controller/loja.controller')

    server.get('/api/loja', lojaController.buscarTudo)
    server.get('/api/loja/:id', lojaController.buscarID)
    server.post('/api/loja', lojaController.criar)
    server.put('/api/loja/:id', lojaController.alterar)
    server.delete('/api/loja/:id', lojaController.excluir)
}