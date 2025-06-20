import { useState } from 'react';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

interface Tool {
  id: number;
  title: string;
  useCase: string;
  rating: number;
  price: number;
  image: string;
  category: string;
}

const sampleTools: Tool[] = [
  { id: 1, title: 'AI Writer', useCase: 'Writing', rating: 4.8, price: 29, image: '/tool1.png', category: 'Writing' },
  { id: 2, title: 'Marketing Genius', useCase: 'Marketing', rating: 4.5, price: 49, image: '/tool2.png', category: 'Marketing' },
  { id: 3, title: 'Site Builder AI', useCase: 'Websites', rating: 4.7, price: 59, image: '/tool3.png', category: 'Websites' },
  { id: 4, title: 'Code Buddy', useCase: 'Coding', rating: 4.6, price: 19, image: '/tool4.png', category: 'Coding' },
  { id: 5, title: 'AI Ads Optimizer', useCase: 'Marketing', rating: 4.4, price: 39, image: '/tool5.png', category: 'Marketing' },
  { id: 6, title: 'Blog Booster', useCase: 'Writing', rating: 4.3, price: 25, image: '/tool6.png', category: 'Writing' }
];

const categories = ['All', 'Marketing', 'Writing', 'Websites', 'Coding'];

export default function Home() {
  const [selected, setSelected] = useState('All');

  const filtered =
    selected === 'All' ? sampleTools : sampleTools.filter(t => t.category === selected);

  const handleFindTools = (query: string) => {
    // placeholder for search
    console.log('Searching for', query);
  };

  return (
    <div>
      <Navbar />
      <Hero onFindTools={handleFindTools} />
      <section className={styles.featured} id="featured">
        <h2>Featured AI Tools</h2>
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={selected === cat ? styles.activeFilter : ''}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {filtered.map(tool => (
            <div key={tool.id} className={styles.cardWrap}>
              <img src={tool.image} alt={tool.title} className={styles.image} />
              <ToolCard
                title={tool.title}
                description={tool.useCase}
                price={tool.price}
              />
            </div>
          ))}
        </div>
      </section>
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div>
            <img src="/step1.svg" alt="Describe" />
            <p>Describe your business</p>
          </div>
          <div>
            <img src="/step2.svg" alt="Recommend" />
            <p>Get personalized AI recommendations</p>
          </div>
          <div>
            <img src="/step3.svg" alt="Connect" />
            <p>Connect with trusted tool creators</p>
          </div>
        </div>
      </section>
      <section className={styles.freelancerCta}>
        <h2>Build AI Tools? Share your solution on FoundaBrain.</h2>
        <a href="/freelancer/dashboard" className={styles.ctaButton}>
          Join as a Freelancer
        </a>
      </section>
    </div>
  );
}
