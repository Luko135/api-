<?php
//headers
header('Access-Controll-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../modules/Post.php';

$database = new Database();
$db = $database->connect();

// Instanantie blog posts object
$post  = new Post($db);

//Blog post query

$resoult = $post->read();

//Get row count 
$num = $resoult->rowCount();

//check if anny posts
if($num>0){
    $posts_arr = array();
    $posts_arr['data'] = array();

    while($row = $resoult->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
            'id' => $id,
            'title'=>$title,
            'body'=> html_entity_decode($body),
            'author'=>$author,
            'category_id'=>$category_id,
            'category_name'=>$category_name
        );
        //push to "data"
        array_push($posts_arr['data'], $post_item);
    }
    //turn into JSON
    echo json_encode($posts_arr);

}else{
    echo json_encode(
        array('message'=>'No Posts Found')
    );
}
