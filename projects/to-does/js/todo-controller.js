'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = ''

    console.log(strHTMLs)
    strHTMLs = todos.map(function(todo) {
            var className = (todo.isDone) ? 'done' : ''
            return `  
        <li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt} - Priority: ${todo.importance}
            <button class="btn-remove" onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`;
        })
        // console.log('strHTMLs', strHTMLs);
    var elTodoList = document.querySelector('.todo-list ul')
    elTodoList.innerHTML = strHTMLs.join('');
    if (!todos.length) {
        strHTMLs = 'No Todos/No Active Todos/no Done To do';
        elTodoList.innerHTML = strHTMLs;
    }
    document.querySelector('.stat-total').innerText = getTotalCount();
    document.querySelector('.stat-active').innerText = getActiveCount();

}

function onRemoveTodo(ev, todoId) {
    var toDelete = confirm('you want to delete?');
    if (toDelete) {
        ev.stopPropagation();
        console.log('Removing', todoId);
        removeTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();

}

function onAddTodo() {
    var elTxt = document.querySelector('input[name=newTodoTxt]');
    var elImportance = document.querySelector('input[name=importance]');
    var txt = elTxt.value;
    var importance = elImportance.value;
    if (txt && importance) {
        addTodo(txt, importance);
        elTxt.value = '';
        elImportance.value = '';
        renderTodos();
    }
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    console.log('Filtering', filterBy);
    renderTodos();
}

function onSetSort(sortedBy) {
    setSort(sortedBy);
    console.log('Sorting', sortedBy);
    renderTodos();
}