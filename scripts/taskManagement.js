import { getUserLogado } from './userManagement.js';
import { gerarIdUnico } from './utils.js';
import { atualizarTasks } from './displayFunctions.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function cadastrarTask() {
    const userLogado = getUserLogado();
    const task = document.getElementById('task');
    
    const taskValue = task.value;
    if (taskValue == '') {
        alert('Preencha o campo de tarefa');
        return;
    }
    const newTask = {
        id: gerarIdUnico(),
        task: taskValue,
        status: 'Pendente',
        dataCriacao: new Date(),
        dataConclusao: null,
        id_user: userLogado.id
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    task.value = '';
    atualizarTasks();
}

function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id == id);
    if (task.status === 'Pendente') {
        task.status = 'Concluída';
        task.dataConclusao = new Date();
    } else {
        task.status = 'Pendente';
        task.dataConclusao = null;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    atualizarTasks();
}

function deletarTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    atualizarTasks();
}

function getTasks() {
    return tasks;
}

export { cadastrarTask, toggleTaskStatus, deletarTask, getTasks };