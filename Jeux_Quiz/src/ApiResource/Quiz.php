<?php

namespace App\ApiResource;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Quiz;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity
 */
class QuizResource
{
    // Si l'entité Quiz est déjà créée, tu peux lier cette classe à l'entité Quiz en la réutilisant.

    private $id;
    private $question;
    private $score;
    private $quiz;

    // Ajoute ici des getter et setter pour les propriétés
}
