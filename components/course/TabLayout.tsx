import * as React from 'react'
import { styled } from 'baseui'
import { useRouter } from 'next/router'
import { Label1 } from 'baseui/typography'

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  padding: '20px 0',
  overflowY: 'auto',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#90a4ae',
  border: '1px solid #607d8b',
  height: 'calc(100% - 118px)',
  borderTopRightRadius: '5px !important',  
  borderBottomLeftRadius: '5px !important',
  borderBottomRightRadius: '5px !important',
  "::-webkit-scrollbar": {
    width: ".8rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundClip: "padding-box",
    border: "2px solid transparent",
    borderRadius: ".8rem",
    backgroundColor: "rgba(128, 128, 128, .7)",
    boxShadow: "inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)",
  },
});

/*
const SubContainer = styled('div', {
  width: '90%',
  borderRadius: '10px',
  marginBottom: '20px',
});
*/

const CourseTitle = styled(Label1, {
  width: '90%',
  fontSize: '22px',  
  marginBottom: '20px',
});

const TabLayout: React.FunctionComponent = ({children}) => {
  const router = useRouter();
  const { courseid } = router.query;

  return (
    <Container>
      <CourseTitle
        overrides={{
          Block: {
            style: {
              fontWeight: 'bold',
            }
          }
        }}      
      >
        {String(courseid).toUpperCase()}
      </CourseTitle>
      {children}
    </Container>
  )
}

export default TabLayout
