<?php
class WordGameController
{

    private $command;

    public function __construct($command)
    {
        $this->command = $command;
    }

    public function run()
    {
        switch ($this->command) {
            case "wordGuess":
                $this->wordGuess();
                break;
            case "playAgain":
                $this->playAgain();
            case "endGame":
            default:
                $this->destroySession();
                break;
        }
    }

    // Clear all the cookies that we've set
    private function destroySession()
    {
        unset($_SESSION["correct_answer"]);
        unset($_SESSION["num_guesses"]);
        unset($_SESSION["guesses"]);
        session_destroy();
    }

    // Load a wordGuess from the API
    private function loadWordGuess()
    {
        $triviaData = file("http://www.cs.virginia.edu/~jh2jf/courses/cs4640/spring2022/wordlist.txt");
        $rand_idx = rand(0, count($triviaData) - 1);
        return trim($triviaData[$rand_idx]);
    }

    // Display the wordGuess template (and handle wordGuess logic)
    public function wordGuess()
    {

        $message = NULL;
        
        //set user information for the page from the session
        $user = [
            "num_guesses" => $_SESSION["num_guesses"],
            "guesses" => $_SESSION["guesses"]
        ];

        if (!isset($_SESSION["correct_answer"])) {
            //load the wordGuess
            $correctWord = $this->loadWordGuess();
            if ($correctWord == null) {
                die("No word available");
            }
            $_SESSION["correct_answer"] = $correctWord;
        }

        // if the user submitted an guess, check it
        if (isset($_POST["guess"])) {
            $guess = strtolower(trim($_POST["guess"]));

            if ($_SESSION["correct_answer"] == $guess) {
                // user guessed correctly -- perhaps we should also be better about how we
                // verify their guesss, perhaps use strtolower() to compare lower case only.
                $message = "<div class='alert alert-success'><b>$guess</b> was correct!</div>";

                // Update the session
                $user["num_guesses"] += 1;
                array_push($user["guesses"], $guess);
                // Update the session
                $_SESSION["num_guesses"] = $user["num_guesses"];
                $_SESSION["guesses"] = $user["guesses"];
                //unset the correct answer session so that a new word can be reloaded next time
                header("Location: ?command=endGame");
                //if the answer if incorrect,
            } else {
                // Update the number of guesses and guesses
                $user["num_guesses"] += 1;
                array_push($user["guesses"], $guess);
                // Update the session
                $_SESSION["num_guesses"] = $user["num_guesses"];
                $_SESSION["guesses"] = $user["guesses"];
                
                //uncomment this line when sumbitting
                $message = "<div class='alert alert-danger'><b>$guess</b> was incorrect! Check previous guesses for more hints.</div>";
            }
        }

        include("templates/game.php");
    }

    public function playAgain()
    {
        $_SESSION["num_guesses"] = 0;
        $_SESSION["guesses"] = 0;
    }
}