<template>
  <div>
    <nav-bar/>
    <upload-modal/>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar.vue'
  import UploadModal from '@/components/UploadVideoModal.vue'

  export default {
    name: 'UploadVideo',
    components: {
        NavBar, UploadModal
    },
  }
</script>