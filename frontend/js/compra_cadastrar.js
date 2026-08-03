let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const compra = {
        idUsuario: parseInt(document.getElementById('idUsuario').value),
        idProduto: parseInt(document.getElementById('idProduto').value),
        tipoMovimento: document.getElementById('tipoMovimento').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        desconto: parseFloat(document.getElementById('desconto').value) || 0,
        formaPagamento: document.getElementById('formaPagamento').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value
    }

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(compra)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
        } else {
            resposta.innerHTML = `<p>Movimentação de código ${dados.codCompra} registrada com sucesso!</p>`
            document.querySelector('form').reset()
        }
    })
    .catch((err) => {
        console.error('Erro ao registrar a movimentação', err)
        resposta.innerHTML = '<p>Erro ao tentar registrar a movimentação.</p>'
    })
})
