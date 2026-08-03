const VwProdutosCriticos = require('../models/VwProdutosCriticos')
const VwVolumeCompras = require('../models/VwVolumeCompras')

const listarProdutosCriticos = async (req,res)=>{
    try{
        const dados = await VwProdutosCriticos.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Não foi possível listar os Produtos Críticos',err)
        res.status(500).json({message: 'Não foi possível listar os Produtos Críticos'})
    }
}

const listarVolumeCompras = async (req,res)=>{
    try{
        const dados = await VwVolumeCompras.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Não foi possível listar o Volume de Compras',err)
        res.status(500).json({message: 'Não foi possível listar o Volume de Compras'})
    }
}

const graficoEstoque = async (req,res)=>{
    try{
        // mesma regra de negócio: estoque atual inferior a 10 unidades
        const dados = await VwProdutosCriticos.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Não foi possível gerar o gráfico de Estoque',err)
        res.status(500).json({message: 'Não foi possível gerar o gráfico de Estoque'})
    }
}

const graficoVolume = async (req,res)=>{
    try{
        // exibir estritamente os 5 produtos com maior valor financeiro movimentado
        const dados = await VwVolumeCompras.findAll({
            order: [['valor_total','DESC']],
            limit: 5
        })
        res.status(200).json(dados)
    }catch(err){
        console.error('Não foi possível gerar o gráfico de Volume Financeiro',err)
        res.status(500).json({message: 'Não foi possível gerar o gráfico de Volume Financeiro'})
    }
}

module.exports = { listarProdutosCriticos, listarVolumeCompras, graficoEstoque, graficoVolume }
