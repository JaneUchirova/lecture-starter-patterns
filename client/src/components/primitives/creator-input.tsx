import React, { useState } from "react";

import { AddButton } from "./add-button";
import { Input } from "./styled/input";

type Props = {
  onSubmit: (value: string) => void;
};

const CreatorInput = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");

  const onClick = () => {
    if (!name.trim()) {
      return;
    }
    setName("");
    onSubmit(name.trim());
  };

  return (
    <React.Fragment>
      <Input
        className="creator-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fontSize="medium"
        width={250}
      />
      <AddButton onClick={onClick} />
    </React.Fragment>
  );
};

export { CreatorInput };
