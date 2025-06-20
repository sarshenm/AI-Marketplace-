import React, { useState } from 'react';

export interface WizardInputProps {
  onComplete: (value: string) => void;
}

export default function WizardInput({ onComplete }: WizardInputProps) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');

  const steps = [
    'Describe your problem',
    'Provide any additional details'
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(value);
    }
  };

  return (
    <div>
      <p>{steps[step]}</p>
      <textarea value={value} onChange={e => setValue(e.target.value)} rows={4} style={{ width: '100%' }} />
      <button onClick={handleNext} style={{ marginTop: '0.5rem' }}>
        {step < steps.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}
