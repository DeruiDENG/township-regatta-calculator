import styles from './Footer.module.scss';
import { GithubLink } from './GithubLink';

const Footer = () => (
  <footer className={styles.footer}>
      <GithubLink />
      <a href="https://nextjs.org/" rel="noopener noreferrer">
        Powered by Next.js
      </a>
  </footer>
);

export { Footer };
