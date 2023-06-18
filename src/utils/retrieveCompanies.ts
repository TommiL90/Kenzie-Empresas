import { api } from "@/services/api";

const retrieveCompanies = async () => {
    try {
      const response = await api("companies");
  
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch sectors");
    }
  };
export default retrieveCompanies