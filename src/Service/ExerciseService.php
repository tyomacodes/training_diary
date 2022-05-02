<?php
declare(strict_types=1);

namespace App\Service;

use App\Repository\ExerciseRepository;

class ExerciseService
{
    protected ExerciseRepository $repository;

    public function __construct(ExerciseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function allExercises(): array
    {
        return  $this->repository->allIdsNames();
    }
}