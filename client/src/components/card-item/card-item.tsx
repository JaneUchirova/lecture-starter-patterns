import type { DraggableProvided } from "@hello-pangea/dnd";

import { type Card } from "src/common/types/types";
import { CardEvent } from "src/common/enums/enums";
import { SocketContext } from "src/context/socket";
import { useContext } from "react";
import { CopyButton } from "../primitives/copy-button";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Text } from "../primitives/text";
import { Title } from "../primitives/title";
import { Container } from "./styled/container";
import { Content } from "./styled/content";
import { Footer } from "./styled/footer";

type Props = {
  listId: string;
  card: Card;
  isDragging: boolean;
  provided: DraggableProvided;
};

export const CardItem = ({ listId, card, isDragging, provided }: Props) => {
  const socket = useContext(SocketContext);

  return (
    <Container
      className="card-container"
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={card.id}
      aria-label={card.name}
    >
      <Content>
        <Title
          onChange={(name) =>
            socket.emit(CardEvent.RENAME, listId, card.id, name)
          }
          title={card.name}
          fontSize="large"
          isBold
        />
        <Text
          text={card.description}
          onChange={(description) =>
            socket.emit(
              CardEvent.CHANGE_DESCRIPTION,
              listId,
              card.id,
              description
            )
          }
        />
        <Footer>
          <DeleteButton
            onClick={() => socket.emit(CardEvent.DELETE, listId, card.id)}
          />
          <Splitter />
          <CopyButton
            onClick={() => socket.emit(CardEvent.DUPLICATE, listId, card.id)}
          />
        </Footer>
      </Content>
    </Container>
  );
};
