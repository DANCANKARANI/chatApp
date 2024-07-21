
import Add from '../images/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile,  } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth,db,storage} from "../firebase";
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';

//Registration page
export const Register = () => {
    const [err,setErr]=useState(false);
    const navigate=useNavigate();


    //Handlesubmitt function
    const handleSubmit=async(e)=>{
       e.preventDefault();

        console.log(e.target[0].value);
       const displayName= e.target[0].value;
       const email= e.target[1].value;
       const password= e.target[2].value;
       const file= e.target[3].files[0];

        console.log(displayName,email,password,file)
       //Authenticatin in firebase
       
       try {
        //registering new user to the firebase
        const res =await createUserWithEmailAndPassword(auth, email, password);
        console.log(res.user.uid);
         const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
            
            (error) => {
                // Handle unsuccessful uploads
                setErr(true)
                console.log("Error in uploading files", error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL:downloadURL
                });
                await setDoc(doc(db,"users",res.user.uid),{
                    uid:res.user.uid,
                    displayName,
                    email,
                    photoURL:downloadURL,
                });
                await setDoc(doc(db,"userChats",res.user.uid),{});
                navigate("/");
                });
            }
            );
           
        //Register three observer
      
       } catch (err) {
        setErr(true)
        console.log(err)
       }
     
    };
  return (
    <div className="formContainer" >
        <div className="formWrapper">
            <span className='logo'>Marcel Chat</span>
            <span className='title'>Register</span>
            <form action="" onSubmit={handleSubmit} id='form1'>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input style={{display:"none"}} type="file" id='file' />
                <label htmlFor="file">
                    <img src={Add} alt="dsd" />
                    <span>
                        Add an avatar
                    </span>
                </label>
                <button>Sign up</button>
                {err && <span>something went wrong</span>}
            </form>
            <p>do you have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}
