const Usuario = require('../models/Usuario')
const Produto = require('../models/Produto')

const cargarUsuarios = async (req,res)=>{
    try{
        const resposta = await fetch('https://dummyjson.com/users?limit=0')
        const json = await resposta.json()

        // tratamento dos dados externos para o formato das tabelas locais
        const usuarios = json.users.map(u => ({
            nome: u.firstName,
            sobrenome: u.lastName,
            idade: u.age,
            email: u.email,
            telefone: u.phone,
            endereco: u.address.address,
            cidade: u.address.city,
            estado: u.address.state
        }))

        await Usuario.bulkCreate(usuarios)
        res.status(201).json({message: `${usuarios.length} usuários carregados com sucesso!`})
    }catch(err){
        console.error('Erro na carga de Usuários',err)
        res.status(500).json({message: 'Erro na carga de Usuários'})
    }
}

const cargarProdutos = async (req,res)=>{
    try{
        const resposta = await fetch('https://dummyjson.com/products?limit=0')
        const json = await resposta.json()

        const produtos = json.products.map(p => ({
            nome: p.title,
            descricao: p.description,
            categoria: p.category,
            preco: p.price,
            desconto: p.discountPercentage,
            estoque: p.stock,
            marca: p.brand || 'Genérico',
            imagem: p.thumbnail
        }))

        await Produto.bulkCreate(produtos)
        res.status(201).json({message: `${produtos.length} produtos carregados com sucesso!`})
    }catch(err){
        console.error('Erro na carga de Produtos',err)
        res.status(500).json({message: 'Erro na carga de Produtos'})
    }
}

module.exports = { cargarUsuarios, cargarProdutos }
