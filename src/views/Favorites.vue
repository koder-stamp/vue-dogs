<template>
  <div>
    <div class="d-flex scrollable" @scroll="loadMore" ref="scroll">
      <div class="item" v-for="(item, i) in list " :key="i + 'list'">
        <ImageLoad  :src="item"/>
      </div>
      <transition name="fade">
        <p v-if="loading" class="loading">Loading</p>
      </transition>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import ImageLoad from "../components/ImageLoad";

export default {
  components: {ImageLoad},
  data: function () {
    return {
      page: 1,
      loading: false,
      itemsPerPage: 20,
      listFavorite: []
    }
  },
  computed: {
    ...mapGetters([
          'getListFavorites'
        ]
    ),
    itemsCount() {
      return  this.page * this.itemsPerPage;
    },
    list() {
      console.log(this.listFavorite)
      return this.listFavorite && this.listFavorite.slice(0,this.itemsCount)
    },
  },
    methods:{
      loadMore(e) {
        let { scrollTop, clientHeight, scrollHeight } = e.target;
        if(this.itemsCount >= this.listFavorite.length) return
        if (!this.loading && scrollTop + clientHeight >= scrollHeight*4/5) {
          this.loading = true;
          setTimeout(() => {
            this.page++;
            this.loading = false;
          }, 1000);
        }
      },
    },
  created() {
    this.listFavorite = JSON.parse(localStorage.getItem("favorites"));
  }
}
</script>