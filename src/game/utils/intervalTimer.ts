export default function intervalTimer() {
    let t = 0;
    return (n: number, intervalTime: number) => {
      t += n;
      if (t >= intervalTime) {
        t = 0;
        return true;
      }
      return false;
    };
  }