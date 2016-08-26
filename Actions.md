## Thing
  Represents anything that can exist on the map.

  1. Capabilities
    - X/Y Positioning
  2. ThingActions
    - None

## Actor << Thing
  Represents a Thing which is a Living Being on the map.

  1. Capabilities
    - Manage Health
    - Line of Sight
    - Do Actions
    - Proccess Controllable

  2. ThingActions
    - Move
    - Attack
    - Use Spell
    - Look for Treasure
    - Open a Chest
    - Search for Traps and Secret Doors
    - Disarm a Trap
    - Pass an Item
    - Use Item
    - Picking Things

## ActorStates
  Represents possible States that Living Beings can have.

  1. Capabilities
    - Setup Events for States
    - Fire Triggers for States

  2. Possible States:
    - Iddle
    - Active Turn
    - Dead

## ActorConditions
  Represents possible conditions that may affect Living Beings.

  1. Capabilities
    - Death

## ThingActions
  Represents possible actions that Things on the Map can execute (Alive or not)

  1. Capabilities
    - Proccess an ActionType
    - Return an ActionResult

## Hero << Actor
  Represents an actual Player Character. One session can have more than One Hero.
  Heroes are different from Actors because they are controlled by the player.

  1. Capabilities
    - Input/Control (binding Actions with Keys)

## Enemy << Actor
  Represents an actual Enemy Actor (Non-Playable-Character).
  Enemy are different from Actors because they have specific AI Behaviors.

  1. Capabilities
    - Auto execute Actions using AI

## Item << Thing
  Represents a Thing that can be "Stored" by any Actor.

  1. Capabilities
    - Itens can be consumed
    - Itens can allow Stacking (multiple use)
    - Provide an Effect

## Equipment << Item
  Represents an Item that can be "Equipped", affecting the User positively or negatively

  1. Capabilities
    - Equipments can be Equipped.
    - Equpments ca
    - Equipments does not have to be consumed to provide its effects.

## Dice
  Represents an Entity that process random values and returns an Action Return (TRUE/FALSE)

TODO: TODO
