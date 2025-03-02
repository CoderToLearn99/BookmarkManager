<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Add Bookmark</h2>
      <form @submit.prevent="saveBookmark">
        <input type="text" v-model="bookmark.title" placeholder="Title" required />
        <input type="url" v-model="bookmark.url" placeholder="URL" required />
        <select v-model="bookmark.category" required>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Travel">Travel</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Save</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
  data() {
    return {
      bookmark: {
        title: '',
        url: '',
        category: this.categories[0] || '',
      },
    };
  },
  methods: {
    saveBookmark() {
      this.$emit('saveBookmark', { ...this.bookmark, id: Date.now() });
    },
    closeModal
