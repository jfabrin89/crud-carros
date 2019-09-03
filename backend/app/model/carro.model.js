module.exports = (connection, Sequelize) => {
    const Carro = connection.define('carros', {
        nome: {
            type: Sequelize.STRING(150),
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        valor: {
            type: Sequelize.FLOAT(10,2),
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

    return Carro
}