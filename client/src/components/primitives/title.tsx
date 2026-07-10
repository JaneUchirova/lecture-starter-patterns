import { ChangeEvent, useEffect, useState } from "react";

import { useComponentVisible } from "src/hooks/useComponentVisible";
import { BasicTitle } from "./styled/basic-title";
import { TitleContainer } from "./styled/title-container";
import { TitleInput } from "./styled/title-input";

type Props = {
  fontSize: "x-large" | "large" | "medium";
  isBold?: boolean;
  title: string;
  width?: number;
  onChange: (value: string) => void;
};

export const Title = ({ onChange, title, fontSize, isBold, width }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [value, setValue] = useState(title);

  useEffect(() => setValue(title), [title]);

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const finishEditing = () => {
    setIsComponentVisible(false);
    if (value !== title) onChange(value);
  };

  return (
    <TitleContainer className="title-container" ref={ref}>
      {isComponentVisible ? (
        <TitleInput
          className="title-input"
          value={value}
          onChange={onEdit}
          onBlur={finishEditing}
          fontSize={fontSize}
          isBold={isBold}
          autoFocus={isComponentVisible}
          width={width ?? 240}
        />
      ) : (
        <BasicTitle
          className="title-content"
          onClick={() => setIsComponentVisible(true)}
        >
          {value}
        </BasicTitle>
      )}
    </TitleContainer>
  );
};
