<template>
    <div>
        <div>Статус обработки</div>
        <div>
            <span>Отред<input type="checkbox" v-model="edited"></span>
            <span>Отпр<input type="checkbox" v-model="dispatched"></span>
            <span>Созд<input type="checkbox" v-model="created"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProcessStatusSelector",
        data: function () {
            return {
                edited: false,
                dispatched: false,
                created: false,
            }
        },

    }
</script>