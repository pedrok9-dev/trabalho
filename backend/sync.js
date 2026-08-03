const conn = require('./db/conn')
const { Usuario, Produto, Compra } = require('./models/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas sincronizadas')

    // Injetar a criação da view vw_produtos_criticos (regra: estoque < 10)
    const queryViewCriticos = `
        CREATE OR REPLACE VIEW vw_produtos_criticos AS
        SELECT
            codProduto AS codigo_produto,
            nome,
            categoria,
            estoque AS quantidade
        FROM produtos
        WHERE estoque < 10;
    `
        await conn.query(queryViewCriticos)
        console.log('view de produtos críticos criada com sucesso!')

    // Injetar a criação da view vw_volume_compras (valor = quantidade x preço unitário nas saídas)
    const queryViewVolume = `
        CREATE OR REPLACE VIEW vw_volume_compras AS
        SELECT
            p.nome AS nome,
            SUM(c.quantidade) AS quantidade_total,
            SUM(c.quantidade * c.precoUnitario) AS valor_total
        FROM compras c
        INNER JOIN produtos p ON c.idProduto = p.codProduto
        WHERE c.tipoMovimento = 'SAIDA'
        GROUP BY p.nome;
    `
        await conn.query(queryViewVolume)
        console.log('view de volume de compras criada com sucesso!')
    }catch(err){
        console.error('Erro ao sincronizar as tabelas',err)
    }finally{
       await conn.close()
       console.log('Fechando a conexão com o banco de dados')
    }
}

syncDataBase()
