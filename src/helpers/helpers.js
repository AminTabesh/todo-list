// postTodo.js
export const postTodo = (data) => {
  return fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getTodos = async () => {
  const data = await fetch("http://localhost:5000/todos");

  return data.json();
};
export const removeTodo = async (id) => {
  const data = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "DELETE",
  });

  return data.json();
};

export const clearTodos = async () => {
  const data = await fetch("http://localhost:5000/todos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([]),
  });

  return data.json();
};

export const editTodo = async (newTodo) => {
  const response = await fetch(`http://localhost:5000/todos/${newTodo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  // Check if the response is successful
  if (!response.ok) {
    throw new Error("Failed to update the todo");
  }

  // Parse the JSON response
  return response.json();
};
