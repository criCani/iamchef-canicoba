import { Icon } from '@iconify/react';

type IconifyIconProps = {
  icon: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  role?: string;
};

/**
 * Wrapper per le icone di Iconify
 * Uso: <IconifyIcon icon="mdi:clock" width="1.5em" height="1.5em" />
 */
export const IconifyIcon = ({
  icon,
  className,
  width = '1em',
  height = '1em',
  ...rest
}: IconifyIconProps) => {
  return (
    <Icon
      icon={icon}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
};

export default IconifyIcon;
