module.exports = (server) => {
    const carroController = require('../controller/carro.controller')

    server.get('/api/carro', carroController.buscarTudo)
    server.get('/api/carro/:id', carroController.buscarId)
    server.post('/api/carro', carroController.criar)
    server.put('/api/carro/:id', carroController.alterar)
    server.delete('/api/carro/:id', carroController.excluir)
}