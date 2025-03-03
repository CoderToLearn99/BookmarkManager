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
  padding: 1rem 2rem; /* Increased padding for more space */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
  transition: background 0.3s ease, color 0.3s ease;
}

/* Light Mode */
header.light {
  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
  color: #333;
}

/* Dark Mode */
header.dark {
  background-color: #2c2c2c; /* Darker background for better contrast */
  color: white;
}

/* Controls styling */
.controls {
  display: flex;
  align-items: center;
  gap: 20px; /* Increased gap for better spacing */
}

/* Input and button styles shared between light and dark modes */
.search-bar,
.search-btn,
.mode-toggle-btn,
.create-bookmark-btn {
  border-radius: 8px;
  padding: 12px 18px; /* Slightly more padding for better touch target */
  font-size: 16px; /* Increased font size */
  cursor: pointer;
  transition: all 0.3s ease;
  border: none; /* Remove default border */
}

/* Search Bar Styling */
.search-bar {
  width: 250px; /* Fixed width for search bar */
  border: 1px solid #ddd; /* Light border in light mode */
  background-color: #ffffff; /* White background */
  padding: 10px; /* Padding for the input */
  transition: all 0.3s ease;
}

/* Search Bar Focus Effect */
.search-bar:focus {
  border-color: #0070f3; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
}

/* Search Button Styling */
.search-btn {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
}

/* Search Button Hover Effect */
.search-btn:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px); /* Lift effect on hover */
}

/* Mode Toggle Button Styling */
.mode-toggle-btn {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
}

/* Mode Toggle Button Hover Effect */
.mode-toggle-btn:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px);
}

/* Create Bookmark Button Styling */
.create-bookmark-btn {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: white;
}

/* Create Bookmark Button Hover Effect */
.create-bookmark-btn:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px);
}

/* Dark Mode Specific Styles */
header.dark .search-bar {
  background-color: #555; /* Darker input background */
  color: white; /* White text for input */
  border: 1px solid #777; /* Darker border */
}

header.dark .search-bar:focus {
  border-color: #0288d1; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 122, 255, 0.5);
}

header.dark .search-btn,
header.dark .mode-toggle-btn,
header.dark .create-bookmark-btn {
  background: linear-gradient(135deg, #37474f 0%, #455a64 100%); /* Darker button gradient */
}

/* Dark Mode Button Hover Effects */
header.dark .search-btn:hover,
header.dark .mode-toggle-btn:hover,
header.dark .create-bookmark-btn:hover {
  background: linear-gradient(135deg, #0288d1 0%, #0277bd 100%);
}

/* Responsive Styles */
@media (max-width: 600px) {
  .search-bar {
    width: 100%; /* Make search bar full width on mobile */
  }

  header {
    flex-direction: column; /* Stack items vertically on mobile */
    align-items: flex-start; /* Align to start */
  }

  .controls {
    flex-direction: column; /* Stack controls vertically */
    gap: 10px; /* Reduce gap for smaller screens */
  }
}
</style>

