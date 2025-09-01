
class Pessoa {
  constructor(tipo, nome, email, telefone) {
    this.setTipo(tipo);
    this.setNome(nome);
    this.setEmail(email);
    this.setTelefone(telefone);
  }

  getTipo() { return this.tipo; }
  setTipo(tipo) {
    if (!["Aluno", "Funcionário"].includes(tipo)) throw new Error("Tipo inválido");
    this.tipo = tipo;
  }

  getNome() { return this.nome; }
  setNome(nome) {
    if (!nome) throw new Error("Nome não pode ser vazio");
    this.nome = nome;
  }

  getEmail() { return this.email; }
  setEmail(email) {
    if (!email.includes("@")) throw new Error("E-mail inválido");
    this.email = email;
  }

  getTelefone() { return this.telefone; }
  setTelefone(telefone) {
    if (!telefone) throw new Error("Telefone inválido");
    this.telefone = telefone;
  }
}


function salvarPessoas(pessoas) {
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

function carregarPessoas() {
  return JSON.parse(localStorage.getItem("pessoas")) || [];
}


function renderizarPessoas() {
  const lista = document.getElementById("lista-pessoas");
  lista.innerHTML = "";
  pessoas.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.tipo}</td>
      <td>${p.nome}</td>
      <td>${p.email}</td>
      <td>${p.telefone}</td>
      <td><button class="remover" onclick="removerPessoa(${index})">Remover</button></td>
    `;
    lista.appendChild(tr);
  });
}

function removerPessoa(index) {
  pessoas.splice(index, 1);
  salvarPessoas(pessoas);
  renderizarPessoas();
}


const form = document.getElementById("pessoa-form");
let pessoas = carregarPessoas();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const tipo = document.getElementById("tipo").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const pessoa = new Pessoa(tipo, nome, email, telefone);
    pessoas.push(pessoa);

    salvarPessoas(pessoas);
    renderizarPessoas();
    form.reset();
  } catch (err) {
    alert(err.message);
  }
});


renderizarPessoas();
