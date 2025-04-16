import axios from "axios";

export const getRoles = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

