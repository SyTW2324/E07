import 'mocha';
import {expect} from 'chai';

function add(a: number, b: number): number {
  return a + b;
}



describe("add function tests", () => {
  it("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).to.be.equal(9);
  });

  it("add(-1, 8) returns value 7", () => {
    expect(add(-1, 8)).to.be.equal(7);
  });
});
