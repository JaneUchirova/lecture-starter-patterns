import { Card } from "../data/models/card";
import { List } from "../data/models/list";

const toDo = new List("Backlog");
toDo.cards = [
  new Card(
    "Implement list renaming functionality",
    "Expected result - ability to modify the list name"
  ),
  new Card(
    "Implement card creation feature",
    "Expected result - ability to add new cards to lists"
  ),
  new Card(
    "Implement card deletion functionality",
    "Expected result - ability to remove cards when delete button is pressed"
  ),
  new Card(
    "Implement card title renaming",
    "Expected result - possibility to change the card title"
  ),
  new Card(
    "Implement card description renaming",
    "Expected result - possibility to change the card description"
  ),
  new Card(
    "Implement task duplication feature",
    'Expected result - ability to duplicate cards. Should be implemented using Prototype pattern. New ID should be generated for copied card. The card name should include "duplicate" suffix'
  ),
  new Card(
    "Implement logging on server side",
    "Expected result - implemented logging with 3 levels: info, warn, error. Should be implemented using Observer pattern. There should be 2 loggers: first will write only errors into console, second will write all logs into file"
  ),
  new Card(
    "Implement logging of reorder action",
    "Expected result - implemented logging for the ReorderService (logging proxy). Should be implemented using Proxy pattern. Should be logged for each card/list with the info when it was moved"
  ),
];

const inProgress = new List("Development");
inProgress.cards = [
  new Card(
    "Implement list creation functionality",
    "Expected result - ability to add new lists to the board"
  ),
];

export const lists = [toDo, inProgress];
