import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { FormEvent, useState } from 'react';
import { parse, RegattaStatus } from '../utils/relay';

export default function Home() {
  const [playerNumber, setPlayerNumber] = useState(5);
  const [points, setPoints] = useState<string>('');
  const [matches, setResult] = useState<RegattaStatus[]>([]);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setButtonClicked(true);
    const { matches } = parse(playerNumber, Number(points));
    setResult(matches);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Regatta Points Calculater</title>
        <meta name="description" content="Regatta Points Calculater" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Regatta Points Calculater</h1>

        <p className={styles.description}>
          这个工具会帮助你计算对手是否为全接力模式
        </p>

        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label}>
            参赛成员数量：
            <select
              name="player-number"
              id="player-number"
              value={playerNumber}
              onChange={(env) => setPlayerNumber(Number(env.target.value))}
            >
              {[
                4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            对手分数：
            <input
              type="number"
              value={points}
              min={0}
              onChange={(event) => setPoints(event.target.value)}
              required
            />
          </label>
          <button>提交</button>
        </form>
        {isButtonClicked && (
          <>
            <p className={styles.description}>
              {matches.length ? '可能是全接力队伍' : '不是全接力队伍'}
            </p>
            {matches.length > 0 && (
              <>
                <p>可能的组合(完成每一个任务的队员人数)：</p>
                {matches.splice(0, 6).map((match, index) => {
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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
