import { registerRootComponent } from 'expo';
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';

import Home from './pages/Home';

function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <Home />
    </TailwindProvider>
  );
}

registerRootComponent(App);
