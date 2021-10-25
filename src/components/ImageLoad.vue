<template>
  <div class="item">
    <img :src="resSrc" :alt="item">
    <div class="name">{{item}}</div>
    <button class="liked" @click="toggleFavorite">
      <img src="../img/heart.svg">
    </button>
  </div>

</template>
<script>
import {mapActions} from "vuex";

export default {
  name: 'imageLoad',
  props: {
    item: null,
    src: null
  },
  data: function () {
    return {
      srcRes: '',
    }
  },
  computed:{
    resSrc(){
      return this.src || this.srcRes
    }
  },
  methods:{
    ...mapActions([
      'getImageBredRandom',
      'setFavorites'
    ]),

    async getImageSrc() {
      let result = await this.getImageBredRandom(this.item);
      return result;
    },
    toggleFavorite(){
      this.setFavorites(this.resSrc)
    }
  },
 async created() {
    this.srcRes = !this.src && await this.getImageSrc()
  }
}
</script>