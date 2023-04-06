import axios from "axios";

interface Response {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

class GetCEPComplementsService {
  public async handle(cep: string): Promise<Response> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await axios.get<Response>(url);
    const responseData = {
      cep: response.data.cep,
      logradouro: response.data.logradouro || "Não encontrado",
      complemento: response.data.complemento || "Não encontrado",
      bairro: response.data.bairro || "Não encontrado",
      localidade: response.data.localidade || "Não encontrado",
      uf: response.data.uf || "Não encontrado",
    };
    return responseData;
  }
}

export default GetCEPComplementsService;
