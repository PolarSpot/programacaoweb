import React from "react";
import "./App.css";

const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [tarefa, setTarefa] = React.useState("");
  const [edicao, setEdicao] = React.useState(null);
  const [edTexto, setEdTexto] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("tarefas");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTarefas(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(tarefas);
    localStorage.setItem("tarefas", json);
  }, [tarefas]);

  function handleSubmit(e) {
    e.preventDefault();

    const nova = {
      id: new Date().getTime(),
      text: tarefa,
      completed: false,
    };
    setTarefas([...tarefas].concat(nova));
    setTarefa("");
  }

  function deletarTarefa(id) {
    let tarefasAtt = [...tarefas].filter((tarefa) => tarefa.id !== id);
    setTarefas(tarefasAtt);
  }

  function toggleComplete(id) {
    let tarefasAtt = [...tarefas].map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.completed = !tarefa.completed;
      }
      return tarefa;
    });
    setTarefas(tarefasAtt);
  }

  function submitEdits(id) {
    const tarefasAtt = [...tarefas].map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.text = edTexto;
      }
      return tarefa;
    });
    setTarefas(tarefasAtt);
    setEdicao(null);
  }

  return (
    <div id="todo-list">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTarefa(e.target.value)}
          value={tarefa}
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>
      {tarefas.map((tarefa) => (
        <div key={tarefa.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={tarefa.completed}
              onChange={() => toggleComplete(tarefa.id)}
            />
            {tarefa.id === edicao ? (
              <input
                type="text"
                onChange={(e) => setEdTexto(e.target.value)}
              />
            ) : (
              <div>{tarefa.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {tarefa.id === edicao ? (
              <button onClick={() => submitEdits(tarefa.id)}>Concluir</button>
            ) : (
              <button onClick={() => setEdicao(tarefa.id)}>Editar</button>
            )}

            <button onClick={() => deletarTarefa(tarefa.id)}>Deletar</button>
          </div>
        </div>
      ))}
      <footer className="footer">
         <h2>
            Feito por: Daniel, João A, Thomas e Vitor
         </h2>
      </footer>
    </div>
  );
};

export default App;
