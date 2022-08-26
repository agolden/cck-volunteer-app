import LayoutContainer from '@components/layout-container';
import Hero from '@components/hero';
import { NextSeo } from 'next-seo';
import Splash from '@components/splash';

import { useState } from 'react';
import UserContext from '@components/user-context';
import Router from 'next/router'
import Login from '@components/login';


const Home = () => {

  const [user, setUser] = useState(null);

  let content = (user == null ? 
    (
      <Login />
    )
     : 
    (
      <LayoutContainer>
        <Hero />
      </LayoutContainer>
    )
  );

  return (
    <UserContext.Provider value={user}>
      <NextSeo
        title="Cambridge Community Kitchen"
        description="We are a food solidarity collective tackling food poverty in Cambridge"
        openGraph={{
          title: 'Cambridge Community Kitchen',
          description:
            'We are a food solidarity collective tackling food poverty in Cambridge',
          images: [{ url: 'https://cckitchen.uk/cck-preview.png' }],
          url: 'https://cckitchen.uk',
        }}
      />
      <Splash/>
      {content}
    </UserContext.Provider>
  );
};

export default Home;
