import chunk from 'lodash/chunk'
import size from 'lodash/size'

export default {
  data: () => ({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    items: []
  }),
  methods: {
    handlePageChange(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
    setupPagination(allItems) {
      this.page = +this.$route.query.page || 1,
      this.allItems = chunk(allItems, this.pageSize)
      this.pageCount = size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    }
  }
}
