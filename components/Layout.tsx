import { useRouter } from 'next/router';
import React, { ReactNode, useState, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = props => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState('bg-kds-light');

  useEffect(() => {
    if (router.pathname.includes('baum')) {
      setBgColor('bg-tree-light');
    } else if (router.pathname.includes('mobilitaet')) {
      setBgColor('bg-mobility-light');
    } else if (router.pathname.includes('papier')) {
      setBgColor('bg-paper');
    } else if (router.pathname.includes('ernaehrung')) {
      setBgColor('bg-nutrition');
    }
  }, [router.pathname]);

  return (
    <div className={bgColor}>
      <div className="container mx-auto min-h-screen p-5">{props.children}</div>
    </div>
  );
};

export default Layout;
