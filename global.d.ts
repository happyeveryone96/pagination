import React, { ReactNode } from 'react';

declare global {
  type FCC<T = object> = React.FC<{ children?: ReactNode | ReactNode[] } & T>;
}
