import React from 'react';
import IconRegistry from './IconRegistry';

type IconProps = {
  name: keyof typeof IconRegistry;
  size?: number;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<IconProps> = ({ name, size = 20, ...props }) => {
  const SelectedIcon = IconRegistry[name];

  if (!SelectedIcon) {
    console.warn(`Icon "${name}" does not exist in the registry.`);
    return null;
  }

  return React.cloneElement(SelectedIcon, {
    width: size,
    height: size,
    ...props,
  });
};

export default Icon;
