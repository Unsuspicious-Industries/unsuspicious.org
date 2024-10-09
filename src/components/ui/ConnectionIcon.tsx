import React, { useEffect, useState } from 'react';

import "~/components/common/auth";

interface ConnectionIconProps {
  iconClass: string;
  iconName: string;
}

const ConnectionIcon: React.FC<ConnectionIconProps> = ({ iconClass, iconName }) => {
  const [user, setUser] = useState<string | null>(null);

  // user event listener for root element logged-in class
  useEffect(() => {
    const root = document.documentElement;
    if (!root) {
      console.error('Root element not found');
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const loggedIn = root.classList.contains('logged-in');
          const user = localStorage.getItem('username');
          setUser(loggedIn ? user : null);
        }
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // call the event listener on mount
  useEffect(() => {
    const root = document.documentElement;
    if (!root) {
      console.error('Root element not found');
      return;
    }

    const loggedIn = root.classList.contains('logged-in');
    const user = localStorage.getItem('username');
    setUser(loggedIn ? user : null
    );
  });

  return (
    <div>
      {user ? (
        <span className={iconClass}>{user}</span>
      ) : (
        <span className={iconClass}>login</span>
      )}
    </div>
  );
};

export default ConnectionIcon;