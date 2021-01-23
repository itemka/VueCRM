<template>
  <div>
    <h1>{{ helloText }}</h1>
    <PostForm/>
    <h1>Number of posts: {{ postsCount }}</h1>
    <div
      class="post"
      v-for="post in validPosts"
      :key="post.id"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PostForm from '@/components/PostForm'

export default {
  computed: {
    ...mapGetters([
      'validPosts',
      'postsCount',
      'helloText'
    ]),
  },
  methods:{
    ...mapActions(['fetchPosts']),
  },
  async mounted() {
    this.fetchPosts(5) // or this.$store.dispatch('fetchPosts', 5)
  },
  components: {
    PostForm
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: white;
  width: 500px;

  &>.post {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 20px;
  }
}
</style>
