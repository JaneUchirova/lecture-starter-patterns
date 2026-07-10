import { useTheme } from "@emotion/react";

import { Icon } from "../icon/icon";
import { Button } from "./styled/button";

type Props = {
  onClick: () => void;
  color?: string;
};

const DeleteButton = ({ onClick, color }: Props) => {
  const theme = useTheme();

  return (
    <Button
      className="delete-btn"
      onClick={onClick}
      color={color ?? theme.colors.N30}
    >
      <Icon iconName="delete" />
    </Button>
  );
};

export { DeleteButton };
