<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="createProblemTypeModal" tabindex="-1" role="dialog"
             aria-labelledby="createProblemTypeModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="createProblemTypeModalLabel">Создать новую категорию</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>                        
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="problem_type_name" class="input-title">{{ $t("problem_type.problem_type_name") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="problem_type_name" type="text" :name="$t('validation.name')" :placeholder="$t('problem_type.problem_type_name')"
                                                                  v-model="problemTypeState.problemType.name"
                                                                  v-validate="'required|max:255'">
                            </div>
                            <span class="validation-error" v-show="errors.has($t('validation.name'))">
                                {{ errors.first($t('validation.name')) }}
                            </span>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="problem_type_description" class="input-title">{{ $t("problem_type.problem_type_description") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <textarea id="problem_type_description" :name="$t('validation.description')" :placeholder="$t('problem_type.problem_type_description')"
                                          v-model="problemTypeState.problemType.description"
                                          v-validate="'required'">
                                </textarea>
                            </div>
                            <span class="validation-error" v-show="errors.has($t('validation.description'))">{{ errors.first($t('validation.description')) }}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" :disabled="checkCreateButtonDisability([problemTypeState.problemType.description, problemTypeState.problemType.name])" @click="createProblemType">{{ $t("common.save") }}</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemTypeState from '../../../../store/functional/problemType/types';
    import { checkButtonDisability } from '@/domain/util/interface/ButtonDisability';

    @Component
    export default class CreateProblemType extends Vue {
        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @Action('createProblemType')
        public createProblemType;

        @Provide()
        protected checkCreateButtonDisability = checkButtonDisability;

    }
</script>
