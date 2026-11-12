import { useState, useEffect, useCallback } from 'react';

export interface GyroState {
  gamma: number; // Left to right tilt (-90 to 90)
  beta: number;  // Front to back tilt (-180 to 180)
  supported: boolean;
  permissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
}

export function useGyroscope(): GyroState {
  const [tilt, setTilt] = useState({ gamma: 0, beta: 0 });
  const [supported, setSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setSupported(true);
      // On non-iOS devices or already permitted environments
      const DeviceOrientationEventAny = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (typeof DeviceOrientationEventAny.requestPermission !== 'function') {
        // Auto-enabled on Android / desktop emulation
        setPermissionGranted(true);
        const handleOrientation = (e: DeviceOrientationEvent) => {
          if (e.gamma !== null && e.beta !== null) {
            setTilt({
              gamma: Math.max(-45, Math.min(45, e.gamma)),
              beta: Math.max(-45, Math.min(45, e.beta - 45)), // neutral holding angle ~45 deg
            });
          }
        };
        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
      }
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const DeviceOrientationEventAny = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceOrientationEventAny?.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEventAny.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.gamma !== null && e.beta !== null) {
              setTilt({
                gamma: Math.max(-45, Math.min(45, e.gamma)),
                beta: Math.max(-45, Math.min(45, e.beta - 45)),
              });
            }
          };
          window.addEventListener('deviceorientation', handleOrientation);
          return true;
        }
      } catch (err) {
        console.warn('Orientation permission error:', err);
      }
      return false;
    }
    return true;
  }, []);

  return {
    gamma: tilt.gamma,
    beta: tilt.beta,
    supported,
    permissionGranted,
    requestPermission,
  };
}

