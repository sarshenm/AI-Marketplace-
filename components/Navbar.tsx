import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>FoundaBrain</div>
      <div className={styles.navLinks}>
        <Link href="/tool-listing">Browse Tools</Link>
        <Link href="/login">Sign In</Link>
        <Link href="/register">Join</Link>
        <Link className={styles.button} href="/freelancer/dashboard">
          Post a Tool
        </Link>
      </div>
    </nav>
  );
}
