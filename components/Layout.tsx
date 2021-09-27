import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = props => (
  <div className="bg-kds-light">
    <div className="container mx-auto min-h-screen p-5">{props.children}</div>
  </div>
);

export default Layout;
