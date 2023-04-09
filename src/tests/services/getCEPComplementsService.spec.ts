import GetCEPComplementsService from "../../services/getCEPComplementsService";
import axios from "axios";

describe("Get CEP Complements", () => {
  it("should provide default values for missing properties in the API response", async () => {
    const cep = "12345678";
    const mockAxiosGet = jest.fn().mockResolvedValue({
      data: {
        cep,
      },
    });
    jest.spyOn(axios, "get").mockImplementation(mockAxiosGet);

    const getCepService = new GetCEPComplementsService();
    const response = await getCepService.handle(cep);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    expect(response).toEqual({
      cep,
      logradouro: "Não encontrado",
      complemento: "Não encontrado",
      bairro: "Não encontrado",
      localidade: "Não encontrado",
      uf: "Não encontrado",
    });
  });
});
