import { CreatorInput } from "src/components/primitives/creator-input";
import { ColumnCreatorContainer } from "../styled/column-creator-container";

type Props = {
  onCreateList: (name: string) => void;
};

export const ColumnCreatorInput = ({ onCreateList }: Props) => {
  return (
    <ColumnCreatorContainer className="column-creator-container">
      <CreatorInput onSubmit={onCreateList} />
    </ColumnCreatorContainer>
  );
};
