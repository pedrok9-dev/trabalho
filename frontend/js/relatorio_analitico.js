let resposta_criticos = document.getElementById('resposta_criticos')
let resposta_volume = document.getElementById('resposta_volume')
let btn_criticos = document.getElementById('btn_criticos')
let btn_volume = document.getElementById('btn_volume')

btn_criticos.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/relatorio/criticos')
    .then(res => res.json())
    .then(dados => {
        resposta_criticos.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Quantidade Atual</th>
                    </tr>
                </thead>
                <tbody>
                    ${dados.map(el => `
                        <tr>
                            <td>${el.codigo_produto}</td>
                            <td>${el.nome}</td>
                            <td>${el.categoria}</td>
                            <td>${el.quantidade}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao carregar o relatório de produtos críticos', err)
    })
})

btn_volume.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/relatorio/volume')
    .then(res => res.json())
    .then(dados => {
        resposta_volume.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Quantidade Total Movimentada</th>
                        <th>Valor Financeiro Movimentado</th>
                    </tr>
                </thead>
                <tbody>
                    ${dados.map(el => `
                        <tr>
                            <td>${el.nome}</td>
                            <td>${el.quantidade_total}</td>
                            <td>R$ ${parseFloat(el.valor_total).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao carregar o relatório de volume financeiro', err)
    })
})
