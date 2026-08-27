import { updateProjectTab } from "../views/project-tab";
import { activeProject } from "../controllers/active-project-handler";
import { updateTodoTab } from "../views/todo-tab";
import { nameList } from "../views/add-todo-form";

class TodoModelHandler {
    constructor(projectList = []) {
        this.projectList = projectList;
    }
    isEmptyObject(obj) {
        if (obj === null || typeof obj !== 'object') {
            return false;
        }
        return Object.keys(obj).length === 0;
    }
    noActiveProject() {
        if (this.projectList.length === 0) { return true; }
        else { return false; }
    }
    sameNameCheck(project) {
        for (const element of this.projectList) {
            if (element.name === project.name) { return true; }
        }
        return false;
    }
    initializeDefaultProject() {
        const defaultProj = new Project("Default");
        this.addProject(defaultProj);
    }
    addProject(project) {
        if (!(this.sameNameCheck(project))) {
            this.projectList.push(project);
            activeProject.updateActiveProject(project);
            updateProjectTab();
            this.storeToLocal();
            return true;
        }
        else { alert("Projects can't have identical name!"); }
        return false;
    }
    updateProject(project, name) {
        const duplicate = this.projectList.some((element) => element !== project && element.name === name);
        if (duplicate) {
            alert("Projects can't have identical name!");
            return false;
        }

        project.name = name;
        updateProjectTab();
        updateTodoTab();
        this.storeToLocal();
        return true;
    }
    deleteProject(project) {
        if (this.projectList.length === 1) { activeProject.set0ActiveProject() }
        for (let i = 0; i < this.projectList.length; ++i) {
            if (project === this.projectList[i]) {
                this.projectList.splice(i, 1);
                updateProjectTab();
                activeProject.updateActiveProject();
                updateTodoTab();
            }
        }
        this.storeToLocal();
    }
    sameTodoTitle(todo) {
        const todoList = this.getTodo();
        for (let i = 0; i < todoList.length; ++i) {
            if (todo.title === todoList[i].title) {
                return true;
            }
        }
        return false;
    }
    addTodo(todo) {
        if (this.projectList[activeProject.getCurrentActiveIndex()] === undefined) {
            alert("No active project available.")
        }
        else {
            if (!(this.sameTodoTitle(todo))) {
                this.projectList[activeProject.getCurrentActiveIndex()].todos.push(todo);
                updateTodoTab();
                this.storeToLocal();
                return true;
            }
            else { alert("Todo can't have the same title") }
        }
        return false;
    }
    updateTodo(todo, todoData) {
        const duplicate = this.getTodo().some((element) => element !== todo && element.title === todoData.title);
        if (duplicate) {
            alert("Todo can't have the same title");
            return false;
        }

        todo.title = todoData.title;
        todo.description = todoData.description;
        todo.dueDate = todoData.dueDateMode === "Daily" ? "Daily" : todoData.dueDate;
        todo.priority = todoData.priority;
        updateTodoTab();
        this.storeToLocal();
        return true;
    }
    deleteTodo(todo) {
        this.getTodo().forEach((element, index) => {
            if (todo === element) {
                this.projectList[activeProject.getCurrentActiveIndex()].todos.splice(index, 1);
                updateTodoTab();

            }
        });
        this.storeToLocal();
    }
    updateStatus(todo) {
        if (todo.isCompleted === false) { todo.isCompleted = true }
        else if (todo.isCompleted === true) { todo.isCompleted = false }
    }
    changeTodoStatus(todo) {
        this.getTodo().forEach((element, index) => {
            if (todo === element) {
                this.updateStatus(this.projectList[activeProject.getCurrentActiveIndex()].todos[index]);
                updateTodoTab();
                console.log(this.projectList);
            }
        });
        this.storeToLocal();
    }
    getTodo() {//get todo array of the currently active project
        for (let i = 0; i < this.projectList.length; ++i) {
            if (i === activeProject.getCurrentActiveIndex()) {
                return this.projectList[i].todos;
            }
        }
        return false;
    }
    loadDataToList(jsonObj) {
        const seedData = jsonObj;

        seedData.forEach((project) => {
            let newProject = new Project(project.name);
            this.addProject(newProject);

            project.todos.forEach((todo) => {
                let newTodo = new Todo(todo, nameList);
                this.addTodo(newTodo);
            })
        })
        this.storeToLocal();
    }
    storeToLocal() {
        localStorage.setItem("projectList", JSON.stringify(this.projectList));
    }
    parseLocalData() {
        return JSON.parse(localStorage.getItem("projectList"));
    }
    resetCompletedTodos(projectList) {
        projectList.forEach((project) => {
            project.todos = project.todos.filter((todo) => {
                if (todo.isCompleted && todo.dueDate !== "Daily") {
                    return false;
                }
                if (todo.isCompleted && todo.dueDate === "Daily") {
                    todo.isCompleted = false;
                }
                return true;
            });
        });
    }
    initializeData() {
        const initalList = { "projectList": 
            [{"name":"Personal",
                "todos":[{"title":"Buy groceries","description":"Pick up vegetables, bread, milk, and coffee for the week.","dueDate":"2026-08-23","priority":"Low","isCompleted":false},
                    {"title":"Schedule dentist appointment","description":"Call the dentist and arrange a routine cleaning.","dueDate":"2026-08-24","priority":"High","isCompleted":false},
                    {"title":"Organize bedroom closet","description":"Sort clothes and donate items that are no longer needed.","dueDate":"Daily","priority":"Low","isCompleted":false}]},
            {"name":"Work",
                "todos":[{"title":"Finish project report","description":"Complete the summary and send it to the team for review.","dueDate":"2026-08-25","priority":"High","isCompleted":false},
                    {"title":"Reply to client emails","description":"Respond to the outstanding questions in the project inbox.","dueDate":"2026-08-23","priority":"Urgent","isCompleted":false},
                    {"title":"Prepare weekly meeting notes","description":"Collect updates and prepare the agenda for Monday's meeting.","dueDate":"2026-08-30","priority":"Low","isCompleted":false}]},
            {"name":"Home Chores",
                "todos":[{"title":"Clean the kitchen","description":"Wipe the counters, clean the sink, and mop the floor.","dueDate":"2026-08-23","priority":"Low","isCompleted":false},
                    {"title":"Pay utility bills","description":"Review and pay the electricity and internet bills.","dueDate":"2026-08-26","priority":"High","isCompleted":false},
                        {"title":"Water the plants","description":"Check each plant and water the ones with dry soil.","dueDate":"Daily","priority":"Low","isCompleted":false}]}]
        };

        const currentDate = (new Date()).toLocaleDateString("sv-SE");
        const isNewDay = localStorage.getItem("todoLastResetDate") !== currentDate;
        const savedProjects = localStorage.getItem("projectList");
        const projectList = savedProjects === null || savedProjects === "[]"
            ? initalList.projectList
            : this.parseLocalData();

        if (isNewDay) {
            this.resetCompletedTodos(projectList);
        }

        this.loadDataToList(projectList);
        localStorage.setItem("todoLastResetDate", currentDate);
    }
}

class Todo {
    constructor(todoObj, nameList) {
        this.title = todoObj.title;
        this.description = todoObj.description;
        this.dueDate = todoObj.dueDateMode === "Daily" ? "Daily" : todoObj.dueDate;
        this.priority = todoObj.priority;
        if (todoObj.isCompleted === undefined) { this.isCompleted = false; }
        else { this.isCompleted = todoObj.isCompleted }
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

let projectTab = new TodoModelHandler();

export { Todo, Project, projectTab };