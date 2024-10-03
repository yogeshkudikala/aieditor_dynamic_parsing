<template>
  <div>
    <input v-model="director" type="text" />
    <input v-model="company" type="text" />
    <button @click="parse">Parse</button>
    <div ref="divRef" style="height: 600px" />
  </div>
</template>

<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref } from "vue";

const divRef = ref();
const director = ref("yogeshkudikala");
const company = ref("madrechasolutions");
let aiEditor: AiEditor | null = null;

const parse = () => {
  try {
    const content = aiEditor?.getHtml();
    console.log({ content });

    // Create a temporary DOM element to parse the HTML content
    const tempDiv = document.createElement('div');
    if (content) {
      tempDiv.innerHTML = content;
    }

    // Find all span elements with the class 'mention'
    const mentions = tempDiv.querySelectorAll('span.mention');

    mentions.forEach((mention) => {
      const dataId = mention.getAttribute('data-id');
      if (dataId === 'Director') {
        mention.textContent = director.value;
        // Remove the data-type attribute
        mention.removeAttribute('data-type');
      } else if (dataId === 'Company') {
        mention.textContent = company.value;
        // Remove the data-type attribute
        mention.removeAttribute('data-type');
      }
    });

    // Serialize the updated DOM structure back to HTML
    const result = tempDiv.innerHTML;
    
    // Update the editor content
    aiEditor?.setContent(result);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "Click to Input Content...",
    content: 'AiEditor is an Open Source Rich Text Editor Designed for AI.  ',
    onMentionQuery: (query: string) => {
      return [
        'Director',
        'Company'
      ]
        .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5)
    },

  })
});

onUnmounted(() => {
  aiEditor?.destroy();
});
</script>