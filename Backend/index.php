<?php


header("Access-Control-Allow-Origin: http://localhost:3000");


header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");


header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);  
}


$filePath = "../db.json";


if (file_exists($filePath)) {
    $fileContent = file_get_contents($filePath);
    $todosArray = json_decode($fileContent, true);
} else {
    $todosArray = [];
}


if ($_SERVER['REQUEST_METHOD'] === "GET") {
    echo json_encode($todosArray);
}


if ($_SERVER['REQUEST_METHOD'] === "POST") {

    if (isset($_POST['title']) && isset($_POST['desc'])) {

        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $imageTmpPath = $_FILES['image']['tmp_name'];
            $imageName = $_FILES['image']['name'];
            $uploadDir = '../public/'; 


            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $imagePath = $uploadDir . basename($imageName);


            if (move_uploaded_file($imageTmpPath, $imagePath)) {
                $imageUrl = $imagePath;  
            } else {
                $imageUrl = null;  
            }
        } else {
            $imageUrl = null;  
        }

        if ($imageUrl !== null) {
            $objImgUrl = substr($imageUrl, 9);
        }

        $randomId = uniqid();
        $newTodo = [
            "id" => $randomId,
            "title" => $_POST['title'], 
            "desc" => $_POST['desc'], 
            'image' => ($imageUrl === null) ? null : $objImgUrl 
        ];


        $todosArray[] = $newTodo;
        file_put_contents($filePath, json_encode($todosArray, JSON_PRETTY_PRINT));
        
        echo json_encode(['message' => 'Todo added successfully', 'newTodo' => $newTodo]);

    } else {
        echo json_encode(['error' => 'Invalid data, title and description are required']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    if ($id === 'clear-all') {
        file_put_contents($filePath, json_encode([]));
        echo json_encode(['message' => 'All todos cleared']);
    } else {
        if ($id) {
            $updatedTodos = array_filter($todosArray, function($todo) use ($id) {
                return $todo['id'] !== $id;  
            });

            $updatedTodos = array_values($updatedTodos);

            if (count($updatedTodos) < count($todosArray)) {
                file_put_contents($filePath, json_encode($updatedTodos, JSON_PRETTY_PRINT));
                echo json_encode(['message' => 'Todo deleted successfully', 'deletedTodoId' => $id]);
            } else {
                echo json_encode(['message' => 'Todo with this ID does not exist.']);
            }
        } else {
            echo json_encode(['message' => 'Invalid ID provided.']);
        }
    }
}


function parseMultipartData($rawData, $boundary) {
    $parts = explode($boundary, $rawData);
    $formData = [];

    foreach ($parts as $part) {
        if (empty($part)) {
            continue;
        }

        // Match the Content-Disposition header to get the form field name
        if (preg_match('/Content-Disposition: form-data; name="([^"]+)"/', $part, $matches)) {
            $fieldName = $matches[1];

            // Check if this is a file upload
            if (preg_match('/filename="([^"]+)"/', $part, $fileMatches)) {
                $fileName = $fileMatches[1];
                preg_match('/Content-Type: ([^ \r\n]+)/', $part, $fileTypeMatches);
                $fileType = $fileTypeMatches[1];
                preg_match('/\r\n\r\n(.*)$/s', $part, $fileDataMatches);
                $fileData = $fileDataMatches[1];

                $formData[$fieldName] = [
                    'file_name' => $fileName,
                    'file_type' => $fileType,
                    'file_data' => $fileData
                ];
            } else {
                preg_match('/\r\n\r\n(.*)$/s', $part, $dataMatches);
                $formData[$fieldName] = trim($dataMatches[1]);
            }
        }
    }

    return $formData;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get the raw PUT request data
    $rawData = file_get_contents("php://input");

    // Boundary is extracted from the Content-Type header
    $boundary = '--' . substr($_SERVER['CONTENT_TYPE'], strpos($_SERVER['CONTENT_TYPE'], "=") + 1);

    // Parse the multipart data
    $formData = parseMultipartData($rawData, $boundary);

    // Check if data exists
    if (isset($formData['id'])) {
        $id = $formData['id'];
        $todoFound = false;

        // Assuming $todosArray is already loaded from a file or database
        foreach ($todosArray as &$todo) {
            if ($todo['id'] === $id) {
                $todoFound = true;
                $todo['title'] = $formData['title'];
                $todo['desc'] = $formData['desc'];

                // Handle file upload (image)
                if (isset($formData['image'])) {
                    // Handle the uploaded file data (e.g., save it to the server)
                    $fileData = $formData['image']['file_data'];
                    $fileName = $formData['image']['file_name'];
                    $uploadDir = '../public/';
                    $filePath = $uploadDir . $fileName;

                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    file_put_contents($filePath, $fileData);
                    $todo['image'] = $filePath;
                }

                // Save the updated data
                file_put_contents($filePath, json_encode($todosArray, JSON_PRETTY_PRINT));

                // Return the updated todo
                echo json_encode(['message' => 'Todo updated successfully', 'updatedTodo' => $todo]);
                break;
            }
        }

        if (!$todoFound) {
            echo json_encode(['error' => 'Todo not found']);
        }
    }
}



