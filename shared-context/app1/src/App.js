import { NameContextProvider } from '@shared-context/shared-library';
import React from 'react';

const Welcome = React.lazy(() => import('app2/Welcome'));

const App = () => (
  <div>
    <x-button prefix="oops, ">yak</x-button>
    <h1>Context Provider</h1>
    <h2>App 1</h2>
    <NameContextProvider.Provider value="Billy">
      <React.Suspense fallback="Loading Name">
        <Welcome />
      </React.Suspense>
    </NameContextProvider.Provider>
  </div>
);

export default App;
