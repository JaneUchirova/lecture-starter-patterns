import { ChangeEvent, useEffect, useState } from "react";

import { useComponentVisible } from "src/hooks/useComponentVisible";
import { BasicText } from "./styled/basic-text";
import { TextContainer } from "./styled/text-container";
import { TextInput } from "./styled/text-input";

type Props = {
  text: string;
  onChange: (value: string) => void;
};

export const Text = ({ onChange, text }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [value, setValue] = useState(text);

  useEffect(() => setValue(text), [text]);

  const onEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const finishEditing = () => {
    setIsComponentVisible(false);
    if (value !== text) onChange(value);
  };

  return (
    <TextContainer className="text-container" ref={ref}>
      {isComponentVisible ? (
        <TextInput
          className="text-input"
          value={value}
          onChange={onEdit}
          onBlur={finishEditing}
          autoFocus={isComponentVisible}
        />
      ) : (
        <BasicText
          className="text-content"
          onClick={() => setIsComponentVisible(true)}
        >
          {value}
        </BasicText>
      )}
    </TextContainer>
  );
};
