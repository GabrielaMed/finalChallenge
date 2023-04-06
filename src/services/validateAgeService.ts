class ValidateAgeService {
  handle(dateOfBirth: Date): boolean {
    const today = new Date();
    const birthDateObj = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age >= 18 ? true : false;
  }
}

export default ValidateAgeService;
