import React from 'react';

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

const TextEditor : React.FunctionComponent = () => {
  const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
  const [content, setContent] = React.useState('');

  return (
    <div className="text-editor mb-5">
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
