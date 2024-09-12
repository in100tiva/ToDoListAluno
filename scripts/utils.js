import { setError } from './displayFunctions.js';

function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function verificarInput(input) {
    if (input.value == '') {
        setError(input, 'Esse campo é obrigatório');
        return true;
    }
    return false;
}

function validateEmail(email) {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        setError(email, 'O e-mail é obrigatório');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        setError(email, 'Digite um e-mail válido');
        return false;
    } else {
        return true;
    }
}

function validateSenha(senha) {
    const senhaValue = senha.value.trim();
    const regexSenha = /(?=.*[$*&@#!])(?=.*[A-Z])(?=.*[a-z]).*$/;
    
    if (senhaValue === '') {
        setError(senha, 'A senha é obrigatória');
        return false;
    } else if (senhaValue.length < 6) {
        setError(senha, 'A senha deve ter pelo menos 6 caracteres');
        return false;
    } else if (!regexSenha.test(senhaValue)) {
        setError(senha, 'A senha precisa ter letras maiúsculas e minúsculas e caracteres especiais');
        return false;   
    } else {
        return true;
    }
}

export { gerarIdUnico, verificarInput, validateEmail, validateSenha };