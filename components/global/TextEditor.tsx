import React from 'react';

interface TextEditorProps {
  content: string
  setContent: (value: string | ((prevVar: string) => string)) => void
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image',
];

const TextEditor : React.FunctionComponent<TextEditorProps> = ({ content, setContent }) => {
  const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

  const handleChange = (value: any) => {
    setContent(value);
  }

  return (
    <div className="text-editor mb-5">
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
