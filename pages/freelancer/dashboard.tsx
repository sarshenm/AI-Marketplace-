import useSWR from 'swr';
import axios from 'axios';
import ToolCard from '../../components/ToolCard';

interface ToolListing {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
}

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
    })
    .then(res => res.data);

export default function FreelancerDashboard() {
  const { data, error } = useSWR<ToolListing[]>('/api/tools?mine=true', fetcher);

  if (error) return <div>Error loading tools.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your Tools</h1>
      {data.map(tool => (
        <ToolCard key={tool.id} title={tool.title} description={tool.description} tags={tool.tags} price={tool.price} />
      ))}
    </div>
  );
}
