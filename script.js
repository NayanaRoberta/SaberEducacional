
class Cliente {
  constructor(nome, email, telefone) {
    this.setNome(nome);
    this.setEmail(email);
    this.setTelefone(telefone);
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


function salvarClientes(clientes) {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

function carregarClientes() {
  return JSON.parse(localStorage.getItem("clientes")) || [];
}


function renderizarClientes() {
  const lista = document.getElementById("lista-clientes");
  lista.innerHTML = "";
  clientes.forEach((c, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.nome}</td>
      <td>${c.email}</td>
      <td>${c.telefone}</td>
      <td><button class="remover" onclick="removerCliente(${index})">Remover</button></td>
    `;
    lista.appendChild(tr);
  });
}

function removerCliente(index) {
  clientes.splice(index, 1);
  salvarClientes(clientes);
  renderizarClientes();
}


const form = document.getElementById("cliente-form");
let clientes = carregarClientes();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const cliente = new Cliente(nome, email, telefone);
    clientes.push(cliente);

    salvarClientes(clientes);
    renderizarClientes();
    form.reset();
  } catch (err) {
    alert(err.message);
  }
});


renderizarClientes();
