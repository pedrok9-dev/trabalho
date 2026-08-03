const Usuario = require('../models/Usuario')
const Produto = require('../models/Produto')
const Compra = require('../models/Compra')

const cadastrar = async (req,res)=>{
    const valores = req.body

    if(!valores.idUsuario || !valores.idProduto || !valores.tipoMovimento ||
        !valores.quantidade || !valores.formaPagamento || !valores.status || !valores.data){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    try{
        const produto = await Produto.findByPk(valores.idProduto)
        if(!produto){
            return res.status(404).json({message: 'Produto inexistente!'})
        }
        const usuario = await Usuario.findByPk(valores.idUsuario)
        if(!usuario){
            return res.status(404).json({message: 'Usuário inexistente!'})
        }

        let novoEstoque = produto.estoque
        // lógica da ENTRADA de produto no estoque
        if(valores.tipoMovimento === 'ENTRADA'){
            novoEstoque += Number(valores.quantidade)
        }
        // lógica da SAIDA de produto no estoque
        else if(valores.tipoMovimento === 'SAIDA'){
            if(produto.estoque < valores.quantidade){
                return res.status(400).json({message: 'Estoque insuficiente para essa saída!'})
            }
            novoEstoque -= Number(valores.quantidade)
        }
        else{
            return res.status(400).json({message: 'Tipo de Movimento Inválido!'})
        }

        await produto.update({estoque: novoEstoque})

        const precoUnitario = produto.preco
        const desconto = valores.desconto || 0
        // preço final calculado com o desconto aplicado sobre a quantidade movimentada
        const precoFinal = (precoUnitario * valores.quantidade) * (1 - (desconto / 100))

        const compra = await Compra.create({
            idUsuario: valores.idUsuario,
            idProduto: valores.idProduto,
            tipoMovimento: valores.tipoMovimento,
            quantidade: valores.quantidade,
            precoUnitario: precoUnitario,
            desconto: desconto,
            precoFinal: precoFinal,
            formaPagamento: valores.formaPagamento,
            status: valores.status,
            data: valores.data
        })
        res.status(201).json(compra)

    }catch(err){
        console.error('Erro ao registrar a Compra',err)
        res.status(500).json({message: 'Erro ao registrar a Compra'})
    }
}

const listar = async (req,res)=>{
    try{
        const dados = await Compra.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Não foi possível listar as Compras',err)
        res.status(500).json({message: 'Não foi possível listar as Compras'})
    }
}

module.exports = { cadastrar, listar }
