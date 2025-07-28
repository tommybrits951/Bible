const router = require("express").Router()
const controller = require("../controllers/bookController")

/* router.get("/:book/:chapter", controller.getChapter) */
router.get("/", controller.getBible)
router.get("/:book/:chapter", controller.getChapter)
router.get("/:book", controller.getChapters)

router.use((err, req, res, next) => {
    res.status(500).json({message: "Somethung went wrong."})
})


module.exports = router