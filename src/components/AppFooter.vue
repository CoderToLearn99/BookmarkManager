<template>
  <footer :class="mode">
    <p>&copy; 2025 Smart Bookmark Manager</p>
  </footer>
</template>

<script>
export default {
  props: {
    mode: String,
  }
};
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  transition: background 0.3s ease;
}



footer.light {
  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
}

/* Dark Mode */
footer.dark {
  background-color: #333333;
  color: #fff;
}
</style>

