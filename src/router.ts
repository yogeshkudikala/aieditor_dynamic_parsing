import { createRouter, createWebHistory } from 'vue-router';
import AiEditor from './views/AiEditor.vue';
import EditorJs from './views/EditorJs.vue';

const routes = [
  { path: '/', component: AiEditor },
  { path: '/editorjs', component: EditorJs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;