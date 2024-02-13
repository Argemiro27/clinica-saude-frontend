// AuthService.ts

import axios from "axios";

interface AuthResponse {
  token: string;
}
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL



class AuthService {



  static async login(email: string, senha: string): Promise<AuthResponse> {
    console.log(email, senha);
    const response = await fetch(`${VITE_REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();

      // Salvar os dados no localStorage
      localStorage.setItem("userData", JSON.stringify(data));

      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro desconhecido");
    }
  }

  static async saveUsuario(userData: any): Promise<void> {
    try {
      await axios.post(`${VITE_REACT_APP_API_URL}/auth/save-usuario`, userData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      throw new Error("Erro ao salvar usuário: " + errorMessage);
    }
  }
}

export default AuthService;
