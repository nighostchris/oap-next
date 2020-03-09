import * as React from 'react';
import { useRouter } from 'next/router';
import Select from '../../global/Select';

interface AddAssBasicProps {
  title: string
  setTitle: any
  type: any
  setType: any
  description: string
  setDescription: any
  descriptionHTML: string
  setDescriptionHTML: any
}

const AddAssBasic: React.FunctionComponent<AddAssBasicProps> = ({
  title, setTitle, type, setType,
  description, setDescription, descriptionHTML, setDescriptionHTML,
}) => {
  const router = useRouter();
  const { courseid } = router.query;

  return(
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <Select
        title="Type"
        value={type}
        setValue={setType}
        optionList={['Assignments', 'Labs']}
      />
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          style={{ resize: 'none' }}
          className="form-control"
          placeholder="Please type..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description HTML</label>
        <textarea
          value={descriptionHTML}
          style={{ resize: 'none' }}
          className="form-control"
          placeholder="Please type..."
          onChange={(e) => setDescriptionHTML(e.target.value)}
        />
      </div> 
    </>
  );
};

export default AddAssBasic;
