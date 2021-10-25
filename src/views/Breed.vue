<template>
  <div>
    <HeadLine :selectedName="namePage"/>
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
import HeadLine from "../components/HeadLine";
import {mapActions, mapGetters} from "vuex";
import ImageLoad from "../components/ImageLoad";

export default {
  name: "Breed",
  components: { HeadLine, ImageLoad},
  data: function () {
    return {
      page: 1,
      loading: false,
      itemsPerPage: 20,
      listBread: []
    }
  },
  computed: {
    ...mapGetters([
          'getListBreed'
        ]
    ),
    itemsCount() {
      return  this.page * this.itemsPerPage;
    },
    list() {
      return this.getListBreed.slice(0,this.itemsCount)
    },
    namePage(){
      return this.$route.params.id
    }
  },
  methods:{
    ...mapActions([
      'getImagesBred'
    ]),
    loadMore(e) {
      let { scrollTop, clientHeight, scrollHeight } = e.target;
      if(this.itemsCount >= this.getListBreed.length) return
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
      this.listBread = this.getImagesBred(this.namePage);
  }
}
</script>

<style scoped>

</style>