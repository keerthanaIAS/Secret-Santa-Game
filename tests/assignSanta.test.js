const assignSecretSanta = require("../src/assignSanta");

test("All employees should get a unique Secret Santa", async () => {
  const pairs = await assignSecretSanta("./data/employees.csv", "./data/previous_assignments.csv");

  expect(pairs).toBeDefined();
  expect(pairs.length).toBeGreaterThan(1);

  //Ensuring each person has a unique Secret Santa
  const santas = new Set(pairs.map((p) => p.Employee_EmailID));
  const recipients = new Set(pairs.map((p) => p.Secret_Child_EmailID));

  expect(santas.size).toBe(pairs.length);
  expect(recipients.size).toBe(pairs.length);
});

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.warn.mockRestore();
});
