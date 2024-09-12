import { conteudoSite } from './main.js';
import { getUserLogado, cadastrarUsuario, logar, logout } from './userManagement.js';
import { cadastrarTask, toggleTaskStatus, deletarTask, getTasks } from './taskManagement.js';

function displayTodoList() {
    const userLogado = getUserLogado();
    const primeiroNome = userLogado.nome.split(' ');
    conteudoSite.innerHTML = `
    <section>
            <div>  
                <header id='headerTasks'><h1 id="title">Olá, ${primeiroNome[0]}</h1> <button onclick="logout()">Logout</button></header>
                <div id="tasks">
                </div>
                <div id="tasksConcluidas"></div>
            </div>
            <div id="inputTasks">
                <input type="text" id='task' placeholder="Adicionar Tarefa"><button onclick="cadastrarTask()">Enviar</button>
            </div>
    </section>`;
    atualizarTasks();
    document.querySelector('#headerTasks button').onclick = logout;
    document.querySelector('#inputTasks button').onclick = cadastrarTask;
}

function displayCadastrar() {
    conteudoSite.innerHTML = `
    <div id="containerForm">
            <h1>Cadastro</h1>
            <div>
                <label for="senha">Nome:</label>
                <input type="text" name="nome" id="nome">
                <div class='message'></div>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="text" name="email" id="email">
                <div class='message'></div>
            </div>
            <div>
                <label for="senha">Senha:</label>
                <input type="password" name="senha" id="senha">
                <div class='message'></div>
            </div>
            <div>
                <label for="confSenha">Confirme a senha:</label>
                <input type="password" name="confSenha" id="confSenha">
            </div>
            <button class='btn-ok' onclick="cadastrarUsuario()">Cadastrar</button>
            <button class='btn-default' onclick="displayLogin()">Voltar</button>
        </div>
    `;
    document.querySelector('.btn-ok').onclick = cadastrarUsuario;
    document.querySelector('.btn-default').onclick = displayLogin;
}

function displayLogin() {
    conteudoSite.innerHTML = `
    <div id="containerForm">
            <h1>Login</h1>
            <div>
                <label for="email">Email:</label>
                <input type="text" name="email" id="email">
            </div>
            <div>
                <label for="senha">Senha:</label>
                <input type="password" name="senha" id="senha">
            </div>
            <button class='btn-ok' onclick="logar()">Logar</button>
            <button class='btn-default' onclick="displayCadastrar()">Cadastre-se</button>
        </div>
    `;
    document.querySelector('.btn-ok').onclick = logar;
    document.querySelector('.btn-default').onclick = displayCadastrar;
}

function atualizarTasks() {
    const userLogado = getUserLogado();
    const tasks = getTasks();
    let tasksUser = tasks.filter(task => task.id_user == userLogado.id && task.status == 'Pendente');
    let tasksUserConcluidas = tasks.filter(task => task.id_user == userLogado.id && task.status == 'Concluída');

    const divTasks = document.getElementById('tasks');
    const divTasksConcluidas = document.getElementById('tasksConcluidas');

    divTasks.innerHTML = "";
    divTasksConcluidas.innerHTML = "";

    const tasksHTMLConcluidas = tasksUserConcluidas.map((taskConcluida) => {
        return `<div class="task-item completed" data-id="${taskConcluida.id}">
        <input type="checkbox" class="task-checkbox" checked disabled>
        <p>${taskConcluida.task}</p>
        </div>`;
    });

    const tasksHTML = tasksUser.map((task) => {
        return `<div class="task-item" data-id="${task.id}">
        <input type="checkbox" class="task-checkbox">
        <span>${task.task}</span>
        <button class='btn-warn' data-id="${task.id}">
        Deletar
        </button></div>`;
    });

    divTasks.innerHTML = tasksHTML.join('');
    divTasksConcluidas.innerHTML = `<span id='concluidos'><h3>Concluídos</h3>${tasksHTMLConcluidas.join('')}</span>`;

    divTasks.querySelectorAll('.task-item').forEach(taskItem => {
        taskItem.onclick = (event) => {
            if (!event.target.classList.contains('btn-warn')) {
                const checkbox = taskItem.querySelector('.task-checkbox');
                checkbox.checked = !checkbox.checked;
                toggleTaskStatus(taskItem.getAttribute('data-id'));
            }
        };
    });
    divTasks.querySelectorAll('.btn-warn').forEach(button => {
        button.onclick = () => {
            deletarTask(button.getAttribute('data-id'));
            atualizarTasks();
        };
    });

    divTasksConcluidas.querySelectorAll('.task-item').forEach(taskItem => {
        taskItem.onclick = () => {
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.checked = false;
            checkbox.disabled = false;
            toggleTaskStatus(taskItem.getAttribute('data-id'));
        };
    });
}

function shakeForm() {
    document.getElementById('containerForm').classList.add('shake');
    setTimeout(() => {
        document.getElementById('containerForm').classList.remove('shake');
    }, 820);
}

function setError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.message');
    errorDisplay.innerText = message;
    shakeForm();
    errorDisplay.classList.add('error');
    errorDisplay.classList.remove('success');
}

export { displayTodoList, displayCadastrar, displayLogin, atualizarTasks, shakeForm, setError };