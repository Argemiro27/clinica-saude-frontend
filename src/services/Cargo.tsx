import { ICargo } from "../interfaces/Cargo";

interface ICargoService {
    getCargos: () => Promise<ICargo[]>;
  }
  
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL

  const CargoService: ICargoService = {
    getCargos: async () => {
      try {
        const response = await fetch(`${VITE_REACT_APP_API_URL}/cargos/get_cargos`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erro ao buscar os dados do endpoint:', error);
        throw error;
      }
    },
  };
  
  export default CargoService;
  