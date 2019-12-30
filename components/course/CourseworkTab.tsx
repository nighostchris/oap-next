import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Card from '../global/Card';

interface CourseworkTabProps {
  title: string
  coursework: Array<any>
}

const CourseworkTab: React.FunctionComponent<CourseworkTabProps> = ({ title, coursework }) => {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Button href={`${router.asPath}/add`} variant="primary" block className="mb-5">{`New ${title}`}</Button>
          <Card
            type="list"
            title={title}
            listItem={coursework}
            sortable
            searchable
          />
        </div>
      </div>
    </div>
  );
};

export default CourseworkTab;
