import React from 'react';
import dynamic from 'next/dynamic';
import { TestCaseContext } from './contexts/TestCaseContext';
import { Form } from 'react-bootstrap';

const DynamicEditor = dynamic(import('./Editor'), { ssr: false });

const fontSize = ["14", "16", "18", "20", "22", "24", "26", "28", "30"];

const themes = ["Tomorrow", "Monokai", "Github", "Kuroir", "Twilight", "XCode", "Textmate", "Solarized Dark", "Solarized Light", "Terminal"];

const CodeEditor: React.FC = () => {
  const [themeValue, setThemeValue] = React.useState("Tomorrow");
  const [fontSizeValue, setFontSizeValue] = React.useState("18");
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);

  return (
    <>
      <div className="col-12 col-xl-2">
        <Form.Group className="my-4 mx-3">
          <Form.Label>Theme</Form.Label>
          <Form.Control
            as="select"
            value={themeValue}
            onChange={(e) => setThemeValue((e.target as HTMLInputElement).value)}
          >
            {
              themes.map((theme, index) => (
                <option key={`theme-option-${index}`}>
                  {theme}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>
        <Form.Group className="my-4 mx-3">
          <Form.Label>Font Size</Form.Label>
          <Form.Control
            as="select"
            value={fontSizeValue}
            onChange={(e) => setFontSizeValue((e.target as HTMLInputElement).value)}
          >
            {
              fontSize.map((size, index) => (
                <option key={`font-size-option-${index}`}>
                  {size}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>
      </div>
      <div className="col-12 col-xl-10 px-0">
        <DynamicEditor
          theme={themeValue.toLowerCase().replace(" ", "_")}
          fontSize={Number(fontSizeValue)}
        />
      </div>
    </>
  );
};

export default CodeEditor;
