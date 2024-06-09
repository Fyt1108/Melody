import { defineStore } from 'pinia';
import cover1 from '../assets/cover.jpg';
import cover2 from '../assets/cover2.jpg';

// 假设你的图片资源已经通过某种方式导入或定义
const COVER_URL = [
  cover1,
  cover2
];

// 使用 defineStore 函数定义一个 store
export const usePlayerStore = defineStore('player', {
  // state 类似于 Vuex 的 state，返回一个函数，该函数返回初始状态对象
  state: () => ({
    isPlaying: false,
    coverUrl: '',
  }),
  getters: {},
  actions: {
    togglePlay(toggle?: boolean) {
      this.isPlaying = toggle !== undefined ? toggle : !this.isPlaying;
    },
    changeCover() {
      while (true) {
        const index = Math.floor(Math.random() * COVER_URL.length);
        const coverUrl = COVER_URL[index];
        if (coverUrl !== this.coverUrl) {
          this.coverUrl = coverUrl;
          break;
        }
      }
    },
  },
});
