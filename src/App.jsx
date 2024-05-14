import { useEffect, useState } from 'react'
import './App.scss'
import {collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Header from './components/header/Header';
import CodeEditor from './components/codeEditor/CodeEditor';

function App() {
  
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
};

useEffect(()=>{
  fetchData();
},[])


  return (
    <>
     <Header/>
     <CodeEditor/>
      
    </>
  )
}

export default App
