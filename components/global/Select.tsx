import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectProps {
  title: string
  value: any
  setValue: any
  optionList: Array<any>
}

const Select : React.SFC<SelectProps> = ({
  title, value, setValue, optionList,
}) => (
  <Form.Group>
    <Form.Label>{title}</Form.Label>
    <Form.Control
      as="select"
      value={value}
      onChange={(e) => setValue((e.target as HTMLInputElement).value)}
    >
      {
        optionList.map((option, index) => (
          <option key={`type-option-${index}`}>
            {option}
          </option>
        ))
      }
    </Form.Control>
  </Form.Group>
);

export default Select;
