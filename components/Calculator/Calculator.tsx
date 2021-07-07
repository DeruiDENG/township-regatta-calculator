import styles from './Calculator.module.scss';
import { FormEvent, useState } from 'react';
import { parse, RegattaStatus } from '../../utils/relay';

export const Calculator = () => {
  const [playerNumber, setPlayerNumber] = useState(5);
  const [points, setPoints] = useState<string>('');
  const [result, setResult] = useState<RegattaStatus[]>([]);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setButtonClicked(true);
    const { matches } = parse(playerNumber, Number(points));
    setResult(matches);
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formItem}>
          <label htmlFor="player-number" className={styles.label}>
            参赛成员数量：
          </label>
          <select
            name="player-number"
            id="player-number"
            value={playerNumber}
            onChange={(env) => setPlayerNumber(Number(env.target.value))}
          >
            {[
              4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
              22, 23, 24, 25, 26, 27, 28, 29, 30,
            ].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="points-input" className={styles.label}>
            对手分数：
          </label>
          <input
            id="points-input"
            type="number"
            value={points}
            min={0}
            onChange={(event) => setPoints(event.target.value)}
            required
          />
        </div>
        <button>提交</button>
      </form>
      {isButtonClicked && (
        <>
          <p className={styles.result}>
            {result.length ? '可能是全接力队伍' : '不是全接力队伍'}
          </p>
          {result.length > 0 && (
            <>
              <p>可能的组合(完成每一个任务的队员人数)：</p>
              {result.slice(0, 10).map((match, index) => {
                return (
                  <div className={styles.match} key={index}>
                    {JSON.stringify(match)}
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};
