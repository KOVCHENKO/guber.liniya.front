<template>
    <div class="datatable">
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <span v-for="(page, index) in this.pagination.pagesArray" :key="index">
                <li  @click="changePage(page)" :class="{ 'active-page': pagination.currentPage === page }"
                    class="pagination-box" v-if="page !== -1">
                    <a :class="{ active: pagination.currentPage === page }">{{ page }}</a>
                </li>
                <li v-else>
                    <a>...</a>
                </li>
                </span>
            </ul>
        </nav>

    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {State} from 'vuex-class';

    @Component
    export default class DatatableCustomPaginator extends Vue {
        @Provide()
        public tableOptions = {
            page: 1,
            perPage: 30,
        };

        @State('pagination')
        public pagination;

        @Provide()
        public currentChosenPage = 1;

        @Provide()
        public paginationButtonStyle = {
            'background': 'blue',
            'font-size': '13pt',
        };

        public changePage(currentPage) {
            // Для отображения кнопки "первой" страницы пагинации
            this.currentChosenPage = currentPage;

            // Указатель страницы перхода
            this.pagination.currentPage = currentPage;

            this.$emit('setAnotherPage');
        }

    }
</script>
