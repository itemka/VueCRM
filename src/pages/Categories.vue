<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate v-on:created="addNewCategory" />
        <CategoryEdit
          :categories="categories"
          v-on:updated="updateCategory"
          :key="categories.length + updateCount"
          :choosedCategoryIdx="choosedCategoryIdx"
          v-if="categories.length"
        />
        <p v-else class="center">{{ 'Message_CategoriesAreEmpty' | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'

export default {
  name: 'Categories',
  metaInfo() {
    return {
      title: this.$getMetaTitle('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
    choosedCategoryIdx: 0
  }),
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    } catch (error) {}
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory)
    },
    updateCategory(updatedCategory) {
      const idx = this.categories.findIndex(({ id }) => id === updatedCategory.id)

      this.categories[idx].title = updatedCategory.title
      this.categories[idx].limit = updatedCategory.limit
      this.choosedCategoryIdx = idx
      this.updateCount++
    }
  }
}
</script>
