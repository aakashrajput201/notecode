import React, { useEffect, useState } from "react";
import CodeEditor from "../codeEditor/CodeEditor";
import { collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./EditorLayout.scss";
import { useLocation, useParams } from "react-router-dom";

const EditorLayout = () => {
  const [language, setLanguage] = useState();
  const [theme, setTheme] = useState("light");
  const [code, setCode] = useState("");
  const [notesUrl, setNotesUrl] = useState("");
  const [shareDisable, setShareDisable] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const location = useLocation();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "languages"));
    const documents = querySnapshot.docs.map((doc) => doc.data());
    console.log("querySnapshot", documents);
    setData(documents);

    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
  };
  console.log("language", language);

  const fetchDocs = async () => {
    const docRef = doc(db, "noteCode", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const { theme, language, code } = docSnap.data();
      console.log("theme", theme, language, code);
      setTheme(theme);
      setLanguage(language);
      setCode(code);
      setShareDisable(true);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // console.log("docSnap", docSnap);
  };
  useEffect(() => {
    if (id) {
      fetchDocs();
    }
    fetchData();
  }, [id]);

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    console.log(
      "first",
      data,
      data.filter((item) => item.value === e.target.value)[0].defaultCode
    );
    setCode(
      data.filter((item) => item.value === e.target.value)[0].defaultCode
    );
    console.log("e.target.value", e.target.value);
  };

  const onThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const onCodeChange = (value) => {
    setCode(value);
    console.log("e.target.value", value);
    setShareDisable(false);
  };

  const onShareClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "noteCode"), {
        theme: theme,
        language: language,
        code: code,
      });
      console.log("Document written with ID: ", docRef.id);
      const sharedDocUrl = `${window.location.protocol}//${window.location.host}/${docRef.id}`;
      setNotesUrl(sharedDocUrl);
      console.log(sharedDocUrl);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleCopyClick = (event) => {
    console.log("event.target.value", event.target.value);
    const textToCopy = event.target.value;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard:", textToCopy);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return (
    <main>
      <div className="editor-container">
        <CodeEditor
          language={language}
          theme={theme}
          value={code}
          onCodeChange={onCodeChange}
        />
        <div className="actions-container">
          <select
            value={language}
            onChange={onLanguageChange}
            name="language"
            className="languages"
          >
            {data.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
            {/* <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option> */}
          </select>

          <select value={theme} onChange={onThemeChange}>
            <option value="light">Light</option>
            <option value="vs-dark">Dark</option>
          </select>

          {notesUrl && (
            <div>
              <input type="text" value={notesUrl} onClick={handleCopyClick} />
            </div>
          )}

          <button
            disabled={shareDisable}
            className="share button"
            onClick={onShareClick}
          >
            Share
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditorLayout;
