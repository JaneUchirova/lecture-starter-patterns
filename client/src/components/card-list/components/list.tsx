import { DroppableProvided } from "@hello-pangea/dnd";

import type { Card } from "src/common/types/types";
import { DropZone } from "../styled/drop-zone";
import { Cards } from "./cards";

type Props = {
  listId: string;
  dropProvided: DroppableProvided;
  cards: Card[];
};

const List = ({ listId, cards, dropProvided }: Props) => {
  return (
    <div className="list-container">
      <DropZone ref={dropProvided.innerRef}>
        <Cards listId={listId} cards={cards} />
        {dropProvided.placeholder}
      </DropZone>
    </div>
  );
};

export { List };
