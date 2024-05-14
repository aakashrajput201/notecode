import React from 'react'
import "./Header.scss"
import NoteCodeLogo from "../../assets/NoteCodeLogo.svg"

const Header = () => {
  return (
    <header>
        <img className="logo" src={NoteCodeLogo} alt="NoteCode Logo Icon" />
        <p>Create & Share</p>
        <h1>Your Code Easily</h1>
    </header>
  )
}

export default Header