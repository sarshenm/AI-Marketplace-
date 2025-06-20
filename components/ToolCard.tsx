import React from 'react';

export interface ToolCardProps {
  title: string;
  description: string;
  tags?: string[];
  price?: number;
}

export default function ToolCard({ title, description, tags = [], price }: ToolCardProps) {
  return (
    <div className="tool-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>{description}</p>
      {tags.length > 0 && <p>Tags: {tags.join(', ')}</p>}
      {price !== undefined && <p>Price: ${price.toFixed(2)}</p>}
    </div>
  );
}
