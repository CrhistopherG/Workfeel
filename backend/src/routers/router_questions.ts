import { Router } from "express";
import { getQuestions,getQuestionById,deleteQuestion,updateQuestion,getQuestionsWithActiveDimensions,createQuestion }from "../handlers/question"; // <--- nombre correcto

const router_question: Router = Router();

// Routing

router_question.get("/activas", getQuestionsWithActiveDimensions);
router_question.get("/", getQuestions);
router_question.get("/:id", getQuestionById);
router_question.post("/", createQuestion);
router_question.patch("/:id", updateQuestion);
router_question.put("/:id", updateQuestion);
router_question.delete("/:id", deleteQuestion);


export default router_question;