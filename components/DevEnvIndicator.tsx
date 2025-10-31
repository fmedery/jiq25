import React from 'react';

const DevEnvIndicator: React.FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '5px 10px',
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999,
      }}
    >
      DEV
    </div>
  );
};

export default DevEnvIndicator;