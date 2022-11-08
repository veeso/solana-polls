import * as React from "react";
import { hot } from "react-hot-loader/root";
import Input from "./Input";

import Label from "./Label";

interface Props {
  onChange: (event: React.FormEvent<EventTarget>) => void;
  value: string;
}

class PollTitle extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <Label for="title" text="Poll question" />
        <Input
          name="title"
          onChange={this.props.onChange}
          value={this.props.value}
          width="95%"
        />
      </div>
    );
  }
}

export default hot(PollTitle);
