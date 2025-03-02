import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import BookMarkForm from '@/components/BookmarkForm.vue'; // Assuming this is the view for creating bookmarks

const routes = [
  // Define your routes here
  {
    path: '/home',
    name: 'Home',
    component: App,
  },
  
  {
    path: '/bookmark-form',
    name: 'BookmarkForm',
    component: BookMarkForm,
    props: true
  },
  {
    path: '/edit-bookmark/:id',
    name: 'edit-bookmark',
    component: BookMarkForm, // Ensure the correct form component is used
    props: true
  },
  // Other routes can be defined here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
