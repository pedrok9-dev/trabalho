let dashboard = document.getElementById('dashboard')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        dashboard.innerHTML = ''
        dados.forEach(el => {
            dashboard.innerHTML += `
                <div class="card">
                    <img src="${el.imagem}" alt="${el.nome}">
                    <h3>${el.nome}</h3>
                    <p>${el.categoria}</p>
                    <p>R$ ${el.preco}</p>
                    <p>Estoque: ${el.estoque}</p>
                </div>
            `
        })
    })
    .catch((err) => {
        console.error('Erro ao carregar o dashboard', err)
    })
})
