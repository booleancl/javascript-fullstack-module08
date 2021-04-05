<template>
  <v-main>
    <h1>Productos</h1>
    <ul data-cy='products'>
      <li v-for="product in products" :key="product.id"> 
        {{ product.name }}
      </li>
    </ul>
  </v-main>
</template>

<script>
import { mapActions, mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['products'])
  },
  methods:{
    ...mapActions(['getProducts'])
  },
  created(){
    this.getProducts()
  }
}
</script>

<style>

</style>