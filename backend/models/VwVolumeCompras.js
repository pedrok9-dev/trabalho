const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const VwVolumeCompras = db.define('VwVolumeCompras',{
    nome: {
        type: DataTypes.STRING(150),
        primaryKey: true // sequelize precisa da chave primária para o mapeamento
    },
    quantidade_total: {
        type: DataTypes.INTEGER,
    },
    valor_total: {
        type: DataTypes.DECIMAL(12,2),
    }
},{
    timestamps: false,
    tableName: 'vw_volume_compras'
})

module.exports = VwVolumeCompras
