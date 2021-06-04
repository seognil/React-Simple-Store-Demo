# react-simple-store-demo

60 lines of React state management (even includes types!)

It's the core concept demo of the full state management system in our product, already battle-tested.

- Pros
  - Super **tiny** to modified, only 60 lines
  - Super **easy** to use, only two APIs
  - Full **typescript** support

* What's not included in this demo
  - async support
  - actions auto merge (just like the original React `useState`)
  - `stateSelector` param and memorization (for performance)

## Demo

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-simple-store-demo)

```tsx
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
```

## References

https://github.com/gunn/pure-store
