<template>
    <div>
        <div class="heading-page">
            <h2 class="caption-text-center">Проблемы</h2>
            <div class="divider"></div>
        </div>

        <div class="main-page">
            <div class="navigation-filter">
                <input type="text" v-model="treeFilter" placeholder="Поиск..." class="tree-search">
            </div>
            <tree @node:selected="onNodeSelected" :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree">
                <div slot-scope="{ node }" class="node-container row">
                    <div class="node-text" style="padding: 10px 0;"> <!--class="col-9" -->
                        <span class="icon" style="float: left; position: relative;"><img :src="node.data.icon" style=" height: 48px; width 48px;  " /></span>
                        <div class="content" style="margin-top: 0px; margin-left: 60px;">
                            <h4>{{ node.text }}</h4>
                        </div>
                    </div>
                    <div class="node-controls col-3">
                        <div class="row"><a href="#" @mouseup.stop="editNode(node)"><icon name="edit" style="color: #333;"></icon></a></div>
                        <div class="row"><a href="#" @mouseup.stop="removeNode(node)"><icon name="remove" style="color: #333;"></icon></a></div>
                    </div>
                </div>
            </tree>
        </div>

        <!-- <span v-for="problemType in problemTypeState.problemTypes" :key="problemType.id">
            <button class="cabinet-item"
                    @click="showProblemType(problemType)">
                    <img :src="'/images/cabinets/analytics.png'"/>
                    <label class="cabinet-title">{{ problemType.name }}</label>
            </button>
        </span> -->

        <create-problem-type></create-problem-type>
    </div>
</template>

<script lang="ts">
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import CabinetState from '../../../store/common/cabinet/types';
    import CreateProblemType from '@/components/functional/problems/AllProblemTypes/CreateProblemType.vue';
    import Tree from 'liquor-tree';
    import Icon from 'vue-awesome';

    // TODO: узнать у Ильи!
    Icon.register({
        edit: {
            width: 512,
            height: 512,
            d: 'M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z'
        },
        remove: {
            width: 448,
            height: 512,
            d: 'M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z'
        }
    });

    @Component({
        components: {CreateProblemType, Tree, Icon},
    })
    export default class ProblemTypes extends Vue {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @State('cabinet')
        public cabinetState!: CabinetState;

        @Action('getAllProblemTypes')
        public getProblemTypes;

        @Provide()
        public treeOptions = {
            fetchData: (node) => {
                return Promise.resolve();
            },
            checkbox: false
        };

        @Provide()
        public treeFilter = '';

        constructor() {
            super();
            this.getProblemTypes();

            plusButton.title = 'Проблемы';
            plusButton.disabled = false;
            plusButton.clickAction = this.createProblemType;
            headings.title = 'Все типы проблем';
            headings.subtitle = 'Выберите проблему';
        }

        public showProblemType(problem) {
            this.$router.push({ name: 'single_problem', params: { id: problem.id }});
        }

        public createProblemType() {
            $('#createProblemTypeModal').modal('show');
        }

        get treeData() {
            let tree: { 'id': number; 'text': string; 'isBatch': boolean; 'data': { 'icon': string; }; children:{'id': number; 'text': string;}[] }[] = [];

            // TODO: узнать у Ильи!
            for (let problemType of this.problemTypeState.problemTypes) {
                    let childProblem: {'id': number; 'text': string;}[] = [];
                    for (let child of problemType.problems) {
                        childProblem.push({
                            'id' : child.id,
                            'text' : child.name
                        }); 
                    }
                    tree.push({
                        'id' : problemType.id,
                        'text' : problemType.name,
                        'isBatch' : true,
                        'data': {'icon' : problemType.description},
                        'children': childProblem
                    });
            }
    
            return new Promise(resolve => resolve(tree));
        }

        public onNodeSelected(node) {
        	console.log(node.text);
        }

    }
</script>