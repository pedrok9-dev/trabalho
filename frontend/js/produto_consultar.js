let resposta = document.getElementById('resposta')
let resposta_nome = document.getElementById('resposta_nome')
let btn_consultar = document.getElementById('btn_consultar')
let btn_consultar_nome = document.getElementById('btn_consultar_nome')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codProduto = document.getElementById('codProduto').value

    fetch(`http://localhost:3000/produto/${codProduto}`)
    .then(res => res.json())
    .then(dados => {

        if (!dados || dados.message) {
            resposta.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''
        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
    })
})

btn_consultar_nome.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/produto/buscar/${nome}`)
    .then(res => res.json())
    .then(dados => {

        if (!dados || dados.message) {
            resposta_nome.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''
        resposta_nome.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codProduto}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.categoria}</td>`
        corpo += `<td>R$ ${el.preco}</td>`
        corpo += `<td>${el.desconto}%</td>`
        corpo += `<td>${el.estoque}</td>`
        corpo += `<td>${el.marca}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Desconto</th>
                <th>Estoque</th>
                <th>Marca</th>
            </tr>
        </thead>
    `
}
