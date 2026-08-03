let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/compras')
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao listar as movimentações', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codCompra}</td>`
        corpo += `<td>${el.idUsuario}</td>`
        corpo += `<td>${el.idProduto}</td>`
        corpo += `<td>${el.tipoMovimento}</td>`
        corpo += `<td>${el.quantidade}</td>`
        corpo += `<td>R$ ${el.precoUnitario}</td>`
        corpo += `<td>${el.desconto}%</td>`
        corpo += `<td>R$ ${el.precoFinal}</td>`
        corpo += `<td>${el.formaPagamento}</td>`
        corpo += `<td>${el.status}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Cód. Compra</th>
                <th>Cód. Usuário</th>
                <th>Cód. Produto</th>
                <th>Tipo</th>
                <th>Qtd.</th>
                <th>Preço Unit.</th>
                <th>Desconto</th>
                <th>Preço Final</th>
                <th>Pagamento</th>
                <th>Status</th>
                <th>Data</th>
            </tr>
        </thead>
    `
}
