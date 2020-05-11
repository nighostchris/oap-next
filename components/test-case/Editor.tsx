import React from 'react';
import AceEditor from 'react-ace';

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
  const [value, setValue] = React.useState('');

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
      width="100%"
      height="100%"
      placeholder=""
      mode="java"
      theme={theme}
      name="editor"
      onLoad={onLoad}
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onCursorChange={onCursorChange}
      onValidate={onValidate}
      value={value}
      fontSize={fontSize}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
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
