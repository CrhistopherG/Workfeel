import { Question } from '../../types'

//defimimos los props 

type QuestionDetailsProps = {
    question: Question; //definimos los tipos de props 
}

export const ListQuestion = ({ question }: QuestionDetailsProps) => {
    return (
        <div>
            <tr>
                <td className='p-3 text-lg text-gray-800'>{question.question_id}</td>
                <td className='p-3 text-lg text-gray-800'>{question.dimension_id}</td>
                <td className='p-3 text-lg text-gray-800'>{question.content}</td>

            </tr>
        </div>
    )
}
