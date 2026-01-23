import { useState, useEffect, useCallback, useRef } from 'react';
import { API_BASE_URL } from '../config';

export const useHealthMonitor = ({
  requestTimeout = 15000,
  pingInterval = 7000,
  pingEndpoint = '/api/health/ping',
  maxFailedAttempts = 3,
  onStatusChange
} = {}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const checkingRef = useRef(false);
  const mountedRef = useRef(true);
  const intervalRef = useRef(null);

  const ping = useCallback(async () => {
    if (checkingRef.current || !mountedRef.current) return;

    checkingRef.current = true;
    setIsChecking(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

      const res = await fetch(`${API_BASE_URL}${pingEndpoint}`, {
        cache: 'no-store',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setFailedAttempts(0);

      if (!isOnline) {
        setIsOnline(true);
        onStatusChange?.(true);
      }
    } catch (err) {
      setFailedAttempts(prev => {
        const next = prev + 1;

        if (next >= maxFailedAttempts && isOnline) {
          setIsOnline(false);
          onStatusChange?.(false);
        }

        return next;
      });
    } finally {
      checkingRef.current = false;
      mountedRef.current && setIsChecking(false);
    }
  }, [pingEndpoint, maxFailedAttempts, isOnline, onStatusChange]);

  useEffect(() => {
    mountedRef.current = true;

    ping(); // стартовый чек
    intervalRef.current = setInterval(ping, pingInterval);

    window.addEventListener('online', ping);

    return () => {
      mountedRef.current = false;
      clearInterval(intervalRef.current);
      window.removeEventListener('online', ping);
    };
  }, [ping, pingInterval]);

  return {
    isOnline,
    isChecking,
    failedAttempts,
    retry: ping
  };
};
