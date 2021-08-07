import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; //não vai deixar criar um task vazia

    const newTask = {
      id: Math.random(), //gerador randomico didatico de id
      title: newTaskTitle, //o proprio newTaskTitle
      isComplete: false //não permite adicionar uma task que não esteja completa
    }
    setTasks(oldState => [...oldState, newTask]); //irá adicionar no state uma nova task, sempre por ultimo. (poderia utilizar o tasks no lugar no oldstate, porem o oldstate performa melhor.)
    setNewTaskTitle(''); //sempre que eu adicionar uma nova task ele vai resetar o imput
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id === id ? { //será necessário ir em todas as nossas tasks, mapear todas elas, pegar a task que tenha o id especifico, alterar o valor dela, e setar o valor do estado.
      ...task, //pego o historico de tasks.
      isComplete: !task.isComplete //estou pegando a task antiga e sobreescrevendo um propriedade que é o contrario do valor anterior que ela tinha. 
    } : task); //se o task id for diferente do id ela retorna a task do jeito que ela estava originalmente.
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id); //irá remover quando acionado icon trash somente o item desejado, mantendo os demais. Removendo pelo ID.
    setTasks(filteredTasks) //serve para salvar o nosso estado. Irá aparecer a operação filteredTasks.
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}