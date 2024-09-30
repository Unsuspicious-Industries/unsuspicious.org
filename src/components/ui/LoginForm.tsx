import React, { useState, useEffect } from 'react';
import { login, isLoggedIn, logout } from '~/components/common/auth.ts';
import FormContainer from '~/components/ui/Form.tsx';
import type { Form } from '~/types.d.ts';

interface LoginData {
  token: string;
}

function logoutButton(className: string) {
  return (
    <button onClick={logout} className={className}>
      Log out
    </button>
  );
}

export default function LoginForm(props: Form) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = isLoggedIn();
    if (user) {
      setLoggedIn(true);
      setUsername(user);
    } else {
      setLoggedIn(false);
    }
  }, []);

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
          const user = isLoggedIn();
          setLoggedIn(loggedIn);
          setUsername(loggedIn ? user : null);
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


  return (
    <div>
      {loggedIn ? (
        <div className="logged-in-container">
          <h2>Logged in as {username}</h2>
          {logoutButton('bg-primary p-2 text-white rounded')}
        </div>
      ) : (
        <FormContainer
          {...props}
          onSuccess={login}
        />
      )}
      <style>{`
        .logged-in-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
}