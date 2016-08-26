# HeroQuest - v1.0.0

O objetivo desse primeiro  MVC é fazer uma versão básica dos conceitos do jogo de tabuleiro HeroQuest.

## Regras
Cada criatura, seja ela player ou NPC, tem um turno. Em cada turno é possivel realizar 2 ações, entre elas:

* Movimento
* Combater

###Movimento
Os personagens controlados, tem um range de 2 a 12 tiles que podem percorrer pelo mapa do jogo. Já os monstros e outros NPCs tem um numero fixo de movimento podendo optar andar o máximo ou menos. Não é possivel atravessar pareder, nem andar na diagonal.

###Combate
Tanto um personagem quanto um NPC podem, em seu turno, atacar outra criatura.

O combate funciona da seguinte maneira:

1. O atacante tem 3/6 chance de acertar o ataque. 
2. O defensor, sendo player tem 2/6 chance de defesa, sendo NPC tem 1/6 de chance de defesa.

Obs.: É preciso estar adjacente para atacar e não é possivel atacar na diagonal.

###Vida e Morte
Tanto o Player quanto os NPCs têm uma quantidade limitada de vida, que ao zerar são mortos.

###Visão
Cada criatura no jogo (Player ou NPC) tem um campo de visão. O campo de visão deve ser em forma de cone a partir do ponto onde o alvo esta e adiante para sua frente. Uma vez revelado o alvo, ele não some mais do mapa.

Não é possivel ver atravez de paredes e portas fechadas.