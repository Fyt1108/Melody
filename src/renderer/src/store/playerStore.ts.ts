import { defineStore } from 'pinia';

// 使用 defineStore 函数定义一个 store
export const usePlayerStore = defineStore('player', {
  // 返回一个函数，该函数返回初始状态对象
  state: () => ({
    isPlaying: false,
    coverUrl: '',
  }),
  getters: {},
  actions: {
    togglePlay(toggle?: boolean) {
      this.isPlaying = toggle !== undefined ? toggle : !this.isPlaying; //改变播放状态
    },
    changeCover(url: string) {
      this.coverUrl = url //改变封面
    }
  },
});
