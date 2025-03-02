<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by Title or Tags"
      />
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: String,
  },
  emits: ['updated:searchQuery'],
};
</script>