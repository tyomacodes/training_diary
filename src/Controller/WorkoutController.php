<?php

namespace App\Controller;

use App\Entity\Workout;
use App\Form\WorkoutType;
use App\Repository\WorkoutRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/workout")
 */
class WorkoutController extends AbstractController
{
    /**
     * @Route("/", name="app_workout_index", methods={"GET"})
     */
    public function index(WorkoutRepository $workoutRepository): Response
    {
        return $this->render('workout/index.html.twig', [
            'workouts' => $workoutRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="app_workout_new", methods={"GET", "POST"})
     */
    public function new(Request $request, WorkoutRepository $workoutRepository): Response
    {
        $workout = new Workout();
        $form = $this->createForm(WorkoutType::class, $workout);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $workoutRepository->add($workout);
            return $this->redirectToRoute('app_workout_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('workout/new.html.twig', [
            'workout' => $workout,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_workout_show", methods={"GET"})
     */
    public function show(Workout $workout): Response
    {
        return $this->render('workout/show.html.twig', [
            'workout' => $workout,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="app_workout_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, Workout $workout, WorkoutRepository $workoutRepository): Response
    {
        $form = $this->createForm(WorkoutType::class, $workout);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $workoutRepository->add($workout);
            return $this->redirectToRoute('app_workout_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('workout/edit.html.twig', [
            'workout' => $workout,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_workout_delete", methods={"POST"})
     */
    public function delete(Request $request, Workout $workout, WorkoutRepository $workoutRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$workout->getId(), $request->request->get('_token'))) {
            $workoutRepository->remove($workout);
        }

        return $this->redirectToRoute('app_workout_index', [], Response::HTTP_SEE_OTHER);
    }
}
