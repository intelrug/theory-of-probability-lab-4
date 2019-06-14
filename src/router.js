import Vue from 'vue';
import Router from 'vue-router';
import TaskOne from './components/TaskOne.vue';
import TaskTwo from './components/TaskTwo.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'select',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/1',
      alias: '/',
      component: TaskOne,
    },
    {
      path: '/2',
      component: TaskTwo,
    },
  ],
});
