<template>
  <div class="bookmark-list" :class="mode">
    <div 
      :class="mode"
      v-for="bookmark in bookmarks" 
      :key="bookmark.id" 
      class="bookmark-card"
      @click="selectBookmark(bookmark)"
    >
      <p>{{ bookmark.url }} <button @click.stop="selectBookmark(bookmark)">Show Details</button></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookmarks'],
  methods: {
    selectBookmark(bookmark) {
      this.$emit('select-bookmark', bookmark);
    }
  }
};
</script>

<style scoped>
/* Container for the bookmark list */
.bookmark-list {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1500px; /* Set a max-width for better layout */
  margin: auto; /* Center the list within the container */
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%)
}

.bookmark-list.light {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
}

/* Dark Mode */
.bookmark-list.dark {
  background-color: #333333;
  color: #fff;
}

/* Individual bookmark card styling */
.bookmark-card {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  border: 1px solid #ddd;
  border-radius: 10px; /* Rounded corners for a softer look */
  margin: 10px 0;
  padding: 15px; /* Increased padding for better spacing */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animation for hover effects */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* URL Text Styling */
.bookmark-card p {
  word-wrap: break-word; /* Allow long words to break */
  overflow-wrap: break-word; /* Alternative for older browsers */
  white-space: normal; /* Enable text wrapping */
  margin: 0; /* Remove default paragraph margin */
}

/* Dark Mode - Bookmark List */
.bookmark-card.dark {
  background: black; /* Dark background */
  color: black;
  border: 1px solid #444; /* Slightly lighter border for contrast */
}

/* Light Mode - Bookmark Details */
.bookmark-card.light {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  color: #333;
}

/* Hover effect for bookmark cards */
.bookmark-card:hover {
  transform: translateY(-3px); /* Lift effect on hover */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

/* Button styling within bookmark cards */
button {
  padding: 8px 12px; /* Increased padding for buttons */
  font-size: 0.9rem; /* Slightly larger font for better readability */
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: #fff;
  border: none;
  border-radius: 5px; /* Rounded buttons */
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease; /* Smooth transition */
  margin-left: 10px; /* Keep margin for spacing */
}

/* Button hover effect */
button:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
  transform: translateY(-2px); /* Lift effect on hover */
}

/* Responsive styling */
@media (max-width: 600px) {
  .bookmark-list {
    padding: 10px; /* Reduced padding for smaller screens */
  }

  .bookmark-card {
    padding: 10px; /* Reduced padding for smaller screens */
  }

  button {
    font-size: 0.85rem; /* Slightly smaller font size for buttons */
    padding: 6px 10px; /* Reduced padding for smaller buttons */
  }
}
</style>
