import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import ButtonAppBar from 'src/components/AppBar';
import SetupEventForm from 'src/components/SetupEventForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Prize Event Dapp</title>
        <meta name="description" content="Decentralised prize event app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonAppBar />

      <div className={styles.main}>
        <SetupEventForm />
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
