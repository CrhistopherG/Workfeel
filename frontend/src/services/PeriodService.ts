// services/PeriodService.tsx
import axios from 'axios';

export const getPeriods = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/${user.user_id}/periods`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching periods:', error);
    throw error;
  }
};

export const createPeriod = async (nameR: string, date_startR:string, date_endR:string, company_idR:number) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/${user.user_id}/newPeriod`,
      {
        name: nameR, 
        date_start: date_startR, 
        date_end: date_endR,
        company_id: company_idR
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating period:', error);
    throw error;
  }
};