import {makeAutoObservable, runInAction} from "mobx";
import { enableStaticRendering } from "mobx-react";
import { makePersistable, hydrateStore } from "mobx-persist-store";
import { createContext, useContext } from "react";
import api from "@/store/api.js";

enableStaticRendering(typeof window === "undefined");

let store;
const server = typeof window === "undefined";

class RootStore {
  constructor() {
    this.Store = new Store(this);
  }
}

class Store {
  constructor(rootStore) {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });

    if (!server) {
      makePersistable(this, {
        name: `solana-shuffle`,
        properties: ["user"],
        storage: window.localStorage,
        removeOnExpiration: true,
      }).then(() => {

      });

    }
  }

  leaderboard = {
    daily: {
      total: 500,
      pageNumber: 5,
      resultsPerPage: 7,
      page: [
        {
          user: { name: 'Abyrwalg' },
          data: {
            totalGame: 19658,
            dailyGames: 19658,
            volume: 481138,
          }
        },
        {
          user: { name: 'Abyrwalg' },
          data: {
            totalGame: 19658,
            dailyGames: 19658,
            volume: 481138,
          }
        },
        {
          user: { name: 'Abyrwalg' },
          data: {
            totalGame: 19658,
            dailyGames: 19658,
            volume: 481138,
          }
        }
      ],
    },
    allTime: {

    },
  };

  async loadLeaderBoard(mode, page) {
    console.log('loading leaderboard');
    this.leaderboard = this.leaderboard || {};
    this.leaderboard[mode] = await api.loadLeaderBoard({ mode, page });
  }

  async hydrate(initialProps) {
    Object.keys(initialProps).forEach(key => {
      if (!this[`${key}`] || this[`${key}`]?.length === 0) { this[`${key}`] = initialProps[`${key}`]; }
      if (key === 'leaderboard') { this[`${key}`] = initialProps[`${key}`] || []; }
    });
    await hydrateStore(this);
  }

}

const initStore = initialProps => {
  return init(initialProps);
};

const init = initialProps => {
  store = store || new RootStore();
  if (initialProps) { (async () => { await store.Store?.hydrate(initialProps); })(); }
  return store.Store;
};

const StoreContext = createContext(null);

const StoreProvider = ({ store, children }) => {
  return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

const useStore = () => {
  return useContext(StoreContext);
};

export { StoreProvider, initStore, useStore };
