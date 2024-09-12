import { displayTodoList, displayLogin } from './displayFunctions.js';
import { getUserLogado } from './userManagement.js';

const conteudoSite = document.getElementById('conteudoSite');

function init() {
    const userLogado = getUserLogado();

    if (userLogado) {
        displayTodoList();
    } else {
        displayLogin();
    }
}

init();

export { conteudoSite };