import { useState } from 'react';
import WizardInput from '../components/WizardInput';
import ToolCard from '../components/ToolCard';
import axios from 'axios';

interface ToolListing {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
}

export default function CustomerWizard() {
  const [tools, setTools] = useState<ToolListing[] | null>(null);
  const handleComplete = async (prompt: string) => {
    const resp = await axios.post('/api/customer/onboard', { prompt });
    setTools(resp.data.data);
  };

  return (
    <div>
      <h1>Customer Onboarding Wizard</h1>
      {!tools && <WizardInput onComplete={handleComplete} />}
      {tools && tools.map(t => (
        <ToolCard key={t.id} title={t.title} description={t.description} tags={t.tags} price={t.price} />
      ))}
    </div>
  );
}
