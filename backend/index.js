const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const compraController = require('./controller/compra.controller')
const relatVwController = require('./controller/relatVW.controller')
const cargaController = require('./controller/carga.controller')
const hostname = 'localhost' // 127.0.0.1
const PORT = 3000
// ------------ Middleware ----------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//--------------- Rotas --------------

app.post('/usuario', usuarioController.cadastrar)
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.buscarPorCod)
app.get('/usuario/buscar/:nome', usuarioController.buscarPorNome)
app.delete('/usuario/:id', usuarioController.excluir)
app.put('/usuario/:id', usuarioController.atualizar)

app.post('/produto', produtoController.cadastrar)
app.get('/produtos', produtoController.listar)
app.get('/produto/:id', produtoController.buscarPorCod)
app.get('/produto/buscar/:nome', produtoController.buscarPorNome)
app.delete('/produto/:id', produtoController.excluir)
app.put('/produto/:id', produtoController.atualizar)

app.post('/compra', compraController.cadastrar)
app.get('/compras', compraController.listar)

// rota da carga inicial em lote (bulkCreate)
app.post('/carga/usuarios', cargaController.cargarUsuarios)
app.post('/carga/produtos', cargaController.cargarProdutos)

// rotas dos relatórios (views)
app.get('/relatorio/criticos', relatVwController.listarProdutosCriticos)
app.get('/relatorio/volume', relatVwController.listarVolumeCompras)

// rotas dos gráficos (Chart.js)
app.get('/grafico/estoque', relatVwController.graficoEstoque)
app.get('/grafico/volume', relatVwController.graficoVolume)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!!!'})
})

// -------------- Server -------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro de conexão com o banco de dados!',err)
})
