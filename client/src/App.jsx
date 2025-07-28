import axios from "./api/axios";
import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./nav/Nav"; 
import BibleContext from "./context/BibleContext";

const bookNames = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalm",
  "Proverbs",
  "Ecclesiastes",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "Jude",
  "Revelation",
];

function App() {
  const [bible, setBible] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [txtContent, setTxtContent] = useState();
  const [current, setCurrent] = useState({
    book: 0,
    chapter: 1,
    verse: 1,
  });

  function getBible() {
    axios
      .get("/")
      .then((res) => {
        console.log(res.data)
        setBible(res.data);
        getChapterContent(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }



  function getChapterContent(bible) {
    let arr = []
    
    for (let i = 1; i <= bible[current.book].chapters.length; i++) {
      arr = [...arr, i]
    }
    setChapters(arr)
  }


  function selectBook(e) {
    const {value} = e.target;
    setCurrent({...current, book: value, chapter: 1})
    getChapterContent(bible)
  }



  function selectChapter(e) {
    const {value} = e.target;
    setCurrent({...current, chapter: value})
  
  }
  function turnPage(e) {
    const {value} = e.target;
    const curChap = parseInt(current.chapter)
    const curBook = parseInt(current.book)
    if (value === "next" && curChap < chapters.length) {
      setCurrent({...current, chapter: curChap + 1})
    } else if (value === "next" && curChap === chapters.length && curBook !== bible.length - 1) {
      setCurrent({...current, book: curBook + 1, chapter: 1})
      console.log(chapters.length)
      getChapterContent(bible)
    } else if (value === "back" && curChap > 1) {
      setCurrent({...current, chapter: curChap - 1})
    } else if (value === "back" && curChap === 1 && curBook !== 0) {
      setCurrent({...current, chapter: curChap - 1, book: curBook - 1})
      getChapterContent(bible)
    }
  }  
  useEffect(() => {
    getBible();
    
  }, []);


  return (
    <main className="bg-stone-300 p-0 m-0">
      <BibleContext.Provider
        value={{
          bible,
          bookNames,
          current,
          selectBook,
          selectChapter,
          chapters
        }}
      >
        <Nav />
        <section className="pt-24">
        <h2 className="text-center mb-5 font-mono text-5xl text-black">{`${bookNames[current.book]} ${current.chapter}`}</h2>
        
          {bible ? bible[current.book].chapters[current.chapter - 1].map((txt, idx) => {
            return <p className="mx-10 text-lg" key={idx}>{`${idx + 1}. ${txt}`}</p>
          }) : <p>Loading...</p>}
        </section>
        <footer className="py-15 flex justify-around">
          <button onClick={turnPage} value="back" className="bg-cyan-500 text-white text-lg py-2 px-3 cursor-pointer shadow-lg rounded-lg hover:scale-95">Back</button>
          <button onClick={turnPage} value="next" className="bg-cyan-500 text-white text-lg py-2 px-3 cursor-pointer shadow-lg rounded-lg hover:scale-95">Next</button>
        </footer>
      </BibleContext.Provider>
    </main>
  );
}

export default App;
