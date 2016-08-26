# HeroQuest - v1.0.0

O objetivo desse primeiro  MVP é fazer uma versão básica dos conceitos do jogo de tabuleiro HeroQuest.

## Regras
Cada criatura, seja ela player ou NPC, tem um turno. Em cada turno é possivel realizar 2 ações, entre elas:

* Movimento
* Combater

###Movimento
Os personagens controlados, tem que realizar um teste de movimento para saber o quanto vão poder percorrer pelo mapa do jogo. Já os monstros e outros NPCs tem um numero fixo de movimento podendo optar andar o máximo ou menos, não necessitando do teste de movimento. Não é possivel atravessar pareder, nem andar na diagonal.

O movimento minimo é de um tile, e para tal não é necessário o teste de movimento.

###Teste de Moviemtno
É um teste realizado pelo personagem para saber, em um range de 2 a 12 quantos tiles ele podera percorrer. Não é necessario se mover a quantia total, e não é possivel atravessar paredes nem um tile ja ocupado. 

###Combate
Tanto um personagem quanto um NPC podem, em seu turno, atacar outra criatura.

O combate funciona da seguinte maneira:

1. O atacante deve ser bem sucedido em um teste de ataque, para realizar um ataque efetivo. 
2. O defensor, após o teste de ataque realizado, deve ser bem sucedido em um teste de defesa, para evitar os ataques efetivos.

Obs.: É preciso estar adjacente para atacar e não é possivel atacar na diagonal.

###Teste de Ataque
É um teste realizado para saber a eficiencia do ataque. Independente de quem ataca, existe 50% de chance de efetividade.

###Teste de Defesa
Após realizado o teste de ataque, o alvo do ataque realiza um teste de defesa. Assim como no teste de ataque o alvo tem 50% de chance de anular um ataque efetivo.

Se não hover nenhum ataque efetivo, não há necessidade do teste de defesa.

###Dano
Caso houver um ataque efetivo, e o mesmo não for anulado pelo teste de defesa, é causado 1 ponto de dano no alvo. O dano causado subitrai a vida do alvo, até o mesmo morrer e não poder perder mais vida.

É causado somente 1 ponto por ataque efetivado.

###Vida e Morte
Tanto o Player quanto os NPCs têm uma quantidade limitada de vida, que ao zerar são mortos.

###Visão
Cada criatura no jogo (Player ou NPC) tem um campo de visão. O campo de visão deve ser em forma de cone a partir do ponto onde o alvo esta e adiante para sua frente. Uma vez revelado o alvo, ele não some mais do mapa.

Não é possivel ver atravez de paredes e portas fechadas.