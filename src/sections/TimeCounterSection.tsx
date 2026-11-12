import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Clock } from 'lucide-react';

interface TimeCounterSectionProps {
  partnerName: string;
  startDate: string;
  anniversaryDate: string;
}

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  daysToNextAnniversary: number;
}

export const TimeCounterSection: React.FC<TimeCounterSectionProps> = ({
  partnerName,
  startDate,
  anniversaryDate,
}) => {
  const [time, setTime] = useState<TimeElapsed>({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0,
    daysToNextAnniversary: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      // Next anniversary calculation
      const nowYear = new Date().getFullYear();
      const annivMonthDay = new Date(anniversaryDate);
      let nextAnniv = new Date(nowYear, annivMonthDay.getMonth(), annivMonthDay.getDate()).getTime();
      if (nextAnniv < now) {
        nextAnniv = new Date(nowYear + 1, annivMonthDay.getMonth(), annivMonthDay.getDate()).getTime();
      }
      const daysToNext = Math.ceil((nextAnniv - now) / (1000 * 60 * 60 * 24));

      setTime({
        days,
        hours,
        minutes,
        seconds,
        daysToNextAnniversary: daysToNext,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate, anniversaryDate]);

  const timeCards = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section id="counter" className="relative py-20 px-4 bg-blush/40 overflow-hidden">
      {/* Subtle floating background petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-rose-300 text-2xl opacity-60 animate-float">🌸</div>
        <div className="absolute bottom-12 right-12 text-rose-400 text-xl opacity-60 animate-float" style={{ animationDelay: '1.5s' }}>🌹</div>
        <div className="absolute top-1/2 right-1/4 text-rose-200 text-3xl opacity-50 animate-float" style={{ animationDelay: '2.5s' }}>♥</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold mb-3">
          <Clock className="w-4 h-4 text-rose-600" />
          <span>Every Second Counts</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 mb-3">
          Counting Every Moment With You, {partnerName}
        </h2>
        <p className="font-sans text-rose-800/80 text-sm sm:text-base max-w-lg mx-auto mb-10">
          From the day our forever started to this very heartbeat.
        </p>

        {/* Live ticking cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {timeCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl border border-rose-100/90 flex flex-col items-center justify-center transform hover:-translate-y-1 transition-all"
            >
              <div className="relative font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-rose-600 tracking-tight">
                {String(card.value).padStart(2, '0')}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-rose-900/70 uppercase tracking-widest mt-2">
                {card.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Next Anniversary Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs sm:text-sm font-medium shadow-md shadow-rose-500/25"
        >
          <Calendar className="w-4 h-4" />
          <span>Next anniversary celebration in: </span>
          <strong className="text-yellow-200 font-bold ml-1">
            {time.daysToNextAnniversary} days
          </strong>
        </motion.div>
      </div>
    </section>
  );
};

