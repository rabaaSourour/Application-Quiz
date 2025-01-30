<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\HttpClient;

class QuizController extends AbstractController
{
    /**
     * @Route("/api/quiz", name="get_quiz_data", methods={"GET"})
     */
    public function home()
    {
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/login", name="login")
     */
    public function login()
    {
        return $this->render('login.html.twig');
    }

    /**
     * @Route("/register", name="register")
     */
    public function register()
    {
        return $this->render('register.html.twig');
    }
    
    public function getQuizData(): JsonResponse
    {   
        $data = [
            'quiz' => 'Sample Quiz Data',
        ];

        return $this->json($data);
    }

    /**
     * @Route("/api/quiz/create", name="create_quiz", methods={"POST"})
     */
    public function createQuiz(HttpClientInterface $client): JsonResponse
    {
        $response = $client->request('POST', 'https://4caed1f0-e49f-4ab6-a038-9ed66d622bfe.mock.pstmn.io/api/quiz', [
            'json' => [
                'question' => 'What is 2 + 2?',
                'options' => ['1', '2', '3', '4'],
                'answer' => '4',
            ],
        ]);

        $data = $response->toArray();

        return $this->json($data);
    }
}
