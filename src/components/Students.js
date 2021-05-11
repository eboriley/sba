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
    student = [students.map(st => ({id : st.id, name: st.data.st_name}))]
    console.log(student)
    }
    
    return (
        <>
        {!student[0] ?
        <h1>please wait...</h1> :  
        student[0].map(({id,name})=>(
          <Student id={id} name={name}/>
        ))
        }
        <AddStudentButton onClick={() => setIsOpen(true)}>Add Student</AddStudentButton>
        <AddStudent open={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    )
}

const Student = ({id, name}) => {
  return(
      <ListGroup>    
        <Link className="studentItem" to={`viewStudent/${id}`}>{name}</Link>
      </ListGroup>
  )
}

const ListGroup = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: .2rem;

  .studentItem{
    color: #000;
    align-items: start;
    font-size: 1.5rem;
    line-height: 1.25;
  }

  .studentItem:hover{
    color: #3678D4;
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