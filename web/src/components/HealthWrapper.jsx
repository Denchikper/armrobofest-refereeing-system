import React from 'react';
import { useHealthMonitor } from '../hooks/useHealthMonitor';
import OfflineOverlay from './OfflineOverlay';

const HealthWrapper = ({ children }) => {
  const { isOnline, isChecking, retry } = useHealthMonitor({
    pingEndpoint: '/ping'
  });

  return (
    <>
      {children}

      <OfflineOverlay
        isVisible={!isOnline}
        isChecking={isChecking}
        onRetry={retry}
      />
    </>
  );
};

export default HealthWrapper;
