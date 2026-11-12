import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import { Milestone } from '../config';
import { EmptyFrame } from '../components/EmptyFrame';
import { EditableText } from '../components/EditableText';

interface LoveStorySectionProps {
  partnerName: string;
  milestones: Milestone[];
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({
  partnerName,
  milestones,
}) => {
  return (
    <section id="story" className="relative py-20 px-4 bg-[#FFF9F5] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>Chapter By Chapter</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 mb-3">
            Our Love Story, {partnerName}
          </h2>
          <p className="font-sans text-rose-800/80 text-sm sm:text-base">
            Every step we took together brought us to this magical milestone.
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Timeline Container */}
        <div className="relative">
          {/* Vertical line for Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 border-l-2 border-dashed border-rose-300" />

          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 border-t-2 border-dashed border-rose-300 -translate-y-1/2 z-0" />

          {/* Milestones Grid / Flex */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-10 md:space-y-0 md:space-x-4 relative z-10">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="flex md:flex-col items-start md:items-center relative pl-14 md:pl-0 flex-1 group"
                >
                  {/* Heart Node */}
                  <div className="absolute left-3.5 md:left-1/2 -translate-x-1/2 md:static md:mb-4 z-20">
                    <div className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 group-hover:bg-rose-600 transition-all">
                      <Heart className="w-4 h-4 fill-white" />
                    </div>
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`w-full bg-white p-4 sm:p-5 rounded-2xl shadow-lg border border-rose-100/90 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${
                      isEven ? 'md:mt-0' : 'md:mt-6'
                    }`}
                  >
                    {/* Empty Photo Slot */}
                    <div className="w-full aspect-square mb-3.5 rounded-xl overflow-hidden bg-rose-50 border border-rose-100">
                      <EmptyFrame
                        id={m.id}
                        src={m.photo}
                        alt={m.title}
                        aspectRatio="square"
                        shape="rounded"
                        placeholderText={m.title}
                      />
                    </div>

                    {/* Date Pill */}
                    <div className="flex items-center space-x-1 text-[11px] font-semibold text-rose-600 mb-1">
                      <Calendar className="w-3 h-3" />
                      <EditableText
                        fieldKey={`milestone_date_${m.id}`}
                        defaultText={m.date}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                      <EditableText
                        fieldKey={`milestone_title_${m.id}`}
                        defaultText={m.title}
                      />
                    </h3>

                    {/* Description */}
                    <div className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                      <EditableText
                        fieldKey={`milestone_desc_${m.id}`}
                        defaultText={m.description}
                        multiline
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

