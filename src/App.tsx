import { registerRootComponent } from 'expo';
import { View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';

import Home from './pages/Home';

function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <View
        style={{
          backgroundColor: 'rgb(186, 230, 253)',
          paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
        }}
      >
        <StatusBar style="dark" />
        <Home />
      </View>
    </TailwindProvider>
  );
}

registerRootComponent(App);
