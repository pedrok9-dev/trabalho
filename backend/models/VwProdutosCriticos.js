const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const VwProdutosCriticos = db.define('VwProdutosCriticos',{
    codigo_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true, // sequelize precisa da chave primária para o mapeamento
    },
    nome: {
        type: DataTypes.STRING(150),
    },
    categoria: {
        type: DataTypes.STRING(60),
    },
    quantidade: {
        type: DataTypes.INTEGER,
    }
},{
    timestamps: false,
    tableName: 'vw_produtos_criticos'
})

module.exports = VwProdutosCriticos
