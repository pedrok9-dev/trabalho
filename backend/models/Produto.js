const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto',{
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10,2), // moeda
        allowNull: false
    },
    desconto: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
        defaultValue: 0
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    imagem: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
},{
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto
