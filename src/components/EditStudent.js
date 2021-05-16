import { useState, useEffect } from "react";
import styled from 'styled-components';
import db from '../firebase'
import {useParams, useHistory} from 'react-router-dom'


const EditStudent = (props) => {
  const {id} = useParams();
  const history = useHistory();
  const current = new Date();
  const time = {
      dd: current.getDay(),
      mm: current.getMonth(),
      yy: current.getFullYear(),
      h: current.getHours(),
      m: current.getMinutes(),
      s: current.getSeconds(),
      full: current.toLocaleString()
   }
  
   
  const [st_name, setSt_name] = useState();
  const [st_dob, setSt_dob] = useState("");
  const [st_class, setSt_class] = useState("");
  const [st_photo, setSt_photo] = useState("");
  const [st_status, setSt_status] = useState('active');
  const [timestamp] = useState(`${time.full}`);
  

  const updateStudent = (e) => {
      e.preventDefault()

      db.collection('student').doc(id).set({
          st_name: st_name,
          st_dob: st_dob,
          st_class: st_class,
          st_status: st_status,
          st_photo: st_photo,
          timestamp:timestamp
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      }).then(alert("student info updated")).then(history.push('/'))
      .catch((error) => {
          console.error("Error adding document: ", error);
      });

    
  }

  useEffect(() => {
    db.collection('student').doc(id)
    .onSnapshot((snapshot) => (
      setStudent(snapshot.data())
    ))
  }, [])

  const setStudent = (student) => {
    setSt_name(student.st_name)
    setSt_dob(student.st_dob)
    setSt_class(student.st_class)
    setSt_photo(student.st_photo)
    setSt_status(student.st_status)
  }



  return(
      
      <Container>
            <>
        <ProfileImage img={st_photo}/>
          <label for="name">Name of Student</label>
          <InputField  id="name" 
              value={st_name}
              onChange={e => setSt_name(e.target.value)}/>
          <label for="dob">Date of birth</label>
          <InputField type="date" id="dob"
          value={st_dob}
          onChange={e => setSt_dob(e.target.value)}/>
          <label for="stClass">Select class</label>
          <SelectField type="select" id="stClass" value={st_class} onChange={e => setSt_class(e.target.value)}>
              <option value="seven">JHS 1</option>
              <option value="eight">JHS 2</option>
              <option value="nine">JHS 3</option>
          </SelectField>
          <label for="stStatus">Student status</label>
          <SelectField type="select" id="stStatus"  value={st_status} onChange={e => setSt_status(e.target.value)}>
              <option value="completed">Completed</option>
              <option value="discontinued">Discontinued</option>
              <option value="active">Active</option>
          </SelectField>
          <AddStudentButton onClick={updateStudent} >Update Student</AddStudentButton>
          </> 
      </Container>
  )
}

const Container = styled.div`
padding: 1rem 2rem;
display: flex;
flex-direction: column;
margin: auto;
max-width: 600px;
background-color: #fff;
/* position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%); 
z-index: 1000;
border-radius: 5px;
box-shadow:  10px 10px 15px #bebebe,
           10px 10px 15px #bebebe; */


label {
  font-size: .8rem;
  margin-top: .4rem;
}

.closeBtn{
  margin-left: auto;
  font-weight: bold;
  font-size: 1.2rem;

  &:hover {
      color: #ddd;
      cursor: pointer;
  }
}

`;

const InputField = styled.input`
border-width: 1px;
border-top: none;
border-left: none;
border-right: none;
font-size: 1.1rem;
outline: none;
margin-bottom: .4rem;
width: 100%;
margin: auto;
`;
const SelectField = styled.select`
border-width: 1px;
border-top: none;
border-left: none;
border-right: none;
font-size: 1.1rem;
outline: none;
margin-bottom: .4rem;
width: 100%;
margin: auto;
`;

const AddStudentButton = styled.button`
border: none;
font-size: 1.1rem;
outline: none;
margin-bottom: .4rem;
width: 100%;
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

const ProfileImage = styled.div`
background-image: url(${props => props.img});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
width: 100%;
height: 400px;
`;

export default EditStudent