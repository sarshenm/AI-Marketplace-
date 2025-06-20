import { useState } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  onFindTools: (query: string) => void;
}

export default function Hero({ onFindTools }: HeroProps) {
  const [query, setQuery] = useState('');

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Find AI Tools for Your Business</h1>
      <p className={styles.subheading}>
        Instant access to powerful AI tools created by vetted freelancers.
      </p>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Tell us about your business..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className={styles.button} onClick={() => onFindTools(query)}>
          Find Tools
        </button>
      </div>
    </section>
  );
}
