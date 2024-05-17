import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, value, theme, onCodeChange }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="90vh"
      language={language}
      value={value}
      onMount={handleEditorDidMount}
      theme={theme}
      onChange={onCodeChange}
    />
  );
};

export default CodeEditor;
