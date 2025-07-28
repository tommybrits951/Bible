import { useContext, useState, useEffect } from "react";
import BibleContext from "../context/BibleContext";

export default function Nav() {
  const { bookNames, bible, current, selectBook, chapters, selectChapter } = useContext(BibleContext);
  const [chaps, setChaps] = useState(chapters)
  function selectHandle(e) {
    const {id} = e.target;
    if (id === "bookSelect") {
        selectBook(e)
    } else {
        selectChapter(e)
    }
  }



  
  function countChapters() {
    const chap = bible ? bible[current.book].chapters : null
    if (bible) {

      let arr = []
      for (let i = 1; i <= chap.length; i++) {
        arr = [...arr, i]
      }
      setChaps(arr)
    }
  }



  useEffect(() => {
    countChapters()
  }, [])



  return (
    <nav className="fixed flex justify-around py-3 top-0 w-full bg-black">
      <label className="text-white text-lg" htmlFor="bookSelect">Book</label>
      <select
        id="bookSelect"
        onChange={selectHandle}
        value={bookNames[current.book]}
        className="text-black w-1/4 text-center text-lg bg-white rounded p-1"
      >
        {bookNames
          ? bookNames.map((book, idx) => {
              return <option value={idx} key={idx}>{book}</option>;
            })
          : null}
      </select>
      <label className="text-white text-lg" htmlFor="chapterSelect">Chapter</label>
      <select
        id="chapterSelect"
        onChange={selectHandle}
        value={current.chapter}
        className="text-black w-1/4 text-center text-lg bg-white rounded p-1"
      >
        {chaps
          ? chaps.map((chap, idx) => {
              return <option key={idx}>{chap}</option>;   
            })
          : null}
      </select>
    </nav>
  );
}
