<?php
declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Form\SignUpFormType;
use App\Service\AuthService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    /**
     * @Route("/sign-in")
     * @param Request $request
     * @return Response
     */
    public function signIn(Request $request): Response
    {
        return $this->render('auth/sign_in.html.twig');
    }
}
