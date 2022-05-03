<?php

// REQUIRED HEADERS FOR CORS
// Allow access to our development server, localhost:4200
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

// $json = file_get_contents("php://input");
// $input = json_decode($json, true);

$output = [
    "time" => date("Y-m-d g:i a")
];

// Load a wordGuess from the API
$triviaData = file("http://www.cs.virginia.edu/~jh2jf/courses/cs4640/spring2022/wordlist.txt");
$rand_idx = rand(0, count($triviaData) - 1);
$rand_word = trim($triviaData[$rand_idx]);

$output["word"] = $rand_word;

header("Content-Type: application/json");
echo json_encode($output, JSON_PRETTY_PRINT);