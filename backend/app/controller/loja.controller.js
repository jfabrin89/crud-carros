const bd = require('../config/bd.config')
const Loja = bd.loja

exports.buscarTudo = (req, res) => {
    Loja.findAll().then(lojas => {
        res.status(200).send({
            mensagem: 'Registros listados com sucesso',
            data: lojas
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar listar',
            data: err
        })
    })
}

exports.buscarID = (req, res) => {
    Loja.findByPk(req.params.id).then(lojas => {
        res.status(200).send({
            mensagem: 'Registro encontrado com sucesso',
            data: lojas
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar',
            data: err
        })
    })
}

exports.criar = (req, res) => {
    Loja.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        situacao: req.body.situacao
    }).then(loja => {
        res.status(200).send({
            mensagem: 'Registro salvo com sucesso!',
            data: loja
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar salvar',
            data: err
        })
    })
}

exports.alterar = (req, res) => {
    Loja.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        situacao: req.body.situacao
    },
    {
        where: {id: req.params.id}
    }).then((loja) => {
        res.status(200).send({
            mensagem: 'Registro alterado com sucesso',
            data: loja
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar alterar',
            data: err
        })
    })
}

exports.excluir = (req, res) => {
    Loja.destroy({
        where: {id: req.params.id}
    }).then(loja => {
        res.status(200).send({
            mensagem: "Registro deletado com sucesso",
            data: loja
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar deletar',
            data: err
        })
    })
}