<template>
    <div class="datatable">
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li @click="changePage(1)" v-if="currentChosenPage !== 1">
                    <a>1</a>
                </li>
                <li v-if="currentChosenPage !== 1">
                    <a>...</a>
                </li>
                <li v-for="currentPage in this.pagination.slicedPagesNumber" @click="changePage(currentPage)">
                    <a :class="{ active: currentChosenPage === currentPage }">{{ currentPage }}</a>
                </li>
                <li v-if="currentChosenPage !== pagination.lastPage">
                    <a>...</a>
                </li>
                <li v-if="currentChosenPage !== pagination.lastPage" @click="changePage(pagination.lastPage)">
                    <a> {{ pagination.lastPage }} </a>
                </li>
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