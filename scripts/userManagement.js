import { displayTodoList, displayLogin, displayCadastrar, setError, shakeForm } from './displayFunctions.js';
import { gerarIdUnico, validateEmail, validateSenha } from './utils.js';

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function getUserLogado() {
    return JSON.parse(localStorage.getItem('logado'));
}

function verificarNovoUsuario(email) {
    const validacaoUser = usuarios.find(user => user.email === email);
    return !validacaoUser;
}

function cadastrarUsuario() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const confSenha = document.getElementById('confSenha');
    
    if (!validateEmail(email) || !validateSenha(senha)) return;
    if (!verificarNovoUsuario(email.value)) {
        setError(email, 'Email já cadastrado');
        return;
    }
    if (senha.value !== confSenha.value) {
        setError(senha, 'As senhas não conferem');
        return;
    }

    const newUser = {
        id: gerarIdUnico(),
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };
    
    usuarios.push(newUser);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário cadastrado com sucesso');
    nome.value = '';
    email.value = '';
    senha.value = '';
    confSenha.value = '';
    displayLogin();
}

function logar() {
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    if (!validateEmail(email) || !validateSenha(senha)) return;

    const validacaoUser = usuarios.find(user => user.email === email.value && user.senha === senha.value);
    if (validacaoUser) {
        alert('Logado com sucesso');
        localStorage.setItem('logado', JSON.stringify(validacaoUser));
        displayTodoList();
    } else {
        alert('Email ou senha incorretos');
        shakeForm();
    }
}

function logout() {
    localStorage.removeItem("logado");
    displayLogin();
}

export { getUserLogado, verificarNovoUsuario, cadastrarUsuario, logar, logout };