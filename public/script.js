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
    lista.innerHTML = ""; // Limpa a lista antes de preencher
    usuarios.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.nome;
    lista.appendChild(li);
    });
    });
    }
    // 📌 Função para listar usuários cadastrados
function listarUsuarios() {
    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            const lista = document.getElementById("listaUsuarios");
            lista.innerHTML = ""; // Limpa a lista antes de preencher
            usuarios.forEach(user => {
                const li = document.createElement("li");
                li.textContent = user.nome;

                // Botão de editar
                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.onclick = () => editarUsuario(user.id, user.nome);

                // Botão de deletar
                const btnDeletar = document.createElement("button");
                btnDeletar.textContent = "Deletar";
                btnDeletar.onclick = () => deletarUsuario(user.id);

                li.appendChild(btnEditar);
                li.appendChild(btnDeletar);
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