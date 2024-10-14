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
