module.exports = (connection, Sequelize) => {
    const Marca = connection.define('marcas', {
        nome: {
            type: Sequelize.STRING(150),
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

    return Marca
}