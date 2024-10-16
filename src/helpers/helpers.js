// postTodo.js
export const postTodo = (data) => {
  return fetch("http://localhost:2000/", {
    method: "POST",
    body: data,
  }).then((res) => res.json());
};

export const getTodos = async () => {
  const data = await fetch("http://localhost:2000/");

  return data.json();
};

export const removeTodo = async (id) => {
  const data = await fetch(`http://localhost:2000`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return data.json();
};

export const clearTodos = async () => {
  const data = await fetch("http://localhost:2000", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: "clear-all" }),
  });

  return data.json();
};

export const editTodo = async (newTodo) => {
  return fetch("http://localhost:2000/", {
    method: "PUT",
    body: newTodo,
  }).then((res) => res.json());
};
