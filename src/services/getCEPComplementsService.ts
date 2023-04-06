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
    return response.data;
  }
}

export default GetCEPComplementsService;
