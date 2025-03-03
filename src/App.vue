<template>
  <div id="app" :class="mode">
    <AppHeader
      :mode="mode"
      :searchQuery="searchQuery"
      @toggle-mode="toggleMode"
      @showCreateBookmark="showCreateBookmarkForm"
      @update:searchQuery="searchQuery = $event"
    />

    <router-view :mode="mode" :editingBookmark="editingBookmark" @add-bookmark="addBookmark" />

    <div class="main-content" :mode="mode">
      <div class="category-filters">
        <button
          v-for="category in categories"
          :key="category"
          @click="filterBookmarks(category)"
          :class="{ active: selectedCategory === category }"
        >
          {{ category }}
        </button>
        <button @click="filterBookmarks('All')" :class="{ active: selectedCategory === 'All' }">
          All
        </button>
      </div>

      <!-- Conditional Rendering for Bookmarks -->
      <div class="bookmark-list">
        <template v-if="filteredBookmarks.length === 0">
          <p>No bookmarks available. Create your first bookmark!</p>
        </template>
        <template v-else>
          <BookmarkList
            :bookmarks="filteredBookmarks"
            :mode="mode"
            @select-bookmark="showBookmarkDetails"
          />
        </template>
      </div>

      <div v-if="selectedBookmark" class="bookmark-details" :class="mode">
        <h3>Bookmark Details</h3>
        <p><strong>URL:</strong> {{ selectedBookmark.url }}</p>
        <p><strong>Title:</strong> {{ selectedBookmark.title }}</p>
        <p><strong>Tag:</strong> {{ selectedBookmark.tags }}</p>
        <p><strong>Category:</strong> {{ selectedBookmark.category }}</p>
        <button @click="editBookmark(selectedBookmark)">Edit</button>
        <button @click="deleteBookmark(selectedBookmark.id)">Delete</button>
        <button @click="selectedBookmark = null">Close</button>
      </div>
    </div>

    <AppFooter :mode="mode" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import BookmarkList from './components/BookmarkList.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    BookmarkList,
    AppFooter,
  },
  data() {
    return {
      mode: localStorage.getItem('mode') || 'light',
      searchQuery: '',
      categories: ['Work', 'Personal', 'Travel', 'Finance', 'Other'],
      bookmarks: [],
      bookmarkIdCounter: 1,
      selectedBookmark: null,
      selectedCategory: 'All',
      editingBookmark: null,
    };
  },
  computed: {
    filteredBookmarks() {
      let categoryFiltered = this.selectedCategory === 'All'
        ? this.bookmarks
        : this.bookmarks.filter(bookmark => bookmark.category === this.selectedCategory);

      if (this.searchQuery.trim()) {
        const lowerQuery = this.searchQuery.toLowerCase();
        return categoryFiltered.filter(bookmark =>
          (bookmark.title?.toLowerCase().includes(lowerQuery) || '') ||
          (bookmark.url?.toLowerCase().includes(lowerQuery) || '') ||
          (bookmark.tags?.toLowerCase().includes(lowerQuery) || '')
        );
      }

      return categoryFiltered;
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', this.mode);
      document.body.classList.toggle('dark-mode', this.mode === 'dark');
      document.body.classList.toggle('light-mode', this.mode === 'light');
    },
    showCreateBookmarkForm() {
      this.$router.push('/bookmark-form');
    },
    addBookmark(newBookmark) {
      if (this.editingBookmark) {
        const index = this.bookmarks.findIndex(b => b.id === this.editingBookmark.id);
        if (index !== -1) {
          this.bookmarks[index] = { ...newBookmark, id: this.editingBookmark.id };
        }
        this.editingBookmark = null;
      } else {
        this.bookmarks.push({
          id: this.bookmarkIdCounter++,
          ...newBookmark
        });
      }
      this.showForm = false;
      this.$router.push('/');
    },
    cancelForm() {
      this.showForm = false;
      this.$router.replace('/');
    },
    showBookmarkDetails(bookmark) {
      this.selectedBookmark = bookmark;
      this.editingBookmark = null;
    },
    editBookmark(bookmark) {
      this.editingBookmark = { ...bookmark };
      this.$router.push({ name: 'edit-bookmark', params: { id: bookmark.id } });
    },
    deleteBookmark(bookmarkId) {
      this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
      this.selectedBookmark = null;
    },
    filterBookmarks(category) {
      this.selectedCategory = category;
    }
  },
  mounted() {
    document.body.classList.add(this.mode === 'dark' ? 'dark-mode' : 'light-mode');
  },
};
</script>

<style scoped>
/* Base Styles */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* App Container */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Main Content */
.main-content {
  display: flex;
  flex-direction: column; /* Stack content vertically */
  padding: 20px;
  gap: 20px; /* Space between elements */
  transition: background-color 0.3s ease;
}

/* Header and Footer */
header,
footer {
  padding: 1rem 2rem; /* Increased padding for header and footer */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
  transition: background 0.3s ease, color 0.3s ease;
}

footer {
  margin-top: auto; /* Ensure footer is at the bottom */
}

/* Category Filters */
.category-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allow wrapping of buttons */
}

/* Filter Button Styles */
.category-filters button {
  padding: 10px 15px;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: #333; /* Default text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

/* Active Filter Button */
.category-filters button.active {
  background: linear-gradient(135deg, #0056c1 0%, #004a98 100%);
  color: white;
}

/* Bookmark List */
.bookmark-list {
  display: grid; /* Use grid layout for bookmarks */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
  gap: 15px; /* Space between cards */
}

/* Individual Bookmark Card */
.bookmark-card {
  background: #ffffff; /* White background */
  border: 1px solid #ddd; /* Border for cards */
  border-radius: 10px; /* Rounded corners */
  padding: 15px; /* Padding inside cards */
  cursor: pointer; /* Pointer cursor for cards */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover Effect for Bookmark Cards */
.bookmark-card:hover {
  transform: translateY(-3px); /* Lift effect on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

/* Bookmark Details Section */
.bookmark-details {
  width: 100%; /* Full width for details */
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
  background: linear-gradient(135deg, #f4f4f4 0%, #ffffff 100%); /* Light background */
}

/* Bookmark Details Heading */
.bookmark-details h3 {
  margin: 0 0 15px; /* Space below heading */
}

/* Button Styles within Bookmark Details */
.bookmark-details button {
  padding: 10px 15px;
  margin-right: 10px; /* Space between buttons */
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

/* Button Hover Effects */
.bookmark-details button:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
}

/* Light Mode Styles */
.light {
  background-color: #f9f9f9; /* Light mode background */
  color: #333; /* Text color in light mode */
}

/* Dark Mode Styles */
.dark {
  background-color: #333; /* Dark mode background */
  color: #f5f5f5; /* Text color in dark mode */
}

/* Dark Mode Specific Styles */
.dark .bookmark-details {
  background: #444; /* Dark background for details */
}

.dark .bookmark-card {
  background: #555; /* Dark card background */
  border: 1px solid #666; /* Dark border */
}

/* Responsive Design Adjustments */
@media (max-width: 768px) {
  .main-content {
    padding: 10px; /* Less padding on smaller screens */
  }
  
  .bookmark-list {
    grid-template-columns: 1fr; /* Stack cards on top of each other */
  }
  
  .category-filters {
    flex-direction: column; /* Stack filters vertically */
  }

  .category-filters button {
    width: 100%; /* Full width for buttons on mobile */
  }
}
</style>
