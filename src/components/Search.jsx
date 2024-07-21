import React, { useState } from 'react'
import { collection, query, where,getDocs,getDoc, setDoc, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import {db} from "../firebase"
import {AuthContext} from "../context/AuthContext"
import { useContext } from 'react';

export const Search = () => {
  const [username,setUsername]=useState("")
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)

  const {currentUser}=useContext(AuthContext)
  

  
  const handleSearch = async()=>{
    const q=query(
      collection(db,"users"),
      where("displayName","==",username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUser(doc.data())
    });
    } catch (error) {
      setErr(true)
    }
  }

  const handleKey = e=>{
    e.code==="Enter" && handleSearch();
  }

  /*const handleSelect=async ()=>{
    //check whether the group(chats in firestore) exists, if not create
    //this logic combines the two user ids of the person you're chatting with
    //and you
    const combinedId=
    currentUser.uid>user.uid
    ?currentUser.uid+user.uid
    :user.uid+currentUser.uid;

    //this logic searches the chats in the chats collection where id is combinedid
    //then it returns res
    try {
      const res=await getDoc(doc(db,"chats", combinedId));

      //check if it exist, if not create one
      if(!res.exists()) {
        //create chats collection
        await setDoc(doc,(db,"chats",combinedId),{messages : [] });

        //create user chats
       await updateDoc(doc(db,"userChats",combinedId.uid),{
          [`$combinedId+".userInfo"`]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
        [`$combinedId+".date"`]:serverTimestamp()
       });

       await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]: {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
        [combinedId+".date"]: serverTimestamp()
       });
        
      }
    } catch (error) {
      setErr(true)
    }
    setUser(null);
    setUsername("");
  }*/
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text"
        placeholder='find a user'
        onKeyDown={handleKey} 
        onChange={e=>setUsername(e.target.value)}
        value={username}
        />
        </div>
        {err &&<span>User not found!</span>}
        {user && <div className="userChat" onClick={handleSelect}>
          <img 
          src={user.photoURL}
           alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}
