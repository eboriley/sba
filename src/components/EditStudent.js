import {useState} from 'react'
import {firebase} from '../firebase'



const EditStudent = (props) => {
    const [image, setImage] = useState();
    const [downloadURL, setDownloadURL] = useState();
    const [progress, setProgress] = useState();

   const onImageChange = (event) => {
       if(event.target.files[0])
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
            setProgress({progress})
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
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
                    }
            }, 
                () => {
                  // Upload completed successfully, now we can get the download URL
                  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setDownloadURL(downloadURL);
                    const db = firebase.firestore();
                    db.collection('pictures').add({
                        name: image.name,
                        imageUrl: downloadURL 
                    })
                  });
                }
        );
                console.log(downloadURL);
    }

    return(
        <>
        <input type="file" 
        onChange={onImageChange} 
        className="filetype" 
        id="group_image" 
        accept="image/*"/>
        <img src={downloadURL}/>
        <button onClick={uploadImage}>upload</button>
        </>
    )
}
 


export default EditStudent