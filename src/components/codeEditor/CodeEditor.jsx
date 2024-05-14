import React, { useEffect,useRef } from 'react'
import Editor from '@monaco-editor/react';


const CodeEditor = () => {
    const editorRef = useRef(null);
   

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
    }
  
    function showValue() {
      alert(editorRef.current.getValue());
    }
  return (
    <main>
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />

    </main>
  )
}

export default CodeEditor