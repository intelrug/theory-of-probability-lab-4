<template>
  <div class="content">
    <Menu></Menu>
    <router-view style="float: right; padding: 0 50px"></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: { Menu },
};
</script>

<style>
  .content {
    justify-content: left;
  }
</style>
