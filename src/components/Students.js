import styled from 'styled-components'
import {useState, useEffect} from 'react'
import db from '../firebase'
import {Link} from 'react-router-dom'
import AddStudent from './AddStudent'

const Students = (props) => {
    const [students, setStudents] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const studentsReq = db.collection('student');
        studentsReq.onSnapshot((snapshot) => (
            setStudents(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
        ))
    }, [])

    let student = []
    if(students){
    student = [students.map(st => ({id : st.id, 
      name: st.data.st_name,
      stClass: st.data.st_class,
      stPhoto: st.data.st_photo,
      stDob: st.data.st_dob
      }))]
    console.log(student)
    }
    
    return (
        <>
        <Container>
        <NamesContainer>
        {!student[0] ?
        <h1>please wait...</h1> :  
        student[0].map(({id,name,stClass, stPhoto, stDob})=>(
          <Student id={id} name={name} stClass={stClass} stPhoto={stPhoto} stDob={stDob}/>
        ))
        }
        </NamesContainer>
        <AddStudentButton onClick={() => setIsOpen(true)}>Add Student</AddStudentButton>
        <AddStudent open={isOpen} onClose={() => setIsOpen(false)}/>
        </Container>
        </>
    )
}

const Student = ({id, name, stClass, stPhoto, stDob}) => {
  return(
      <ListGroup>    
        <Card>
        <ProfileImage img={stPhoto}/>
          <SubCard>
          <Link className="studentItem" to={`viewStudent/${id}`}>{name}</Link>
          <ProfileControls>
            <Control>
            <img src="../images/birthday-cake-svgrepo-com.svg" alt="birthday-logo"/>
              <p>{stDob}</p>
            </Control>
            <Control>
            <img src="../images/classroom-svgrepo-com.svg" alt="birthday-logo"/>
              <p>Basic: {stClass}</p>
            </Control>
            <Control>
            <img src="../images/eighty-svgrepo-com.svg" alt="80-logo"/>
              <a href="">Add some scores</a>
            </Control>
            <Control>
              <img src="../images/delete-ui-svgrepo-com.svg" alt="delete-logo"/>
              <a href="">Delete</a>
            </Control>
          </ProfileControls>
          </SubCard>
        </Card>
        
      </ListGroup>
  )
}

const Container = styled.div`
margin: 0 auto;
max-width:700px;
padding: 1rem 2rem;
display: flex;
flex-direction: column;
align-items: center;


`;
const NamesContainer = styled.div`
display: flex;
flex-direction: column;
overflow-y: scroll;
height: 500px;
background-color: #F0F3F8;
margin-bottom: .8rem;

&::-webkit-scrollbar{
  display: none;
}
`;

const ListGroup = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: .2rem;

  .studentItem{
    color: #000;
    align-items: start;
    font-size: 1.3rem;
    line-height: 1.25;
  }

  .studentItem:hover{
    color: #3678D4;
  }

`;

const Card = styled.div`
padding: 1rem 1.3rem;
width: 400px;
display: flex;
background-color: #FFF;
margin: .4rem .5rem;
border-radius: 10px;
`;

const SubCard = styled.div`
display: flex;
flex-direction: column;
`;

const ProfileNamePhoto = styled.div`
display: flex;
align-items: center;
`;

const ProfileImage = styled.div`
height: 43px;
width: 43px;
background-image: url(${props => props.img});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
border-radius: 50%;
border: 2.5px solid #135ABC;
margin-right: 1rem;
`;

const ProfileControls = styled.ul`
margin: 0;
padding: 0;
`;

const Control = styled.div`
display: flex;
align-items: center;
margin: .3rem 0; 
font-family: Avenir-Roman, sans-serif;
font-size:.9rem;

img{
  width: 1.3rem;
  padding-right: .3rem;
  
}

a{
  color: black;
  font-size:.8rem;

  &:hover{
  font-size:1rem;
  color: #135ABC;
  transition: 300ms cubic-bezier(.17,.67,.83,.67);
}
}

p{
  padding: 0;
  margin:0;
}

`;



const AddStudentButton = styled.button`
border: none;
font-size: 1.1rem;
outline: none;
margin-bottom: .4rem;
width: 200px;
margin: auto;
background-color: #135ABC;
border-radius: 5px;
color: #fff;
margin-top: .4rem;
padding: .7rem 0;
&:hover{
    background-color: #3678D4;
}

`;

export default Students;