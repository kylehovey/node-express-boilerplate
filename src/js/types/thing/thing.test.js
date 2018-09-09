import Thing from "./thing.js";

describe("Thing", () => {
  it("Should have a value that is set then gotten.", () => {
    const inst = new Thing;
    const another = new Thing(9001);

    expect(inst.getVal()).toBe(42);
    expect(another.getVal()).toBe(9001);
  });
});
