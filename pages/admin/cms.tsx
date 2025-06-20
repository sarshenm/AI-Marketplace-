import useSWR from 'swr';
import axios from 'axios';

interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export default function CMSAdmin() {
  const { data, error } = useSWR<CMSPage[]>('/api/cms', fetcher);

  if (error) return <div>Error loading pages.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>CMS Pages</h1>
      <ul>
        {data.map(p => (
          <li key={p.id}>{p.title} ({p.slug})</li>
        ))}
      </ul>
    </div>
  );
}
