import express from "express";
import * as bookController from "../controllers/bookController";

const router = express.Router();

router.get("/all", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/create", bookController.createBook);
router.patch("/update/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;