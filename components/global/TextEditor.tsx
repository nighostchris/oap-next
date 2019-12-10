import React from 'react';

interface DropdownItemProps {
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

const TextEditor : React.SFC<DropdownItemProps> = () => {
  const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
  const [content, setContent] = React.useState('');

  return (
    <>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
      <p>{content}</p>
    </>
  );
};

export default TextEditor;
