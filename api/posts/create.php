<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once '../../config/Database.php';
include_once '../../modules/Post.php';

$database = new Database();
$db = $database->connect();

// Instanantie blog posts object
$post  = new Post($db);

//Get raw posted data

$data = json_decode(file_get_contents("php://input"));
 
echo $data;


$post->title = $data->title;
$post->body = $data->body;
$post->author = $data->author;
$post->category_id = $data->category_id;

if($post->create()){
    echo json_encode(
        array('message'=>"Post Created")
    );
}else{
    echo json_encode(
        array('message'=>"Post not Created")
    );
}