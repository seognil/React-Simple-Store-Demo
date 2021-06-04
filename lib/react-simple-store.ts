import { useState, useEffect } from 'react';
import produce from 'immer';
import type { Draft } from 'immer';

// * ================================================================================

interface Store<T> {
  getState: () => T;
  update: (updater: (draft: Draft<T>) => void) => void;
  subscribe: (subscriber: Function) => void;
}

// * ----------------------------------------------------------------

export const createTinyStore = <T>(initialState: T): Store<T> => {
  let innerState = initialState;
  let subscribers: Function[] = [];

  const getState = () => innerState;

  const update = (updater: (draft: Draft<T>) => void) => {
    const nextState = produce(innerState, (draft) => {
      updater(draft);
    });

    const SHOULD_UPDATE_FAST_CHECK = nextState !== innerState;
    if (SHOULD_UPDATE_FAST_CHECK) {
      innerState = nextState;
      subscribers.forEach((subscriber) => subscriber());
    }
  };

  const subscribe = (subscriber: Function) => {
    subscribers.push(subscriber);
    return () => {
      subscribers = subscribers.filter((e) => e !== subscriber);
    };
  };

  return { getState, update, subscribe };
};

// * ----------------------------------------------------------------

const createUseStoreState = <T>(store: Store<T>) => {
  const useStateState = () => {
    const [state, setState] = useState(store.getState());
    useEffect(() => store.subscribe(() => setState(store.getState())), []);
    return state;
  };
  return useStateState;
};

// * ----------------------------------------------------------------

export const createReactSimpleStore = <T>(initialState: T) => {
  const store = createTinyStore(initialState);
  const useStoreState = createUseStoreState(store);
  const updateStoreState = store.update;
  return [useStoreState, updateStoreState] as const;
};
