import * as React from 'react';
import Select from '../../global/Select';
import { useRouter } from 'next/router';

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
}

const AddAssBasic: React.FunctionComponent<AddAssBasicProps> = ({
  courses, setCourses, courseIDList, courseListSelect, title, setTitle, type, setType,
  description, setDescription, descriptionHTML, setDescriptionHTML,
}) => {
  const router = useRouter();
  const { courseid } = router.query;

  React.useEffect(() => {
    if (courseid) {
      courseIDList.forEach((id: any, index: number) => {
        if (courseid == id) {
          setCourses(courseListSelect[index]);
        }
      });
    }
  });
  
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
