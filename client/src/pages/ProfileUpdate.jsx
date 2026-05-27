import React, { useContext, useEffect, useState } from 'react'

import assets from '../assets/assets'
// import { onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import upload from '../../lib/upload';
// import { AppContext } from '../../context/appContext';
const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [selectedimage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Hi everyone I am using quick chat");
  // const [uid, setUid] = useState("");
  // const [prevImage, setPrevImage] = useState("");
  // const {setUserData} = useContext();


  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/')
  }
  //   try {
  //     if (!prevImage && image) {
  //       toast.error("upload profile image")
  //     }
  //     const docRef = doc(db, 'users', uid);
  //     if (image) {
  //       const imgUrl = await upload(image);
  //       setPrevImage(imgUrl);
  //       await updateDoc(docRef, {
  //         avater: imgUrl,
  //         bio: bio,
  //         name: name
  //       })
  //     }
  //     else {
  //       await updateDoc(docRef, {
  //         bio: bio,
  //         name: name
  //       })
  //     }
  //     const snap = await getDoc(docRef);
  //     setUserData(snap.data());
  //     navigate('/chat');
  //   } catch (error) {
  //       console.error(error);
  //       toast.error(error.message);
  //   }
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setUid(user.uid)
  //       const docRef = doc(db, "users", user.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.data().name) {
  //         setName(docSnap.data().name)
  //       }
  //       if (docSnap.data().bio) {
  //         setName(docSnap.data().bio)
  //       }
  //       if (docSnap.data().avatar) {
  //         setPrevImage(docSnap.data().avatar)
  //       }
  //       else {
  //         navigate('/');
  //       }
  //     }
  //   })
  // })

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3> 
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>

            <input onChange={(e) => setSelectedImage(e.target.files[0])} type='file' id='avatar' accept='.png,.jpg,.jpeg' hidden />

            <img src={selectedimage ? URL.createObjectURL(selectedimage) : assets.avatar_icon} alt='' className={`w-12 h-12 ${selectedimage && 'rounded-full'}`}/>
            upload profile image
          </label>

          <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Your name' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4}/>

          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='write profile bio' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4}></textarea>

          <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>
        </form>

        <img className='max-w-44 aspect-square rounded-full mx-10 max-sm"mt-10' src={assets.logo_icon} alt='' />
      </div>
    </div>
  )
}

export default ProfileUpdate
