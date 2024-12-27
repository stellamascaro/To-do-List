import { addTask, loadTasks } from './todo.js';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('To-Do List Functionality', () => {
    beforeEach(() => {
        localStorage.clear(); // Limpa o localStorage antes de cada teste
    });

    test('Adiciona uma nova tarefa corretamente à lista', () => {
        const taskList = [];
        const newTask = addTask('Nova tarefa', taskList);

        expect(newTask).toHaveProperty('name', 'Nova tarefa');
        expect(taskList).toContainEqual(newTask);
        expect(localStorage.setItem).toHaveBeenCalledWith("tasks", JSON.stringify(taskList));
    });

    test('LocalStorage atualizado corretamente após adicionar uma nova tarefa', () => {
        const mockTasks = [{ id: 1, name: 'Tarefa 1', completed: false }];
        localStorage.setItem("tasks", JSON.stringify(mockTasks));

        const loadedTasks = loadTasks();
        expect(loadedTasks).toEqual(mockTasks);
        expect(localStorage.getItem).toHaveBeenCalledWith("tasks");
    });
});
