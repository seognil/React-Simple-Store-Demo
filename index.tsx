import React from 'react';
import type { FC } from 'react';
import { render } from 'react-dom';

// * ------------------------------------------------

import { createReactSimpleStore } from './lib/react-simple-store';

const [useStore, updateStore] = createReactSimpleStore({ count: 111 });

// * ------------------------------------------------

const App: FC = () => {
  const state = useStore();

  return (
    <div>
      Counter: {state.count}
      <button onClick={() => updateStore((s) => s.count++)}> +++ </button>
      <button onClick={() => updateStore((s) => s.count--)}> --- </button>
    </div>
  );
};

// * ------------------------------------------------

const root = document.createElement('div');
document.body.appendChild(root);
render(<App />, root);
