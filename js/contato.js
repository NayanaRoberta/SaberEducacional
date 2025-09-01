class Contato {
  constructor(nome, email, telefone, tipo) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.tipo = tipo;
  }


  get nome() {
    return this._nome;
  }
  get email() {
    return this._email;
  }
  get telefone() {
    return this._telefone;
  }
  get tipo() {
    return this._tipo;
  }

  set nome(valor) {
    if (!valor || valor.trim() === "") {
      throw new Error("Nome não pode ser vazio.");
    }
    this._nome = valor;
  }

  set email(valor) {
    if (!valor.includes("@")) {
      throw new Error("Email inválido.");
    }
    this._email = valor;
  }

  set telefone(valor) {
    if (!/^\d+$/.test(valor)) {
      throw new Error("Telefone deve conter apenas dígitos.");
    }
    this._telefone = valor;
  }

  set tipo(valor) {
    if (valor !== "Aluno" && valor !== "Professor") {
      throw new Error("Tipo deve ser Aluno ou Professor.");
    }
    this._tipo = valor;
  }
}
