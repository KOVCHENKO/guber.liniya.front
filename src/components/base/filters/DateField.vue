<template>
    <div class="cst-datepicker">
        <datepicker class="cst-div-datepicker" style="margin-right: 10px;" placeholder="C" :language="ru" v-model="dataFilterString.minDate" @closed="startSearch"></datepicker>
        <datepicker class="cst-div-datepicker" placeholder="По" :language="ru" v-model="dataFilterString.maxDate" @closed="startSearch"></datepicker>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue, Prop, Emit} from 'vue-property-decorator';
    import Datepicker from 'vuejs-datepicker';
    import {en, ru} from 'vuejs-datepicker/dist/locale';

    @Component({
        components: {Datepicker},
    })
    export default class DateField extends Vue {

        @Provide() public ru: any = ru;

        @Provide() public dataFilterString: any = {
            minDate: '',
            maxDate: '',
        };

        @Emit('search')
        public search(dataFilterString) {
            // emit searching
        }

        public startSearch() {
            this.search({ string: this.dataFilterString, field: 'date'});
        }

    }
</script>