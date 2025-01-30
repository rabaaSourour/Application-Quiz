<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\Security\Http\Authenticator\FormLoginAuthenticator;

class LoginController extends AbstractController
{
    #[Route("/login", name: "login", methods: ["POST"])]
    public function login(
        Request $request, 
        EntityManagerInterface $entityManager, 
        UserPasswordHasherInterface $passwordHasher,
        UserAuthenticatorInterface $userAuthenticator,
        FormLoginAuthenticator $authenticator
    ): Response {
        $name = $request->request->get('name');
        $password = $request->request->get('password');

        $user = $entityManager->getRepository(User::class)->findOneBy(['name' => $name]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            $this->addFlash('error', 'Identifiants incorrects.');
            return $this->redirectToRoute('login');
        }

        return $userAuthenticator->authenticateUser($user, $authenticator, $request);
    }
}





