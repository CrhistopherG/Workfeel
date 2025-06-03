"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_1 = require("../handlers/question"); // <--- nombre correcto
const router_question = (0, express_1.Router)();
// Routing
router_question.get("/activas", question_1.getQuestionsWithActiveDimensions);
router_question.get("/", question_1.getQuestions);
router_question.get("/:id", question_1.getQuestionById);
router_question.post("/", question_1.createQuestion);
router_question.patch("/:id", question_1.updateQuestion);
router_question.put("/:id", question_1.updateQuestion);
router_question.delete("/:id", question_1.deleteQuestion);
exports.default = router_question;
//# sourceMappingURL=router_questions.js.map