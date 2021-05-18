import { useState, useEffect } from "react";
import styled from 'styled-components';
import db from '../firebase'
import {useParams, useHistory} from 'react-router-dom'
import {firebase} from '../firebase'

const EditStudent = (props) => {
  const {id} = useParams();
  const history = useHistory();
  const [image, setImage] = useState();
  const [previewImg, setPreviewImg] = useState()
  const [downloadURL, setDownloadURL] = useState();
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

  let reader = new FileReader();
  let files = []
  const onImageChange = (event) => {
    if(event.target.files[0]){
      files = event.target.files;
      reader = new FileReader();
      reader.onload = () =>{
        setPreviewImg(reader.result)
      }
      reader.readAsDataURL(files[0]);
    }
    setImage(event.target.files[0]) 
        
   }
  
   const uploadImage = () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const uploadTask = storageRef.child(`images/${image.name}`).put(image);
    console.log(image)
        // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
                default:
        }
            }, 
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                      break;
                    case 'storage/canceled':
                      break;
                    case 'storage/unknown':
                      break;
                    default:
                }
        }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setDownloadURL(downloadURL);
                const db = firebase.firestore();
                db.collection('student').doc(id).set({
                  st_name: st_name,
                  st_dob: st_dob,
                  st_class: st_class,
                  st_status: st_status,
                  st_photo: downloadURL,
                  timestamp:timestamp
              })
              .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
              }).then(alert("student info updated")).then(history.push('/'))
              .catch((error) => {
                  console.error("Error adding document: ", error);
              });
              });
            }
    );
            console.log(downloadURL);
}


  const updateStudent = (e) => {
      e.preventDefault()

        db.collection('student').doc(id).set({
          st_name: st_name,
          st_dob: st_dob,
          st_class: st_class,
          st_status: st_status,
          st_photo: downloadURL,
          timestamp:timestamp
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      }).then(alert("Photo updated")).then(history.push('/'))
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
        
        <ProfileImage img={!previewImg? st_photo : previewImg}/>
          <InputField type="file" 
          onChange={onImageChange}
          className="filetype" 
          id="group_image" 
          accept="image/*"/>
        <AddStudentButton onClick={uploadImage} >Update Photo</AddStudentButton>
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
          <AddStudentButton onClick={updateStudent} >Save Records</AddStudentButton>
          </> 
      </Container>
  )
}

const Container = styled.div`
padding: 1rem 2rem;
display: flex;
flex-direction: column;
margin: auto;
margin-top: 50px;
width: 400px;
max-width: 600px;
background-color: #fff;
/* position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);  */
z-index: 1000;
border-radius: 5px;
box-shadow:  10px 10px 15px #bebebe,
           10px 10px 15px #bebebe;


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
height: 300px;
`;

export default EditStudent