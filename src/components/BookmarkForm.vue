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
          <button @click="cancel">Cancel</button>
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
          <button @click="cancel">Cancel</button>
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
          <button @click="cancel">Cancel</button>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    editingBookmark: Object, // Receive editing bookmark data
  },
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
  computed: {
    isEditing() {
      return !!this.editingBookmark; // Check if we are editing
    },
  },
  watch: {
    // Watch for changes in editingBookmark and update fields accordingly
    editingBookmark: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // Pre-fill form fields with existing bookmark details
          this.bookmark = { ...newVal };
        } else {
          // Reset the form for a new bookmark
          this.clearForm();
        }
      }
    }
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
  min-height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  padding: 0 20px;
}

/* Main form styling */
.bookmark-form {
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 480px;
  font-family: 'Poppins', sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Scale effect on hover */
.bookmark-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

/* Form heading */
.form-heading {
  text-align: left;
  margin-bottom: 25px;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Styling the form inputs */
.form-group {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

/* Label Styles */
label {
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
}

/* Input and Select Styles */
input,
select {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  outline: none;
  background-color: #f9f9f9;
  color: #333;
  transition: all 0.3s ease;
  background-image: linear-gradient(white, white), linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  background-clip: padding-box, border-box;
  border-width: 1px;
}

/* Focus and hover effects */
input:focus,
select:focus {
  border-color: #0070f3;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 112, 243, 0.3);
}

input::placeholder {
  color: #bbb;
  font-style: italic;
}

/* Button styling */
button {
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Main button color (Next, Finish) */
.next-button,
.finish-button {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: #fff;
}

.next-button:hover,
.finish-button:hover {
  transform: translateY(-3px);
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
}

/* Cancel button styling */
.cancel-button {
  background-color: #f4f4f4;
  color: #333;
  margin-left: 15px;
  border: 1px solid #ddd;
}

.cancel-button:hover {
  background-color: #e1e1e1;
  transform: translateY(-3px);
}

/* Button Group (Next & Cancel) */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
}

.button-group button {
  flex: 1;
  margin: 0;
}

/* Responsive styles */
@media (max-width: 600px) {
  .bookmark-form {
    padding: 30px 20px;
  }

  .form-heading {
    font-size: 1.6rem;
  }

  button {
    font-size: 0.875rem;
  }
}


/* Light Mode */
.bookmark-form-container.light {
  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
  color: #333;
}

.bookmark-form-container.light .bookmark-form {
  background: #fff;
}

.bookmark-form-container.light .form-group input,
.bookmark-form-container.light .form-group select {
  background-color: #f9f9f9;
}

.bookmark-form-container.light button {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: #fff;
}

.bookmark-form-container.light button:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
}

/* Dark Mode */
.bookmark-form-container.dark {
  background-color: #333333;
  color: #f5f5f5;
}

.bookmark-form-container.dark .bookmark-form {
  background: #333;
  color: #fff;
}

.bookmark-form-container.dark .form-group input,
.bookmark-form-container.dark .form-group select {
  background-color: #444;
  color: #fff;
}

.bookmark-form-container.dark button {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: #fff;
}

.bookmark-form-container.dark button:hover {
  background: linear-gradient(135deg, #66dbd0 0%, #89c0de 100%);
}
</style>