<template>
  <div id="app" :class="mode">
    <AppHeader
      :mode="mode"
      :searchQuery="searchQuery"
      @toggle-mode="toggleMode"
      @showCreateBookmark="showCreateBookmarkForm"
      @update:searchQuery="searchQuery = $event"
    />
    <!-- Bookmark Form Popup -->
    <BookmarkForm 
      :class="mode"
      v-if="showForm" 
      @add-bookmark="addBookmark" 
      @cancel="cancelForm" 
      :categories="categories"
      :editingBookmark="editingBookmark"
    />
    <!-- Main Content Section (Bookmarks List & Bookmark Details) -->
    <div class="main-content" :class="mode">
      <!-- Filter buttons (above bookmark list) -->
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
      <!-- Bookmark List -->
      <BookmarkList 
        :bookmarks="filteredBookmarks" 
        @select-bookmark="showBookmarkDetails"
      />
      <!-- Bookmark Details Section (on the right side) -->
      <div v-if="selectedBookmark" class="bookmark-details">
        <h3>Bookmark Details</h3>
        <p><strong>URL:</strong> {{ selectedBookmark.url }}</p>
        <p><strong>Title:</strong> {{ selectedBookmark.title }}</p>
        <p><strong>Tag:</strong> {{ selectedBookmark.tag }}</p>
        <p><strong>Category:</strong> {{ selectedBookmark.category }}</p>
        <button @click="editBookmark(selectedBookmark)">Edit</button>
        <button @click="deleteBookmark(selectedBookmark.id)">Delete</button>
        <button @click="selectedBookmark = null">Close</button>
      </div>
    </div>
  <AppFooter :mode="mode"/>
  </div>
</template>

<script>
//import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import BookmarkForm from './components/BookmarkForm.vue';
import BookmarkList from './components/BookmarkList.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    BookmarkForm,
    BookmarkList,
    AppFooter,
  },
  data() {
    return {
      mode: 'light', // Default mode
      searchQuery: '',
      searchTerm: '',
      showForm: false,
      categories: ['Work', 'Personal', 'Travel', 'Finance', 'Other'],
      bookmarks: [],
      bookmarkIdCounter: 1,
      selectedBookmark: null,
      selectedCategory: 'All', // Default to showing all bookmarks
      editingBookmark: null,
    };
  },
  computed: {
    filteredBookmarks() {
      // Start with category filtering
    let categoryFiltered = this.selectedCategory === 'All'
      ? this.bookmarks
      : this.bookmarks.filter(bookmark => bookmark.category === this.selectedCategory);

    // Then apply search filtering separately
    if (this.searchQuery.trim()) {
      const lowerQuery = this.searchQuery.toLowerCase();
      return categoryFiltered.filter(bookmark => 
        (bookmark.title?.toLowerCase().includes(lowerQuery) || '') ||  // Safe access using `?.`
        (bookmark.url?.toLowerCase().includes(lowerQuery) || '') ||
        (bookmark.tag?.toLowerCase().includes(lowerQuery) || '')
      );
    }

    return categoryFiltered;
    }
  },
  toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
      document.body.classList.toggle('dark-mode', this.mode === 'dark'); 
      document.body.classList.toggle('light-mode', this.mode === 'light');
      localStorage.setItem('mode', this.mode); // Store mode preference
  },
  mounted() {
  this.mode = localStorage.getItem('mode') || 'light'; // Retrieve stored mode
  document.body.classList.add(this.mode === 'dark' ? 'dark-mode' : 'light-mode');
},
  methods: {
    toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
      document.body.classList.toggle('dark-mode', this.mode === 'dark'); 
      document.body.classList.toggle('light-mode', this.mode === 'light');
      localStorage.setItem('mode', this.mode); // Store mode preference
    },
    mounted() {
      this.mode = localStorage.getItem('mode') || 'light'; // Retrieve stored mode
      document.body.classList.add(this.mode === 'dark' ? 'dark-mode' : 'light-mode');
    },
    showCreateBookmarkForm() {
      this.showForm = true;
    },
    addBookmark(newBookmark) {
      if (this.editingBookmark) {
        // If editing, find the existing bookmark and update it
        const index = this.bookmarks.findIndex(b => b.id === this.editingBookmark.id);
        if (index !== -1) {
          this.bookmarks[index] = { ...newBookmark, id: this.editingBookmark.id };
        }
        this.editingBookmark = null; // Reset editing state
      } else {
        // Otherwise, add as a new bookmark
        this.bookmarks.push({
          id: this.bookmarkIdCounter++,
          ...newBookmark
      });
      }
      this.showForm = false;
    },
    cancelForm() {
      this.showForm = false;
    },
    showBookmarkDetails(bookmark) {
      this.selectedBookmark = bookmark;
      this.editingBookmark = null; 
    },
    editBookmark(bookmark) {
      // You can implement editing logic here (e.g., show the form with existing data)
      this.editingBookmark = { ...bookmark }; // Clone object to avoid modifying directly
      this.showForm = true;
      //alert(`Edit bookmark with ID: ${bookmark.id}`);
    },
    deleteBookmark(bookmarkId) {
      this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
      this.selectedBookmark = null;  // Close the details view after deletion
    },
    filterBookmarks(category) {
      this.selectedCategory = category;
    }
  }
};
</script>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
}

