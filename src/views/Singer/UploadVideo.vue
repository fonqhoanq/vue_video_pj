<template>
  <div>
    <studio-nav-bar/>
    <upload-modal/>
  </div>
</template>
<script>
  import StudioNavBar from '@/components/StudioNavBar.vue'
  import UploadModal from '@/components/UploadVideoModal.vue'

  export default {
    name: 'UploadVideo',
    components: {
      StudioNavBar, UploadModal
    },
  }
</script>