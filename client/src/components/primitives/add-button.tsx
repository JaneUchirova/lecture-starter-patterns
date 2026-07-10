import { Icon } from "../icon/icon";
import { Button } from "./styled/button";
import { theme } from "src/theme/theme";

type Props = {
  onClick: () => void;
};

const AddButton = ({ onClick }: Props) => {
  return (
    <Button className="add-btn" onClick={onClick} color={theme.colors.N30}>
      <Icon iconName="add" />
    </Button>
  );
};

export { AddButton };
