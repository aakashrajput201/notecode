import React, { useEffect, useState } from "react";
import CodeEditor from "../codeEditor/CodeEditor";
import { collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import ShareIcon from "../../assets/Share.svg";
import LinkIcon from "../../assets/link.svg";
import "./EditorLayout.scss";

const EditorLayout = () => {
  const [language, setLanguage] = useState();
  const [theme, setTheme] = useState("light");
  const [code, setCode] = useState("");
  const [notesUrl, setNotesUrl] = useState("");
  const [shareDisable, setShareDisable] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "languages"));
    const documents = querySnapshot.docs.map((doc) => doc.data());
    setData(documents);
    if (!id && documents) {
      setLanguage(documents[0].language);
      setCode(documents[0].value);
    }
  };

  const fetchDocs = async () => {
    const docRef = doc(db, "noteCode", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { theme, language, code } = docSnap.data();
      setTheme(theme);
      setLanguage(language);
      setCode(code);
      setShareDisable(true);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDocs();
    }
    fetchData();
  }, [id]);

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode(data.filter((item) => item.language === e.target.value)[0].value);
    setShareDisable(false);
  };

  const onThemeChange = (e) => {
    setTheme(e.target.value);
    setShareDisable(false);
  };

  const onCodeChange = (value) => {
    setCode(value);
    setShareDisable(false);
  };

  const onShareClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "noteCode"), {
        theme: theme,
        language: language,
        code: code,
      });
      const sharedDocUrl = `${window.location.protocol}//${window.location.host}/${docRef.id}`;
      setNotesUrl(sharedDocUrl);
      setShareDisable(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCopyClick = (url) => {
    console.log("event.target.value", url);
    const textToCopy = url;
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
      <div
        className="editor-container"
        style={
          theme === "light"
            ? { backgroundColor: "#fff" }
            : { backgroundColor: "#1e1e1e" }
        }
      >
        <CodeEditor
          language={language}
          theme={theme}
          value={code}
          onCodeChange={onCodeChange}
        />
        <div className="actions-container">
          <div className="first-actions">
            <select
              value={language}
              onChange={onLanguageChange}
              className="languages-btn"
            >
              {data.map((item) => (
                <option value={item.language} className="option">
                  {item.name}
                </option>
              ))}
            </select>

            <select value={theme} onChange={onThemeChange} className="mode-btn">
              <option value="light" className="option">
                Light
              </option>
              <option value="vs-dark" className="option">
                Dark
              </option>
            </select>
          </div>
          <div className="second-actions">
            {notesUrl && (
              <div
                className="url-link"
                onClick={() => handleCopyClick(notesUrl)}
              >
                <img
                  className="url-link-icon"
                  src={LinkIcon}
                  alt="Share Icon"
                  title="Copy Link"
                  onClick={() => handleCopyClick(notesUrl)}
                />
                <p className="url-link-text">{`.../${notesUrl
                  .split("/")
                  [notesUrl.split("/").length - 1].slice(8)}`}</p>
              </div>
            )}

            <button
              disabled={shareDisable}
              className="share-btn"
              onClick={onShareClick}
              style={
                shareDisable
                  ? { backgroundColor: "#CED6E1" }
                  : { backgroundColor: "#406AFF" }
              }
            >
              <img src={ShareIcon} alt="" />
              Share
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditorLayout;
