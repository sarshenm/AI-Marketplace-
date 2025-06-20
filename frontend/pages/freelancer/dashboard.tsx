import useSWR from 'swr';
import axios from 'axios';

interface ToolListing {
  id: string;
  title: string;
  description: string;
  approved: boolean;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function FreelancerDashboard() {
  const { data, error } = useSWR<ToolListing[]>('/api/tools', fetcher);

  if (error) return <div>Error loading tools.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Tools</h1>
      <ul>
        {data.map(tool => (
          <li key={tool.id}>
            <strong>{tool.title}</strong> - {tool.approved ? 'Approved' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
}
