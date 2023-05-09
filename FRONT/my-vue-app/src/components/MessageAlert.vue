<template>
    <div v-if="visible" class="alert alert-danger">
        {{ message }}
    </div>
</template>
  
<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            visible: true,
        };
    },
    methods: {
        close() {
            this.visible = false;
        },
    },
};
</script>
  
<style>
.alert {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
</style>
  