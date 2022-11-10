import * as React from "react";
import { hot } from "react-hot-loader/root";
import Input from "./Input";

import Label from "./Label";

interface Props {
  onChange: (event: React.FormEvent<EventTarget>) => void;
  value: string;
}

const PollTitle = (props: Props) => (
  <div>
    <Label for="title" text="Poll question" />
    <Input
      name="title"
      onChange={props.onChange}
      value={props.value}
      width="95%"
    />
  </div>
);

export default hot(PollTitle);
