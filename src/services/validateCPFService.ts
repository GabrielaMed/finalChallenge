class ValidateCPFService {
  handle(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    let sum: number;
    let rest: number;
    sum = 0;

    const isAllSame = [...cpf].every((digit) => digit === cpf[0]);
    if (isAllSame) {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }
    if (rest != parseInt(cpf.substring(9, 10))) return { valid: false, cpf };

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }
    if (rest != parseInt(cpf.substring(10, 11))) return { valid: false, cpf };

    return true;
  }
}

export default ValidateCPFService;
