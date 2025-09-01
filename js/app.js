let contatos = [];

function carregar() {
  const dados = localStorage.getItem("contatos");
  contatos = dados ? JSON.parse(dados) : [];
  render();
}

function salvar() {
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function render() {
  const tbody = document.querySelector("#contatosTable tbody");
  tbody.innerHTML = "";

  contatos.forEach((contato, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${contato._nome}</td>
      <td>${contato._email}</td>
      <td>${contato._telefone}</td>
      <td>${contato._tipo}</td>
      <td><button onclick="removerContato(${index})">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function removerContato(id) {
  contatos.splice(id, 1);
  salvar();
  render();
}

function handleSubmit(e) {
  e.preventDefault();

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const telefone = document.querySelector("#telefone").value;
  const tipo = document.querySelector("#tipo").value;

  try {
    const novoContato = new Contato(nome, email, telefone, tipo);
    contatos.push(novoContato);
    salvar();
    render();

    e.target.reset();
  } catch (erro) {
    alert(erro.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregar();
  document.querySelector("#cadastroForm").addEventListener("submit", handleSubmit);
});
