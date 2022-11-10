import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import Options from "./new_poll_form/Options";
import Title from "./new_poll_form/Title";
import Submit from "./Submit";

const Form = styled.div`
  margin-left: 25%;
  width: 50%;
`;

const FormTitle = styled.h2`
  color: #404040;
  text-align: center;
  font-size: 1.8em;
  font-weight: 200;
`;

interface Props {
  onSubmit: (title: string, options: Array<string>) => void;
}

const NewPollForm = (props: Props) => {
  const [title, setTitle] = React.useState<string>("");
  const [options, setOptions] = React.useState<Array<string>>([]);

  const handleOnTitleChange = (event: React.FormEvent<EventTarget>) => {
    setTitle((event.target as HTMLInputElement).value);
  };

  const handleOnNewOption = (text: string) => {
    setOptions([...options, text]);
  };

  const handleOnOptionRemoved = (index: number) => {
    options.splice(index, 1);
    setOptions([...options]);
  };

  const handleFormSubmit = () => {
    props.onSubmit(title, options);
  };

  return (
    <Form>
      <FormTitle>Create new poll</FormTitle>
      <Title onChange={handleOnTitleChange} value={title} />
      <Options
        onNewOption={handleOnNewOption}
        onOptionRemoved={handleOnOptionRemoved}
        options={options}
      />
      <hr />
      <Submit onClick={handleFormSubmit} text="Submit" />
    </Form>
  );
};

export default hot(NewPollForm);
