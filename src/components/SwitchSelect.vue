<template>
  <div class="switch" @click="toggle">
    <span class="switch-label">{{label}}</span>
    <span
        class="toggle-wrapper"
        role="checkbox"
        :aria-checked="value.toString()"
        tabindex="0"
        @keydown.space.prevent="toggle"
    >
      <span
          class="toggle-background"
          :class="backgroundStyles"
      />
      <span
          class="toggle-indicator"
          :style="indicatorStyles"
      />
    </span>
  </div>

</template>
<script>
export default {
  name: 'SwitchSelect',
  props: {
    value:{
      type: Boolean,
      required: false
    }
  },
  computed: {
    label(){
     return  this.value ? 'Случайный порядок' : 'Сортировка по алфавиту'
    },
    backgroundStyles() {
      return {
        'gold-mid': this.value,
        'gray-lighter': !this.value
      };
    },
    indicatorStyles() {
      return { transform: this.value ? 'translateX(14px)' : 'translateX(0)' };
    }
  },
  methods: {
    toggle() {
      this.$emit('input', this.value);
    }
  }
}
</script>
<style scoped>
.switch{
  display: flex;
  align-items: center;

}
.switch-label{
  padding-right: 10px;
  font-size: 16px;
  line-height: 28px;
  text-align: right;
  letter-spacing: 0.01em;
  color: #626262;
}
.gold-mid{
  background-color: #666666;
}

.gray-lighter{
  background-color: #c2c2c2;
}

.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 32px;
  height: 18px;
  border-radius: 9999px;
}

.toggle-wrapper:focus {
  outline: 0;
}

.toggle-background {
  display: inline-block;
  border-radius: 9999px;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color .4s ease;
}

.toggle-indicator {
  position: absolute;
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow:  0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform .4s ease;
}
</style>