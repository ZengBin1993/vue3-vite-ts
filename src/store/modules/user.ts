import { defineStore } from 'pinia';

interface UserState {
  init: number;
  token: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    init: 0,
    token: '',
  }),
  getters: {
    getInit(): number {
      return this.init;
    },
    getToken(): string {
      return this.token;
    },
  },
  actions: {},
});
