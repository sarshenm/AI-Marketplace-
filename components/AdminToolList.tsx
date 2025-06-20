import React from 'react';
import ToolCard from './ToolCard';
import axios from 'axios';

export interface AdminTool {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  status: string;
}

export default function AdminToolList({ tools, refresh }: { tools: AdminTool[]; refresh: () => void }) {
  const handleAction = async (toolId: string, action: 'approve' | 'reject') => {
    await axios.post('/api/admin/moderate', { toolId, action });
    refresh();
  };

  return (
    <div>
      {tools.map(tool => (
        <div key={tool.id} style={{ marginBottom: '1rem' }}>
          <ToolCard title={tool.title} description={tool.description} tags={tool.tags} price={tool.price} />
          <p>Status: {tool.status}</p>
          <button onClick={() => handleAction(tool.id, 'approve')} style={{ marginRight: '0.5rem' }}>Approve</button>
          <button onClick={() => handleAction(tool.id, 'reject')}>Reject</button>
        </div>
      ))}
    </div>
  );
}
