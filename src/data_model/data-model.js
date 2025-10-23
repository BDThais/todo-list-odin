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
        }
        else { alert("Projects can't have identical name!"); }

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
            }
            else { alert("Todo can't have the same title") }
        }

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
        localStorage.clear();
        localStorage.setItem("projectList", JSON.stringify(this.projectList));
    }
    parseLocalData() {
        return JSON.parse(localStorage.getItem("projectList"));
    }
    initializeData() {
        const initalList = { "projectList": 
            [{"name":"Iron Castellans",
                "todos":[{"title":"Establish Forward Base","description":"Set up HQ, comms tower and field kitchens.","dueDate":"2025-10-23","priority":"🐯Average","isCompleted":true},
                        {"title":"Fortify Perimeter","description":"Emplace barricades & automated turrets.","dueDate":"2025-10-24","priority":"🐯Average","isCompleted":true},
                        {"title":"Secure Supply Convoy","description":"Escort food/ammo convoy (awaiting intel).","dueDate":"2025-10-24","priority":"🐯Average","isCompleted":false},
                        {"title":"Purge the Hive-Spire","description":"Total eradication of bio-brood nests within Hive-Spire 7.","dueDate":"2025-10-31","priority":"👽Lethal","isCompleted":true},
                        {"title":"Exterminate Heretic Cult","description":"Root out cult cells; no prisoners if they resist.","dueDate":"2025-10-30","priority":"😈Ruthless","isCompleted":false}]},
            {"name":"Void Reavers",
                "todos":[{"title":"Chart Warp Route","description":"Calculate safe warp windows and contingencies.","dueDate":"2025-10-30","priority":"🐯Average","isCompleted":true},
                        {"title":"Sweep Pirate Signals","description":"Signal jamming and flare patterns — awaiting review.","dueDate":"2025-10-31","priority":"🐯Average","isCompleted":true},
                        {"title":"Sabotage Warp Anchor","description":"Disable anchor to strand enemy fleet in realspace.","dueDate":"2025-11-23","priority":"😈Ruthless","isCompleted":true},
                        {"title":"Board Raider Cruiser","description":"Close-quarters boarding, capture bridge and navigator.","dueDate":"2025-12-17","priority":"👽Lethal","isCompleted":false}]},
            {"name":"Black Talon",
                "todos":[{"title":"Ambush Convoy at Red Pass","description":"High-casualty interception in narrow canyon.","dueDate":"2025-11-04","priority":"👽Lethal","isCompleted":true},
                        {"title":"Psychic Nullification Sweep","description":"Sweep sector for latent psychic nodes and erase them.","dueDate":"2025-12-01","priority":"😈Ruthless","isCompleted":true},
                        {"title":"Destroy Xenos Nestclutch","description":"Complete eradication, remove taint from region","dueDate":"2025-12-30","priority":"☠️Absolute","isCompleted":false}]}] 
        };

        if (localStorage.getItem("projectList") === null || localStorage.getItem("projectList") === "[]") { 
            this.loadDataToList(initalList.projectList); 
        }
        else { 
            this.loadDataToList(this.parseLocalData()) 
        }
    }
}

class Todo {
    constructor(todoObj, nameList) {
        this.title = todoObj[nameList[0]];
        this.description = todoObj[nameList[1]];
        this.dueDate = todoObj[nameList[2]];
        this.priority = todoObj[nameList[3]];
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