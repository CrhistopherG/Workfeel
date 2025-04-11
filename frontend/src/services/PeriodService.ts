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