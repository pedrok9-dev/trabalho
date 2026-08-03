const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario',{
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'usuarios'
})

module.exports = Usuario
