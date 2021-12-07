import { getBoxBottomPoints } from "../game/matrix";

test("获取box底部所有点", () => {
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  };
  expect(getBoxBottomPoints(box.shape)).toEqual([{ x: 0, y: 1 }]);
});
