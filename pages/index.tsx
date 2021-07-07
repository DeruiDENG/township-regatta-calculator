import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { Calculator } from '../components/Calculator/Calculator';
import { Footer } from '../components/Footer/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>接力分数计算器</title>
        <meta name="description" content="Regatta Points Calculater" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>接力分数计算器</h1>
        <p className={styles.description}>
          这个工具会帮助你计算对手是否为全接力
        </p>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}
