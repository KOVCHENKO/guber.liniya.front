<!--suppress TypeScriptCheckImport, XmlUnboundNsPrefix -->
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
            <tree @node:selected="onNodeSelected" :data="getProblemTypes()" :filter="treeFilter" ref="tree">
                <div slot-scope="{ node }" class="node-container row">
                    <div class="node-text" style="padding: 10px 0;"> <!--class="col-9" -->
                        <span class="icon" style="float: left; position: relative;">
                            <img :src="node.data.icon" style=" height: 48px; width: 48px;  " /></span>
                        <div class="content" style="margin-top: 0px; margin-left: 60px;">
                            <h4>{{ node.text }}</h4>
                        </div>
                    </div>
                    <div class="node-controls col-3">
                        <div v-if="node.data.type === 'problemType'" class="row"><a href="javascript:void(0)" @mouseup.stop="addProblem(node)"><icon name="add" style="color: #333;"></icon></a></div>
                        <div class="row"><a href="javascript:void(0)" @mouseup.stop="editNode(node)"><icon name="edit" style="color: #333;"></icon></a></div>
                        <div class="row"><a href="javascript:void(0)" @mouseup.stop="removeProblemType(node)"><icon name="remove" style="color: #333;"></icon></a></div>
                    </div>
                </div>
            </tree>
        </div>

        <create-problem-type v-on:onProblemTypeCreate="addProblemType"></create-problem-type>
        <create-problem v-on:onProblemCreate="addProblemResolved"></create-problem>
    </div>
</template>

<script lang="ts">
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import CabinetState from '../../../store/common/cabinet/types';
    import CreateProblemType from '@/components/functional/problems/AllProblemTypes/CreateProblemType.vue';
    import CreateProblem from '@/components/functional/problems/SingleProblemType/CreateProblem.vue';
    import Tree from 'liquor-tree';
    import Icon from 'vue-awesome';
    import { registerAllIcons } from '../../../domain/util/interface/Icons';
    import ProblemTypeService from '../../../domain/services/functional/ProblemTypeService';

    registerAllIcons();

    @Component({
        components: {CreateProblemType, Tree, Icon, CreateProblem},
    })
    export default class ProblemTypes extends Vue {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @State('cabinet')
        public cabinetState!: CabinetState;

        @Action('getAllProblemTypes')
        public getProblemTypes;

        @Provide()
        public treeFilter = '';

        constructor() {
            super();

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


        public onNodeSelected(problemType) {
            // console.log(node.text);
        }

        public editNode(problemType) {
            // edit problemType
        }

        public addProblem(problemType) {
            this.problemTypeState.problemType.id = problemType.id;
            $('#createProblemModal').modal('show');
        }

        public removeProblemType(problemType) {
            // remove problem type
        }

        public addProblemType() {
            ProblemTypeService.addProblemTypeToTree(
                this.$refs,
                this.problemTypeState.problemType.name,
                '/images/test_problem/008-light-bulb.png',
            );
        }

        public addProblemResolved() {
            // emit and add problem to problem type
        }


    }
</script>