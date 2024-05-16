import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, value, theme, onCodeChange }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  const defaultValue = `<html>
    <head>
      <title>HTML Sample</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style type="text/css">
        h1 {
          color: #CCA3A3;
        }
      </style>
      <script type="text/javascript">
        alert("I am a sample... visit devChallengs.io for more projects");
      </script>
    </head>
    <body>
      <h1>Heading No.1</h1>
      <input disabled type="button" value="Click me" />
    </body>
  </html>`;
  return (
    <Editor
      height="90vh"
      // defaultLanguage="html"
      language={language}
      value={value}
      // defaultValue={defaultValue}
      onMount={handleEditorDidMount}
      theme={theme}
      onChange={onCodeChange}
    />
  );
};

export default CodeEditor;
