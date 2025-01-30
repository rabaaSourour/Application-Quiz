<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'questions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Quiz $no = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNo(): ?Quiz
    {
        return $this->no;
    }

    public function setNo(?Quiz $no): static
    {
        $this->no = $no;

        return $this;
    }
}
