module.exports = {
  props: {
    tab: Object,
    default: () => {
      return {}
    }
  },
  mounted() {
    this.load && this.load()
    this.$emit('loaded')
  }
}