/* Light Mode (Default) */
body.light-mode {
  background-color: #ffffff;
  color: #333;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Dark Mode */
body.dark-mode {
  background-color: #121212;
  color: #ffffff;
}



/* Main content container */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column; /* Changed to column for vertical stacking */
  padding: 20px;
  gap: 20px;
}

.AppFooter {
  margin-top: auto; /* Pushes footer to the bottom */
  background: #333;
  color: white;
  text-align: center;
  padding: 15px;
}


/* Category filters styling */
.category-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center; /* Center the filters */
}

/* Filter button styles */
.category-filters button {
  padding: 10px 20px;
  background-color: linear-gradient(135deg, #74ebd5 0%, #9face6 100%); /* Gradient background for buttons */
  color: black !important;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
}

/* Active button style */
.category-filters button.active {
  background: linear-gradient(135deg, #0056c1 0%, #004a98 100%); /* Darker gradient for active buttons */
  box-shadow: 0 4px 15px rgba(0, 86, 193, 0.3); /* Stronger shadow for active state */
  transform: scale(1.05); /* Slightly enlarge active button */
  color: white;
}

/* Filter button styles */
.bookmark-details button {
  padding: 10px 20px;
  background-color: linear-gradient(135deg, #74ebd5 0%, #9face6 100%); /* Gradient background for buttons */
  color: black !important;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
}

/* Active button style */
.bookmark-details.active {
  background: linear-gradient(135deg, #0056c1 0%, #004a98 100%); /* Darker gradient for active buttons */
  box-shadow: 0 4px 15px rgba(0, 86, 193, 0.3); /* Stronger shadow for active state */
  transform: scale(1.05); /* Slightly enlarge active button */
  color: white;
}

/* Inactive button style */
.bookmark-details button.inactive {
  background: #f4f4f4; /* Light gray for inactive buttons */
  color: #000000 !important; /* Darker text for contrast */
  border: 1px solid #ccc; /* Border for inactive buttons */
}

/* Hover effect */
.bookmark-details button:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%); /* Lighten gradient on hover */
  color: white; /* Keep text color white on hover */
  transform: scale(1.03); /* Slightly enlarge on hover */
}

/* Inactive button style */
.category-filters button.inactive {
  background: #f4f4f4; /* Light gray for inactive buttons */
  color: black !important; /* Darker text for contrast */
  border: 1px solid #ccc; /* Border for inactive buttons */
}

/* Hover effect */
.category-filters button:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%); /* Lighten gradient on hover */
  color: white; /* Keep text color white on hover */
  transform: scale(1.03); /* Slightly enlarge on hover */
}

/* Bookmark details section styling */
.bookmark-details {
  width: 30%; /* Full width for the details section */
  padding: 20px;
  margin-left: 20px; /* Space between the list and details */
  border: 1px solid #ddd; /* Border for separation */
  background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%); /* Gradient background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Deeper shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

.bookmark-details:hover {
  transform: translateY(-2px); /* Slight lift on hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Bookmark list styling */
.bookmark-list {
  width: 70%; /* Full width for the list */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 20px; /* Padding for better spacing */
  border: 1px solid #ddd; /* Border for separation */
  border-radius: 10px; /* Rounded corners */
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%); /* Gradient background */
}

/* Individual bookmark card styling */
.bookmark-card {
  background: #ffffff; /* White background for individual cards */
  border: 1px solid #ddd; /* Border for cards */
  border-radius: 10px; /* Rounded corners for cards */
  margin: 10px 0; /* Margin between cards */
  padding: 15px; /* Padding inside cards */
  cursor: pointer; /* Pointer cursor for cards */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animation for hover effects */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Hover effect for bookmark cards */
.bookmark-card:hover {
  transform: translateY(-3px); /* Lift effect on hover */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.main-content.light {
  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
}

/* Dark Mode */
.main-content.dark {
  background-color: #333333;
  color: #fff;
}

/* Responsive Design for smaller screens */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column; /* Stack elements vertically on small screens */
  }

  .bookmark-details {
    border-left: none; /* Remove left border for smaller screens */
    border-top: 1px solid #ddd; /* Add top border for distinction */
  }

  .bookmark-list,
  .bookmark-details {
    width: 100%; /* Make both sections full width on small screens */
    margin-left: 0; /* Remove left margin on small screens */
    margin-top: 20px; /* Add margin between sections */
  }

  .category-filters button {
    padding: 8px 16px; /* Adjust padding for smaller screens */
    font-size: 0.9rem; /* Slightly smaller font size */
  }
}

</style>