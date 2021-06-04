import React from 'react';
import type { FC } from 'react';
import { render } from 'react-dom';

// * ------------------------------------------------

import { createReactSimpleStore } from './lib/react-simple-store';

const [useStore, updateStore] = createReactSimpleStore({ count: 111 });

// * ------------------------------------------------

export const App: FC = () => (
  <>
    <CompA />
    <CompB />
  </>
);

const CompA: FC = () => {
  const state = useStore();

  return (
    <div>
      Child1 Counter: {state.count}
      <button onClick={() => updateStore((s) => s.count++)}> +++ </button>
      <button onClick={() => updateStore((s) => s.count--)}> --- </button>
    </div>
  );
};

const CompB: FC = () => {
  const state = useStore();

  return (
    <div>
      Child2 Counter: {state.count}
      <button onClick={() => updateStore((s) => s.count++)}> +++ </button>
      <button onClick={() => updateStore((s) => s.count--)}> --- </button>
    </div>
  );
};

// * ------------------------------------------------

const root = document.createElement('div');
document.body.appendChild(root);
render(<App />, root);
