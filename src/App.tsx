import { registerRootComponent } from 'expo';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';

import Home from './pages/Home';

function App() {
  return (
    <>
      <View style={{ height: 20 }}>
        <StatusBar style="auto" translucent={false} />
      </View>
      <TailwindProvider utilities={utilities}>
        <Home />
      </TailwindProvider>
    </>
  );
}

registerRootComponent(App);
