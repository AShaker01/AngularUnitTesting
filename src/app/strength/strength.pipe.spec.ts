import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    let strengthPipe = new StrengthPipe();
    expect(strengthPipe.transform(5)).toEqual('5 (weak)');
  });
});
