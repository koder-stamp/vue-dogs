<template>
  <div id="app" >
    <div id="nav" class="d-flex">
      <router-link to="/">
        <img src="./img/logo.png">
      </router-link>
      <router-link to="/favorites">Избранные пёсели</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods:{
    ...mapActions([
      'getListBreeds'
    ])
  },
  async created() {
   await this.getListBreeds()
  }
}
</script>
<style>
@import './main.css';
</style>
