import * as React from 'react';
import Select from '../../global/Select';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

interface AddAssBasicProps {
  courses: any
  setCourses: any
  courseIDList: any
  courseListSelect: any
  title: string
  setTitle: any
  type: any
  setType: any
  description: string
  setDescription: any
  descriptionHTML: string
  setDescriptionHTML: any
  handleNext: any
}

const AddAssBasic: React.FunctionComponent<AddAssBasicProps> = ({
  courses, setCourses, courseIDList, courseListSelect, title, setTitle, type, setType,
  description, setDescription, descriptionHTML, setDescriptionHTML, handleNext,
}) => {
  const router = useRouter();
  const { courseid } = router.query;
  const [titleEmpty, setTitleEmpty] = React.useState(false);
  const [descriptionEmpty, setDescriptionEmpty] = React.useState(false);
  const [descriptionHTMLEmpty, setDescriptionHTMLEmpty] = React.useState(false);

  React.useEffect(() => {
    if (courseid) {
      courseIDList.forEach((id: any, index: number) => {
        if (courseid == id) {
          setCourses(courseListSelect[index]);
        }
      });
    }
  });

  const checkFieldValid = (e: any) => {
    e.preventDefault();
    let checkHandleNext = true;

    if (!title) {
      setTitleEmpty(true);
      checkHandleNext = false;
    } else {
      setTitleEmpty(false);
    }
    if (!description) {
      setDescriptionEmpty(true);
      checkHandleNext = false;
    } else {
      setDescriptionEmpty(false);
    }
    if (!descriptionHTML) {
      setDescriptionHTMLEmpty(true);
      checkHandleNext = false;
    } else {
      setDescriptionHTMLEmpty(false);
    }

    if (checkHandleNext) {
      handleNext();
    }
  }
  
  return(
    <>
      <Select
        title="Course"
        value={courses}
        setValue={setCourses}
        optionList={courseListSelect}
      />
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        { titleEmpty && <span className="badge badge-soft-danger mt-2">Field can't be empty!</span> }
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
        { descriptionEmpty && <span className="badge badge-soft-danger mt-2">Field can't be empty!</span> }
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
        { descriptionHTMLEmpty && <span className="badge badge-soft-danger mt-2">Field can't be empty!</span> }
      </div>
      <Button
        block
        href="#"
        className="mb-6"
        variant="primary"
        onClick={(e: any) => checkFieldValid(e)}
      >
        Next
      </Button>
    </>
  );
};

export default AddAssBasic;
