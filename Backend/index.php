<?php

// Allow cross-origin requests from your React app's origin (localhost:3000)
header("Access-Control-Allow-Origin: http://localhost:3000");

// Allow specific methods (GET, POST, PUT, DELETE)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow the headers that can be sent with the request
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$filePath = "../db.json";
$fileContent = file_get_contents($filePath);
$todosArray = json_decode($fileContent, true);




if ($_SERVER['REQUEST_METHOD'] === "GET") {
    echo json_encode($todosArray);
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    if (isset($data['title']) && isset($data['desc'])) {
        
        $randomId = uniqid();

        $newTodo = ["id" => $randomId ,"title" => $data['title'], "desc" => $data['desc'], 'image' => isset($data['image']) ? $data['image'] : null]; //add default path later

        if(file_exists($filePath)){
            $existingTodos = json_decode(file_get_contents($filePath, true));
        }else{
            $existingTodos = [];
        }

        $existingTodos[] = $newTodo;
        

        file_put_contents($filePath, json_encode($existingTodos, JSON_PRETTY_PRINT));
        
        echo json_encode(['message' => 'Todo added successfully', 'newTodo' => $newTodo]);
        
    } else {
        echo json_encode(['error' => 'Invalid data, title and description are required']);
    }

}

?>
