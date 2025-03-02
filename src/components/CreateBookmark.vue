<template>
  <div :class="mode">
    <div class="bookmark-form-container">
      <div class="bookmark-form">
        <h2 class="form-heading">Add Bookmark</h2>
        
        
        <div v-if="step === 1" class="form-group">
          <label for="title"> Title</label>
          <input 
            v-model="bookmark.title" 
            type="text" 
            id="title" 
            placeholder="Enter bookmark title" 
            required 
          />
          <button @click="nextStep" class="next-button">Next</button>
          <button @click="cancel">Cancel</button>
        </div>

        
        <div v-if="step === 2" class="form-group">
          <label for="url"> URL</label>
          <input 
            v-model="bookmark.url" 
            type="url" 
            id="url" 
            placeholder="Enter bookmark URL" 
            required 
          />
          <button @click="nextStep" class="next-button">Next</button>
        </div>

        
        <div v-if="step === 3" class="form-group">
          <label for="tags">Tags (optional)</label>
          <input 
            v-model="bookmark.tags" 
            type="text" 
            id="tags" 
            placeholder="Enter tags (comma separated)" 
          />
          <button @click="nextStep" class="next-button">Next</button>
        </div>

        
        <div v-if="step === 4" class="form-group">
          <label for="category">Category</label>
          <select v-model="bookmark.category" id="category" required>
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Travel">Travel</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
          <button @click="finishBookmark" class="finish-button">Finish</button>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1, 
      bookmark: {
        title: '',
        url: '',
        tags: '',
        category: '',
      },
      mode: localStorage.getItem("mode") || "light", 
    };
  },
  methods: {
    nextStep() {
      if (this.step < 4) {
        this.step += 1;
      }
    },

    
    finishBookmark() {
      this.$emit('add-bookmark', this.bookmark);
      this.clearForm();
    },

    
    clearForm() {
      this.bookmark = { title: '', url: '', tags: '', category: '' };
      this.step = 1; 
    },
    cancel() {
      this.$emit('cancel');
    },
    toggleMode() {
      this.mode = this.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", this.mode); 
    },
  }
};
</script>

<style scoped>
/* Container for the form */
.bookmark-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
  padding: 20px;
}

.bookmark-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: 'Arial', sans-serif;
}

/* Form heading */
.form-heading {
  text-align: left; /* Align title to the left */
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}

/* Styling the form inputs */
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

input, select {
  width: 100%;
  padding: 8px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  outline: none;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #0070f3;
  background-color: #ffffff;
}

input::placeholder {
  color: #aaa;
}

/* Button styling */
button {
  padding: 8px 18px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-button {
  background-color: #0070f3;
  color: #fff;
  padding: 6px 12px;
  width: auto;
  margin-left: auto; /* Pushes button to the right */
  align-self: flex-end; /* Ensures button stays on the right */
}

.next-button:hover {
  background-color: #0056c1;
}

.finish-button {
  background-color: #28a745;
  color: #fff;
}

.finish-button:hover {
  background-color: #218838;
}

/* Global styles for light mode */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

main {
  padding: 0;
  margin: 0;
}

header, footer {
  margin: 0;
  padding: 5px 0;
  text-align: center;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  flex-grow: 1;
  padding: 15px;
}

footer {
  padding: 5px 0;
  background-color: #f1f1f1;
}

/* Light Mode */
.app-container.light {
  background-color: #f4f4f4;
  color: #333;
}

/* Dark Mode */
.app-container.dark {
  background-color: #121212;
  color: #f5f5f5;
}

.app-container.dark .bookmark-form {
  background: #333;
  color: #fff;
}

.app-container.dark .form-heading {
  color: #f5f5f5;
}

.app-container.dark .form-group input,
.app-container.dark .form-group select {
  background-color: #555;
  color: #fff;
}

.app-container.dark button {
  background-color: #0070f3;
  color: #fff;
}

.app-container.dark button:hover {
  background-color: #0056c1;
}

</style>