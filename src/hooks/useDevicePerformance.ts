import { useState, useEffect } from 'react';

export interface PerformanceProfile {
  isLowEnd: boolean;
  particleCountMultiplier: number;
  enableComplex3D: boolean;
}

export function useDevicePerformance(): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>({
    isLowEnd: false,
    particleCountMultiplier: 1,
    enableComplex3D: true,
  });

  useEffect(() => {
    try {
      const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
      const memory = nav.deviceMemory || 8;
      const cores = nav.hardwareConcurrency || 4;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Consider low end if memory < 4GB or CPU cores <= 2
      const isLow = memory < 4 || cores <= 2;

      setProfile({
        isLowEnd: isLow,
        particleCountMultiplier: isLow ? 0.35 : isMobile ? 0.6 : 1.0,
        enableComplex3D: !isLow,
      });
    } catch {
      // Default fallback
      setProfile({
        isLowEnd: false,
        particleCountMultiplier: 0.8,
        enableComplex3D: true,
      });
    }
  }, []);

  return profile;
}

