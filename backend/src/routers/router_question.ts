import {Router} from 'express';
import {getquestions, getquestionById,createquestion,updatequestion,deletequestion} from "../handlers/question"

//routing"
const router_question: Router = Router()

router_question.get('/', getquestions)
router_question.get('/:id', getquestionById)
router_question.post('/',createquestion)
router_question.patch('/:id',updatequestion)
router_question.delete('/:id',deletequestion)



export default router_question