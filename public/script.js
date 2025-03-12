function salvarUsuario() {
    const nome = document.getElementById("nome").value;
    fetch("http://localhost:3000/salvar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
    })
    .then(res => res.json())
    .then(() => listarUsuarios()); // Atualiza a lista de usuários
    }
    
    
    // 📌 Função para listar usuários cadastrados
    function listarUsuarios() {
        fetch("http://localhost:3000/usuarios")
            .then(res => res.json())
            .then(usuarios => {
                const lista = document.getElementById("listaUsuarios");
                lista.innerHTML = "";
                usuarios.forEach(user => {
                    const li = document.createElement("li");
                    
                    // Span para o nome
                    const spanNome = document.createElement("span");
                    spanNome.textContent = user.nome;
                    
                    // Div para os botões
                    const divBotoes = document.createElement("div");
                    divBotoes.className = "botoes";
    
                    // Botão de editar com ícone
                    const btnEditar = document.createElement("button");
                    btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
                    btnEditar.onclick = () => editarUsuario(user.id, user.nome);
    
                    // Botão de deletar com ícone
                    const btnDeletar = document.createElement("button");
                    btnDeletar.innerHTML = '<i class="fas fa-trash"></i>';
                    btnDeletar.onclick = () => deletarUsuario(user.id);
    
                    // Adiciona os botões à div
                    divBotoes.appendChild(btnEditar);
                    divBotoes.appendChild(btnDeletar);
    
                    // Adiciona o nome e os botões ao li
                    li.appendChild(spanNome);
                    li.appendChild(divBotoes);
                    lista.appendChild(li);
                });
            });
    }

// 📌 Função para editar um usuário
function editarUsuario(id, nomeAtual) {
    const novoNome = prompt("Digite o novo nome:", nomeAtual);
    if (novoNome) {
        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: novoNome })
        })
        .then(res => res.json())
        .then(() => listarUsuarios()); // Atualiza a lista de usuários
    }
}

// 📌 Função para deletar um usuário
function deletarUsuario(id) {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => listarUsuarios()); // Atualiza a lista de usuários
    }
}


    // 📌 Carregar usuários ao iniciar a página
    listarUsuarios();