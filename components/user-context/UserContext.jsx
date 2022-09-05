import { createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: (user) => { return user; }
});

export default UserContext;