import User from '../models/Users.model';
import Period from "../models/Period.model";
import { CreatePeriodDTO } from '../DTO/CreatePeriodDTO';


export const getPeriodsByUserId = async (userId: string) => {

    if(!userId){ throw{status: 400, message: 'User ID is required'}};

    const user: User = await User.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });

    if(!user) { throw{status: 404, message: 'User not found'} };

    if(!user.company_id){ throw{status: 400, message: 'User has not a assigned company'} };

    const periods : Period[] = await Period.findAll({
        where: { 
                company_id: user.company_id 
            },
            attributes: ['period_id', 'name', 'status', 'date_start', 'date_end'],
            order: [['date_start', 'DESC']]
    });

    return periods || [];
}

export const createPeriod = async (userId: string, periodData: CreatePeriodDTO) => {

    if(!userId){ throw{status: 400, message: 'User ID is required'}};

    const user: User = await User.findByPk(userId, {
        attributes: ['user_id', 'company_id'],
        raw: true
    });

    if(!user) { throw{status: 404, message: 'User not found'} };

    const { name, date_start, date_end, company_id } = periodData; 
    if (!name || !date_start || !date_end) {
        throw { status: 400, message: 'Missing data: name, date_start or date_end' };
    }

    const newPeriod = await Period.create({
        name,
        date_start,
        date_end,
        company_id: company_id,
        status: true  
    });

    return newPeriod;

}