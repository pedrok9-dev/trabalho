let resposta_usuarios = document.getElementById('resposta_usuarios')
let resposta_produtos = document.getElementById('resposta_produtos')
let btn_usuarios = document.getElementById('btn_usuarios')
let btn_produtos = document.getElementById('btn_produtos')

btn_usuarios.addEventListener('click', (e) => {
    e.preventDefault()
    resposta_usuarios.innerHTML = '<p>Carregando usuários...</p>'

    fetch('http://localhost:3000/carga/usuarios', { method: 'POST' })
    .then(res => res.json())
    .then(dados => {
        resposta_usuarios.innerHTML = `<p>${dados.message}</p>`
    })
    .catch((err) => {
        console.error('Erro ao carregar os usuários', err)
        resposta_usuarios.innerHTML = '<p>Erro ao tentar carregar os usuários.</p>'
    })
})

btn_produtos.addEventListener('click', (e) => {
    e.preventDefault()
    resposta_produtos.innerHTML = '<p>Carregando produtos...</p>'

    fetch('http://localhost:3000/carga/produtos', { method: 'POST' })
    .then(res => res.json())
    .then(dados => {
        resposta_produtos.innerHTML = `<p>${dados.message}</p>`
    })
    .catch((err) => {
        console.error('Erro ao carregar os produtos', err)
        resposta_produtos.innerHTML = '<p>Erro ao tentar carregar os produtos.</p>'
    })
})
