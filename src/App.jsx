import { useState, useEffect } from 'react'

export default function App() {

    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);

    const handleAddTask = () => {
        if(task) {
            const newTodos = [task, ...todos];
            setTodos(newTodos);
            setTask('');
            saveTodosToLocalStorage(newTodos);
        }
    }

    const handleDeleteTask = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos);
    }

    const handleEnter = (e) => e.key === 'Enter' && handleAddTask();

    const saveTodosToLocalStorage = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    useEffect(() => {
        const storageTodos = localStorage.getItem('todos');
        if (storageTodos) {
            setTodos(JSON.parse(storageTodos));
        }
    }, []);

    return (
        <div className='w-[400px] h-[500px] bg-slate-200 rounded-[5px] flex flex-col justify-start items-center gap-4 p-[24px]'>
            <h1 className='text-[24px] font-bold'>TODO APP</h1>
            <div className="flex justify-between items-center w-full">
                <input
                    className='w-full h-[35px] rounded-tl-[5px] rounded-bl-[5px] outline-none p-2'
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <button
                    className='w-[100px] h-full bg-blue-200 rounded-tr-[5px] rounded-br-[5px]'
                    onClick={handleAddTask}
                >
                    Add Task
                </button>
            </div>
            <ul className='w-full h-auto'>
                {todos.map((task, index) => (
                    <li 
                        className='w-full h-[35px] flex justify-between items-center bg-white rounded-tl-[5px] rounded-bl-[5px] outline-none mb-2 pl-2'
                        key={index}>
                        {task}
                        <button 
                            className='w-[100px] h-full bg-green-200 rounded-tr-[5px] rounded-br-[5px]'
                            onClick={() => handleDeleteTask(index)}>
                                Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
