import { useTheme } from "@emotion/react";

import { Icon } from "../icon/icon";
import { Button } from "./styled/button";

type Props = {
  onClick: () => void;
};

const CopyButton = ({ onClick }: Props) => {
  const theme = useTheme();

  return (
    <Button className="copy-btn" onClick={onClick} color={theme.colors.N30}>
      <Icon iconName="copy" />
    </Button>
  );
};

export { CopyButton };
