import React, { useState, useEffect } from 'react';
import Task from "./Task";
import FormAddTask from "./FormAddTask";
import Coopernet from "./../services/Coopernet";

const initialValue = [];

let showFormAddTask = false;

function App() {
  // Déclare une nouvelle variable d'état, que l'on va appeler "count"
  // useState renvoie un tableau. Le premier élément de ce dernier est un état et le deuxième élément est une référence vers la fonction qui permet de modifier cet état.
  const [tasks, setTasks] = useState(initialValue);
  const fetchTask = async () => {
    // Récupération des tâches : 
    const server_tasks = await Coopernet.getTasks();
    console.log('tasks récupérées sur le serveur : ', server_tasks);

    //Modification du state tasks
    setTasks(server_tasks);
  }
  // Equivalent du componentDidMount si le deuxième paramètre de useEffect est []
  useEffect( () => {
    const testLocalStorageToken = async() => {
      try {
        if (await Coopernet.getStorage()) {
          console.log('Je suis dans le cas où mon local storage me permet de me connecter');
          await fetchTask();
        } else {
          // Je modifie le login et le mot de passe
          // Il faudra faire en sorte d'appeler ici le component de formulaire de login
          Coopernet.setUsername("y");
          Coopernet.setPassword("y");
          await Coopernet.setOAuthToken();
          // Si ce code est exécuté, c'est que je suis bien connecté
          console.log("Je suis maintenant bien connecté au serveur de Coopernet");

          await fetchTask();
        }
      } catch (error) {
        // Ici, il faudrait afficher dans l'interface qu'il y a eu une erreur d'identification et donner un email de l'administrateur par exemple
        console.error("Erreur attrapée : " + error);
      }
    };
    testLocalStorageToken();
  }, []);

  const handleClickDeleteTask = (id, index) => {
    console.log('Dans handleClickDeleteTask');
    Coopernet.deleteTask(id)
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const handleClickValidateTask = (currentTask) => {
    console.log('Dans handleClickValidateTask')
    console.log(currentTask)
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id){
          if (task.isValidate) {
            task.isValidate = null;
          } else {
            task.isValidate = 1;
          }
          Coopernet.updateTask(task);
          console.log(task)
        }
        return task;
      })
    );
  };

  const addTaskToServer = async (label, description, endDate) => {
    console.log('Dans addTaskToServer')
    let task = {'label': label, 'description' : description, 'ended':endDate};
    const newTaskIdTime = await Coopernet.addTask(task);
    task = {'label': label, 'description' : description, 'ended':endDate, 'isValidate' : false, 'id' : newTaskIdTime.id, 'created' : newTaskIdTime.created};
    console.log("c'est ma nouvelle tache", task);
    setTasks([...tasks, task]);
  };

  const readableDate = (created) => {
    const date = new Date(created*1000)
    return date.toLocaleDateString()
  }

  return (
    <div className="App container">
      <div className="d-flex justify-content-between my-4">
        <button
          onClick ={(event) => {
            showFormAddTask = !showFormAddTask;
          }}
        className="btn btn-primary">Ajouter une tâche</button>
        <button className="btn btn-secondary">Se déconnecter</button>
      </div>
        {showFormAddTask && <FormAddTask 
          addTaskToServer={addTaskToServer}
          showFormAddTask={showFormAddTask}  
        />}
      <h1 className="mb-4 mt-5">Tâches en cours</h1>
      {tasks.map((task, index) => (
        !task.isValidate && <Task 
          task={task} 
          key={task.id}
          handleClickDeleteTask={handleClickDeleteTask}
          handleClickValidateTask={handleClickValidateTask}
          readableDate={readableDate}
          index={index}
        />
      ))}

      <h1 className="mb-4 mt-5">Tâches validées</h1>
      {tasks.map((task, index) => (
        task.isValidate && <Task 
          task={task} 
          key={task.id}
          handleClickDeleteTask={handleClickDeleteTask}
          handleClickValidateTask={handleClickValidateTask}
          readableDate={readableDate}
          index={index}
        />
      ))}
    </div>
  );
}

export default App;
