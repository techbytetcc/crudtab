// Função para criptografar a senha
function encryptPassword(password) {
  // Aqui você pode implementar um algoritmo de criptografia, como por exemplo, o bcrypt
  // No entanto, neste exemplo, vou apenas adicionar um prefixo para identificar que é uma senha criptografada
  return '***'; // Substitua isso pelo código real de criptografia
}

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sSobrenome = document.querySelector('#m-sobrenome')
const sFuncao = document.querySelector('#m-funcao')
const sEmail = document.querySelector('#m-email')
const sSenha = document.querySelector('#m-senha') // Adicionado
const sContato = document.querySelector('#m-contato')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sSobrenome.value = itens[index].sobrenome
    sFuncao.value = itens[index].funcao
    sEmail.value = itens[index].email
    sSenha.value = itens[index].senha // Adicionado
    sContato.value = itens[index].contato
    id = index
  } else {
    sNome.value = ''
    sSobrenome.value = ''
    sFuncao.value = ''
    sEmail.value = ''
    sSenha.value = '' // Adicionado
    sContato.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

// Função para criptografar a senha ao exibi-la na tabela
function encryptPassword(password) {
  // Aqui você pode implementar um algoritmo de criptografia, como por exemplo, o bcrypt
  // No entanto, neste exemplo, vou apenas adicionar um prefixo para identificar que é uma senha criptografada
  return '***'; // Substitua isso pelo código real de criptografia
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.sobrenome}</td>
    <td>${item.funcao}</td>
    <td>${item.email}</td>
    <td>${encryptPassword(item.senha)}</td> <!-- Modificado -->
    <td>${item.contato}</td>

    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sSobrenome.value == '' || sFuncao.value == '' || sEmail.value == '' || sSenha.value == '' || sContato.value == '') { // Atualizado
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].sobrenome = sSobrenome.value
    itens[id].funcao = sFuncao.value
    itens[id].email = sEmail.value
    itens[id].senha = sSenha.value // Adicionado
    itens[id].contato = sContato.value
  } else {
    itens.push({'nome': sNome.value, 'sobrenome': sSobrenome.value, 'funcao': sFuncao.value, 'email': sEmail.value, 'senha': sSenha.value, 'contato': sContato.value}) // Adicionado
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
