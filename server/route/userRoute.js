
const express = require("express")
const router = express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const userController = require("../controllers/userController");

// router.use(verifyJWT)
router.get("/",verifyJWT,userController.getAllUsers)
router.get("/:id",userController.getUserById)
router.post("/",userController.createNewUser)
router.delete("/",verifyJWT,userController.deleteUser)
router.put("/",verifyJWT,userController.updateUser)



module.exports = router