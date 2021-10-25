<template>
  <div>
    <HeadLine :isRandom="isRandom" @changeFilter="changeFilter"/>
    <div class="d-flex scrollable" @scroll="loadMore" ref="scroll">
      <div class="item" v-for="(item, i) in selectedFilter " :key="i + key">
        <imageLoad  :item="item"/>
      </div>
      <transition name="fade">
        <p v-if="loading" class="loading">Loading</p>
      </transition>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ImageLoad from "../components/ImageLoad";
import HeadLine from "../components/HeadLine";

export default {
  name: 'Home',
  components: {
    HeadLine,
    ImageLoad
  },
  data: function () {
    return {
      page: 1,
      loading: false,
      itemsPerPage: 20,
      isRandom: true
    }
  },
  computed: {
    ...mapGetters([
          'getList',
          'getListRandom'
        ]
    ),
    key(){
      return this.isRandom ? 'random' : 'alpha'
    },
    selectedFilter:{
      get(){
        return this.isRandom ? this.listRandom : this.list
      },
      set(){
      }
    },
    itemsCount() {
      return  this.page * this.itemsPerPage;
    },
    list() {
      return this.getList.slice(0,this.itemsCount)
    },
    listRandom() {
      return this.getListRandom.slice(0,this.itemsCount)
    },
  },
  methods:{
    ...mapActions([
      'getListBreeds'
    ]),
    changeFilter(){
      this.page = 1
      this.isRandom = !this.isRandom
      this.selectedFilter = this.isRandom ? this.listRandom : this.list
      this.$nextTick(() => {
        this.$refs.scroll.scrollTop = 0;
      });
    },
    loadMore(e) {
      let { scrollTop, clientHeight, scrollHeight } = e.target;
      if(this.itemsCount >= this.getList.length) return
      if (!this.loading && scrollTop + clientHeight >= scrollHeight*4/5) {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this.loading = false;
        }, 1000);
      }
    },
  }
}
</script>
<style >
.liked{
  background: none;
  padding: 10px;
  border: 0;
  outline: none;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
}
.item{
  width: 367px;
  height: 290px;
  background: linear-gradient(1.26deg, #000000 -5.53%, rgba(0, 0, 0, 0) 54.45%);
  border-radius: 8px;
  margin: 15px;
  position: relative;
}
.item .name{
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-transform: capitalize;
}
.scrollable{
  overflow-y: scroll;
  max-height: 980px;
}
.item img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.loading {
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  width: 100px;
  margin: auto;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  background: #000;
  border-radius: 4px; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s; }

.fade-enter,
.fade-leave-to {
  opacity: 0; }

</style>
