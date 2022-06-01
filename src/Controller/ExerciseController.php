<?php
declare(strict_types=1);
namespace App\Controller;

use App\Entity\Exercise;
use App\Form\ExerciseType;
use App\Repository\ExerciseRepository;
use App\Service\ExerciseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/exercise")
 */
class ExerciseController extends AbstractController
{
    /**
     * @Route("/all")
     */
    public function all(ExerciseService $service): JsonResponse
    {
        $all = $service->allExercises();
        return new JsonResponse($all);
    }

    /**
     * @Route("/add-exercise")
     */
    public function addExercise(ExerciseService $service): JsonResponse
    {
        $all = $service->allExercises();
        $view = $this->renderView('/workout/_add_exercise.html.twig', ['all' => $all]);

        return new JsonResponse($all);
    }

    /**
     * @Route("/", name="app_exercise_index", methods={"GET"})
     */
    public function index(ExerciseRepository $exerciseRepository): Response
    {
        return $this->render('exercise/index.html.twig', [
            'exercises' => $exerciseRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="app_exercise_new", methods={"GET", "POST"})
     */
    public function new(Request $request, ExerciseRepository $exerciseRepository): Response
    {
        $exercise = new Exercise();
        $form = $this->createForm(ExerciseType::class, $exercise);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $exerciseRepository->add($exercise);
            return $this->redirectToRoute('app_exercise_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('exercise/new.html.twig', [
            'exercise' => $exercise,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_exercise_show", methods={"GET"})
     */
    public function show(Exercise $exercise): Response
    {
        return $this->render('exercise/show.html.twig', [
            'exercise' => $exercise,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="app_exercise_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, Exercise $exercise, ExerciseRepository $exerciseRepository): Response
    {
        $form = $this->createForm(ExerciseType::class, $exercise);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $exerciseRepository->add($exercise);
            return $this->redirectToRoute('app_exercise_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('exercise/edit.html.twig', [
            'exercise' => $exercise,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_exercise_delete", methods={"POST"})
     */
    public function delete(Request $request, Exercise $exercise, ExerciseRepository $exerciseRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$exercise->getId(), $request->request->get('_token'))) {
            $exerciseRepository->remove($exercise);
        }

        return $this->redirectToRoute('app_exercise_index', [], Response::HTTP_SEE_OTHER);
    }
}
