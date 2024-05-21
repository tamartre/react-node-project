
const express = require("express")
const router = express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const productController = require("../controllers/productController");

router.get("/",productController.getAllProducts)
router.get("/:id",productController.getProductById)
router.post("/",verifyJWT,productController.createNewProduct)
router.delete("/",verifyJWT,productController.deleteProduct)
router.put("/",verifyJWT,productController.updateProduct)



module.exports = router