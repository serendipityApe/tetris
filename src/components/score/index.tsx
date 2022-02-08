import React from "react";
import "./score.scss";
type Props = {
  score: number;
};

const Score = (props: Props) => {
  const [processFlag, setProcessFlag] = React.useState<number>(0);
  const preScore = React.useRef<number>(0);
  //allTime = 500
  React.useEffect(() => {
    if (preScore.current !== props.score) {
      preScore.current = props.score;
    }
  });
  const callbackConsumer = React.useCallback(() => {
    setProcessFlag(props.score - preScore.current);
    setTimeout(() => {
      setProcessFlag(0);
    }, 500);
  }, [props.score]);
  React.useLayoutEffect(() => {
    callbackConsumer();
  }, [callbackConsumer]);
  return (
    <div className="gameScore">
      <span className="label">score: </span>
      <span className="score">{props.score}</span>
      {processFlag ? (
        <span className="process">+{processFlag}</span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Score;
