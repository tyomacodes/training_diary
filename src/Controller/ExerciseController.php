<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\ExerciseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ExerciseController extends AbstractController
{
    /**
     * @Route("/api/exercises/all")
     */
    public function all(ExerciseService $service): JsonResponse
    {
        $all = $service->allExercises();
        return new JsonResponse($all);
    }

    /**
     * @Route("/api/add-exercise")
     */
    public function addExercise(ExerciseService $service): JsonResponse
    {
        $all = $service->allExercises();
        $view = $this->renderView('/workout/_add_exercise.html.twig', ['all' => $all]);

        return new JsonResponse($all);
    }
}
