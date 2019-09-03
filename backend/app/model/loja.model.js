module.exports = (connection, Sequelize) => {
    const Loja = connection.define('lojas', {
        nome: {
            type: Sequelize.STRING(150),
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        situacao: {
            type: Sequelize.STRING(1),
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        }
    })

    return Loja
}
