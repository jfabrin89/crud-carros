const bd = require('../config/bd.config')
const Marca = bd.marca

exports.buscarTudo = (req, res) => {
    Marca.findAll().then(marcas => {
        res.status(200).send({
            mensagem: 'Registro listado com sucesso!',
            data: marcas
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar',
            data: err
        })
    })
}

exports.buscarID = (req, res) => {
    Marca.findByPk(req.params.id).then(marcas => {
        res.status(200).send({
            mensagem: 'Registro encontrado com sucesso!',
            data: marcas
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar',
            data: err
        })
    })
}

exports.criar = (req, res) => {
    Marca.create({
        nome: req.body.nome,
        situacao: req.body.situacao
    }).then(marca => {
        res.status(200).send({
            mensagem: 'Registro salvo com sucesso!',
            data: marca
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar',
            data: err
        })
    })
}

exports.alterar = (req, res) => {
    Marca.update({
        nome: req.body.nome,
        situacao: req.body.situacao
    },
    {
        where: {id: req.params.id}
    }).then(marca => {
        res.status(200).send({
            mensagem: 'Registro alterado com sucesso',
            data: marca 
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar alterar',
            data: err
        })
    })
}

exports.excluir = (req, res) => {
    Marca.destroy({
        where: {id: req.params.id}
    }).then(marca => {
        res.status(200).status(200).send({
            mensagem: "Registro deletado com sucesso",
            data: marca 
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar deletar',
            data: err
        })
    })
}