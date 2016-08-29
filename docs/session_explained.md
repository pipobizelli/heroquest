# Session Json Explained

The session JSON contains several entities in order to control the GamePlay.
The objetivo of this document is to explain its data and convention.

## Session
  Represents a GameSession played by users.
  Through the Session model, we can understand the status of the Whole playing match.

## Session Setup
  Setup is the most important part of the session. It contains the initial preseet which will be replied, summoned and managed.

  - **Heroes:**
    Here we setup all heroes that will be summoned on the match.
    It must be done before the match, and each hero is binded to an Account.

  - **Enemies:**
    Contains all enemies that CAN appear on the match.
    Here we set its initial coordinates, but the client can only "Spawn"
    the monster when any Hero have line of sight of the monter.

  - **Furniture:**
    All furniture on the map. By saying furniture, we comphreend Doors,
    Walls, Tables and other objects.

## Summoned Enemies/Heroes

  When the GameStart, the Client asks to the Server which monsters can be rendered.
  The server will use the Coordinates and Line of Sight information to decide
  which monsters the Client can render.
  Once a monster or Hero is Summoned on the Map, everyone knows its presence.
  The Summoned entity refers to its Setup Id, and have the actual Body and Mind points, which are actively updated during the Gameplay.

## Session Turn

  If you notice, there is no coordinate at the Summoned entity. Its because, in order the decouple positioning from "entity existence", the "Turn" entity was
  created only to manage "Things" position (for Glossary, look at HeroQuest full Modeling Doc).

  Turn works by capturing each Thing coordinate and registering in the relative Turn number group.

  Every time a "Thing" moves, a new entry is registered on the Turn Collection.

## Example

  To see a session example, browse for "session_example.json".
  The same example is on Firebase also: https://heroquest-ca81f.firebaseio.com/
