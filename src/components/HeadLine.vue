<template>
  <div class="head-line">
    <div class="d-flex select-line">
      <div class="d-flex">
        <button :class="{'active': openedList}" class="btn-link btn-select" @click="toggleList">Породы</button>
        <a v-if="namePage" class="btn-link btn-round text-uppercase" href="/">{{namePage}}</a>
      </div>


      <SwitchSelect v-if="visibleSwitch" @input="toggleRandom" v-model="isRandom"/>
    </div>
    <button @click="openedList = !openedList" v-if="openedList" class="btn-link btn-round">
      Все пёсели
    </button>
    <ul v-show="openedList" class="button-block">
      <li :class="{'first-in-alphabet': firstLetter !== firstLetter}" v-for="(item, i) in getList" :key="i+'item'">
        <span class="alphabet-letter" v-if="firstLetter !== firstLetter">{{firstLetter}}</span>
        <a :href="'/'+ item" class="btn-link">
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import SwitchSelect from "./SwitchSelect"
import {mapGetters} from "vuex";

export default {
  name: 'HeadLine',
  components: {SwitchSelect},
  data: function () {
    return {
      openedList: false,
      visibleSwitch: false
    }
  },
  props:{
    isRandom:{
      type: Boolean,
    },
    selectedName:{
      type: String,
    }
  },
  computed: {
    ...mapGetters([
          'getList'
        ]
    ),
    namePage(){
      return this.$route.params.id
    }
  },
  methods:{
    toggleRandom(){
      this.$emit('changeFilter')
    },
    firstLetter(word){
      return word && word[0]
    },
    toggleList(){
      this.openedList = !this.openedList
    }
  },
  created() {
    (this.$route.name === 'Home') && (this.visibleSwitch = true)
  }
}

</script>
<style>
.text-uppercase{
  text-transform: capitalize;
}
.button-block {
  list-style-type: none;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 30px 0 60px;
}

.button-block li, .btn-round {
  display: inline-flex;
  margin: 0 15px 15px 0;
  padding: 0 12px;
  white-space: nowrap;
  height: 24px;
  align-items: center;
  border: 1px solid #626262;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
}

.btn-link {
  color: #ffffff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;;
}
.btn-link.btn-round{
  color: #3c59f0;
  border-color: #3c59f0;
  background: none;

}
.select-line {
  justify-content: space-between;
  padding: 14px 30px 50px;
}
.select-line .btn-link.btn-round{
  margin-bottom: 0;
}
.select-line .d-flex{
  align-items: center;
}
.alphabet-letter {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.01em;
  text-indent: -60px;
  text-transform: uppercase;
}

.button-block .first-in-alphabet {
  margin-left: 20px;
}

.btn-select {
  border: 0;
  background: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  color: #ffffff;
  border-bottom: 0.1em dashed #fff;
  margin-right: 20px;
}

.btn-select:after {
  margin-left: 10px;
  position: relative;
  content: '';
  border: solid #fff;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  top: -2px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.btn-select.active:after {
  top: 2px;
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

</style>