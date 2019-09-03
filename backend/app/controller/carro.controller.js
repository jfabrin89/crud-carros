const bd = require('../config/bd.config')
const Carro = bd.carro

exports.buscarTudo = (req, res) => {
    Carro.findAll().then(carros => {
        res.status(200).send({
            mensagem: 'Registros listados com sucesso!',
            data: carros
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar',
            data: err
        })
    })
}

exports.buscarId = (req, res) => {
    Carro.findByPk(req.params.id).then(carro => {
        res.status(200).send({
            mensagem: 'Registro encontrado com sucesso!',
            data: carro
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar',
            data: err
        })
    })
}

exports.criar = (req, res) => {
    let valor = req.body.valor.replace('R$', '')
    valor = valor.replace('.', '')
    valor = valor.replace(',', '.')
    valor = parseFloat(valor)

    Carro.create({
        nome: req.body.nome,
        valor: valor,
        situacao: req.body.situacao,
        marcaId: req.body.marcaId,
        lojaId: req.body.lojaId
    }).then(carro => {
        res.status(200).send({
            mensagem: 'Registro salvo com sucesso!',
            data: carro
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar cadastrar',
            data: err
        })
    })
}

exports.alterar = (req, res) => {
    Carro.update({
        nome: req.body.nome,
        valor: req.body.valor,
        situacao: req.body.situacao,
        marcaId: req.body.marcaId,
        lojaId: req.body.lojaId
    },
    {
        where: {id: req.params.id}
    }).then(carro => {
        res.status(200).send({
            mensagem: 'Registro alterado com sucesso!',
            data: carro 
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar alterar',
            data: err
        })
    })
}

exports.excluir = (req, res) => {
    Carro.destroy({
        where: {id: req.params.id}
    }).then(carro => {
        res.status(200).send({
            mensagem: 'Registro excluido com sucesso!',
            data: carro
        })
    }).catch(err => {
        res.status(500).send({
            mensagem: 'Erro ao tentar deletar',
            data: err
        })
    })
}