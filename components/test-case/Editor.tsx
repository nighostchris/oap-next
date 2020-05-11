import React from 'react';
import AceEditor from 'react-ace';
import { TestCaseContext } from './contexts/TestCaseContext';
import { libraryImport, staticTemplate } from './translator/java/JUnitTestGenerator';

interface EditorProps {
  theme: string
  fontSize: number
}

const languages = ["javascript", "java", "python", "c_cpp"];

const themes = ["monokai", "github", "tomorrow", "kuroir", "twilight", "xcode", "textmate", "solarized_dark", "solarized_light", "terminal"];

languages.forEach(lang => {
  require(`ace-builds/src-min-noconflict/mode-${lang}`);
  require(`ace-builds/src-min-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-min-noconflict/theme-${theme}`));

const Editor: React.FC<EditorProps> = ({ theme, fontSize }) => {
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);
  const [sTemplate, setUpBeforeClassTemplate] = staticTemplate();
  const [value, setValue] = React.useState(`${libraryImport}${sTemplate}${setUpBeforeClassTemplate}`);

  console.log(value);

  const onLoad = () => {
    console.log("i've loaded");
  }
  const onChange = (newValue: any) => {
    console.log("change", newValue);
    setValue(newValue);
  }

  const onSelectionChange = (newValue: any, event: any) => {
    console.log("select-change", newValue);
    console.log("select-change-event", event);
  }

  const onCursorChange = (newValue: any, event: any) => {
    console.log("cursor-change", newValue);
    console.log("cursor-change-event", event);
  }

  const onValidate = (annotations: any) => {
    console.log("onValidate", annotations);
  }

  return (
    <AceEditor
      mode="java"
      width="100%"
      height="100%"
      theme={theme}
      value={value}
      name="editor"
      placeholder=""
      onLoad={onLoad}
      showGutter={true}
      fontSize={fontSize}
      onChange={onChange}
      showPrintMargin={false}
      onValidate={onValidate}
      highlightActiveLine={true}
      onCursorChange={onCursorChange}
      onSelectionChange={onSelectionChange}
      setOptions={{
        useWorker: false,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  );
};

export default Editor;
