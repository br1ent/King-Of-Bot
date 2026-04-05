<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<script setup>
import { $ } from 'jquery';

$.ajax({
  url: "http://127.0.0.1:3000/hello",
  type: "get",
  success: resp => {
    console.log(resp)
  }
})

</script>

<style scoped>

</style>