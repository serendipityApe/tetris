import { getBoxLeftPoints } from "../game/matrix";

test("获取box左边界所有点", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1],
      [1, 1]
    ],
  };
  expect(getBoxLeftPoints(box.shape)).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ]);
});
