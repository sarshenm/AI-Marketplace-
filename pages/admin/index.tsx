import useSWR from 'swr';
import axios from 'axios';
import AdminToolList, { AdminTool } from '../../components/AdminToolList';

const fetcher = (url: string) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } })
    .then(res => res.data);

export default function AdminDashboard() {
  const { data, error, mutate } = useSWR<AdminTool[]>('/api/tools?status=submitted', fetcher);

  if (error) return <div>Error loading tools.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminToolList tools={data} refresh={() => mutate()} />
    </div>
  );
}
