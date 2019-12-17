import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectProps {
  title: string
  value: any
  setValue: any
  optionList: Array<any>
  displayColumn?: string
}

const Select : React.SFC<SelectProps> = ({
  title, value, setValue, optionList, displayColumn,
}) => {
  const handleChange = (e: any) => {
    if (displayColumn) {
      return optionList.find((o) => `${o[displayColumn]}` === (e.target as HTMLInputElement).value);
    }
    return optionList.find((o) => o === (e.target as HTMLInputElement).value);
  };

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => setValue(handleChange(e))}
      >
        {
          optionList.map((option, index) => (
            <option key={`type-option-${index}`}>
              { displayColumn ? `${option[displayColumn]}` : option }
            </option>
          ))
        }
      </Form.Control>
    </Form.Group>
  );
};

export default Select;
