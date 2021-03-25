<template>
  <div class="manage-page">
    groups
  </div>
</template>

<script>

export default {

  data() {
    return {

    };
  },

  computed: {
    /**
     * Workspace id from route
     * @returns {string}
     */
    workspaceId() {
      return this.$route.params.workspaceId;
    },

  },

  async mounted() {
    const groups = await this.$API.group.getGroups(this.workspaceId);

    console.log(groups);
  },

  methods: {

  },
};
</script>

<style lang="stylus" scoped>

</style>
