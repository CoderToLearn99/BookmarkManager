<template>
  <header :class="mode">
    <div class="logo">
      <h1>Smart Bookmark Manager</h1>
    </div>
    <div class="controls">
      <input
        v-model="searchQuery"
        class="search-bar"
        type="text"
        placeholder="Search Bookmarks"
        @input="$emit('update:searchQuery', searchQuery)"
      />
      <button @click="searchBookmarks" class="search-btn">Search</button>
      <button @click="toggleMode" class="mode-toggle-btn">
        {{ mode === 'light' ? 'Dark Mode' : 'Light Mode' }}
      </button>
      <button @click="goToCreateBookmarkPage" class="create-bookmark-btn">
        Create New Bookmark
      </button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AppHeader',  // Updated component name
  props: {
    mode: String,
  },
  emits: ['toggle-mode', 'showCreateBookmark'],
  setup(props, { emit }) {
    const searchQuery = ref('');

    const toggleMode = () => {
      emit('toggle-mode');
    };

    const searchBookmarks = () => {
      console.log(searchQuery.value);
      // Implement bookmark search logic here
    };

    const goToCreateBookmarkPage = () => {
      emit('showCreateBookmark');
      // Optionally, you can also navigate using router
      // router.push({ name: 'CreateBookmark' });
    };

    return { searchQuery, toggleMode, searchBookmarks, goToCreateBookmarkPage };
  },
};
</script>

<style scoped>
/* Header styling */
header {
  padding: 1rem;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
}



header.light {
  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
}

/* Dark Mode */
header.dark {
  background-color: #333333;
  color: #fff;
}

/* Controls styling */
.controls {
  display: flex;
  align-items: center;
  gap: 15px; /* Increased gap for better spacing */
}

/* Search bar styling */
.search-bar {
  padding: 10px;
  font-size: 16px; /* Increased font size for better readability */
  width: 250px; /* Wider search bar */
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

/* Search bar focus effect */
.search-bar:focus {
  border-color: #0070f3;
  box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
}

/* Search button styling */
.search-btn {
  padding: 10px 20px;
  font-size: 16px; /* Increased font size */
  cursor: pointer;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Search button hover effect */
.search-btn:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px);
}

/* Mode toggle button styling */
.mode-toggle-btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
  border-radius: 8px;
  font-size: 16px; /* Increased font size */
  transition: all 0.3s ease;
}

/* Mode toggle button hover effect */
.mode-toggle-btn:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px);
}

/* Create bookmark button styling */
.create-bookmark-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px; /* Increased font size */
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Create bookmark button hover effect */
.create-bookmark-btn:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px);
}

/* Responsive styles */
@media (max-width: 600px) {
  .search-bar {
    width: 100%; /* Make search bar full width on mobile */
  }

  header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    flex-direction: column;
    gap: 10px;
  }
}
</style>

