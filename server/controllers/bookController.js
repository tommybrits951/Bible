const Book = require('../models/Book')


async function getBible(req, res) {
    try {
        const bible = await Book.find().exec()
        if (bible) {
            res.status(200).json(bible)
        }
    } catch (err) {
        res.status(500).json({message: "Problem getting bible."})
    }
} 


async function getChapter(req, res, next) {
    try {
        const {book, chapter} = req.params;
        
        const bookContent = await Book.findOne({name: book})
        const result = bookContent.chapters[parseInt(chapter) - 1]
        
         
        if (!result) {
            return res.status(400).json({message: "Couldn't find chapter!"})
        } 
        console.log(result)
        
        
        
            res.status(200).json(result)
        
    } catch (err) {
        next(err)
    }
}


async function getVerse(req, res, next) {
    try {
        const {book, chapter, verse} = req.params;
        const chapNum = parseInt(chapter)
        const verseNum = parseInt(verse)
        const bookContent = await Book.findOne({name: book})
        if (!bookContent) {
            return res.status(400).json({message: "Couldn't find book."})
        }
        const result = {
            book,
            chapNum,
            verseNum,
            content: bookContent[chapNum - 1][verseNum - 1]
        }
        if (result) {
            res.status(200).json(result)
        }
    } catch (err) {
        next(err)
    }
}
async function getChapters(req, res, next) {
    try {
        const {book} = req.params;
        const bible = await Book.findOne({name: book})
        console.log(book)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getBible,
    getChapter,
    getVerse,
    getChapters
}