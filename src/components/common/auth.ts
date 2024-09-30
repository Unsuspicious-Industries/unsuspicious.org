// auth.ts

// Define the types for the functions
interface LoginData {
  token: string;
  username: string;
}

function setLoggedIn(loggedIn: boolean): void {
  if (loggedIn) {
    document.documentElement.classList.add('logged-in');
    console.log('User is logged in');
  } else {
    document.documentElement.classList.remove('logged-in');
    console.log('User is logged out');
  }
}


function update() {
  const user = isLoggedIn();
  if (user) {
    setLoggedIn(true);
  } else {
    setLoggedIn(false);
  }
}
// if client side, update the logged in status
if (typeof window !== 'undefined') {
  console.log('Adding event listener for login status');
  update();
}

// Login function
export function login(data: LoginData): void {
  if (typeof localStorage !== 'undefined') {
    console.log(`Logging in user: ${data.token}`);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('lastLogin', Date.now().toString());

    update();

  } else {
    console.error('localStorage is not defined');
  }
}

// Logout function
export function logout(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    update();
  } else {
    console.error('localStorage is not defined');
  }
}

// Check if user is logged in
export function isLoggedIn(): string | null {
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('username');
    } else {
      return null;
    }
  } else {
    console.error('localStorage is not defined');
    return null;
  }
}

// Check if user is an admin
export async function isAdmin(): Promise<boolean> {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const res = await fetch('https://cas.unsuspicious.org/auth/admin', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        const data = await res.json();
        return data.admin;
      } else {
        console.error('Error checking if user is admin: ', res.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking if user is admin: ', error);
      return false;
    }
  } else {
    console.error('localStorage is not defined');
    return false;
  }
}