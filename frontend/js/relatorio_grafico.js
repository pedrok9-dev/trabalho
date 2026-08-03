// Gráfico 1 - Barras Verticais - Estoque Físico Atual
fetch('http://localhost:3000/grafico/estoque')
.then(res => res.json())
.then(dados => {
    const ctx = document.getElementById('grafico_estoque')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dados.map(el => el.nome),
            datasets: [{
                label: 'Quantidade em Estoque',
                data: dados.map(el => el.quantidade),
                backgroundColor: '#2E86AB'
            }]
        },
        options: {
            indexAxis: 'x',
            scales: { y: { beginAtZero: true } }
        }
    })
})
.catch((err) => {
    console.error('Erro ao carregar o gráfico de estoque', err)
})

// Gráfico 2 - Barras Horizontais - Volume Financeiro de Compras (Top 5)
fetch('http://localhost:3000/grafico/volume')
.then(res => res.json())
.then(dados => {
    const ctx = document.getElementById('grafico_volume')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dados.map(el => el.nome),
            datasets: [{
                label: 'Valor Financeiro Movimentado (R$)',
                data: dados.map(el => el.valor_total),
                backgroundColor: '#F4A261'
            }]
        },
        options: {
            indexAxis: 'y',
            scales: { x: { beginAtZero: true } }
        }
    })
})
.catch((err) => {
    console.error('Erro ao carregar o gráfico de volume financeiro', err)
})
