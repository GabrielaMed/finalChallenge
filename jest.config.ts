export default {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/tests/setupTests.ts"],
  testTimeout: 30000,
  testMatch: ["**/**/*.spec.ts"],
};
