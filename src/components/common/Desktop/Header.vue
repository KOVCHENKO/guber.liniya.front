<template>
    <div class="heading-page">
        <h2 class="caption-text-center">{{headings.title}}</h2>
        <div class="divider"></div>
    </div>
</template>
<script lang="ts">

    import {Component, Vue, Provide} from 'vue-property-decorator';
    import {headings} from '@/domain/util/interface/CommonInterface';

    @Component
    export default class Header extends Vue {

        @Provide()
        public headings = headings;

        constructor() {
            super();
            headings.title = 'Рабочий стол';
            headings.subtitle = '';
        }

    }

</script>