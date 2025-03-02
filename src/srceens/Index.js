import React, {useState} from 'react';
import RootNavigator from './root/RootNavigator';
import {DimensionProvider} from '../context/DimensionContext';
import {ThemeProvider} from '../context/ThemeContext';
import {UserProvider} from '../context/UserContext';
import Splash from './splash/Splash';
import {ModalProvider} from '../context/ModalContext';

const Index = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false); // Hide the splash screen
  };

  return (
    <UserProvider>
      <ThemeProvider>
        <DimensionProvider>
          <ModalProvider>
            {isSplashVisible ? (
              <Splash onFinish={handleSplashFinish} />
            ) : (
              <RootNavigator />
            )}
          </ModalProvider>
        </DimensionProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

export default Index;
