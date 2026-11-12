import React from 'react';

interface EditableTextProps {
  fieldKey?: string;
  defaultText: string;
  className?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({
  defaultText,
  className = '',
  as: Component = 'span',
}) => {
  return <Component className={className}>{defaultText}</Component>;
};
