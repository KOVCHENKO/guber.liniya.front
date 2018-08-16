<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="createProblemModal" tabindex="-1" role="dialog"
             aria-labelledby="createProblemModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="createProblemModalLabel">{{ $t("problem.create_modal_name") }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="problem_type_name" class="input-title">{{ $t("problem.problem_name") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="problem_type_name" type="text" :name="$t('validation.name')" :placeholder="$t('problem.problem_name')"
                                                                  v-model="problemState.problem.name"
                                                                  v-validate="'required|max:255'">
                            </div>
                            <span class="validation-error" v-show="errors.has($t('validation.name'))">
                                {{ errors.first($t('validation.name')) }}
                            </span>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="problem_type_description" class="input-title">{{ $t("problem.problem_description") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <textarea id="problem_type_description" :name="$t('validation.description')" :placeholder="$t('problem_type.problem_type_description')"
                                          v-model="problemState.problem.description"
                                          v-validate="'required'">
                                </textarea>
                            </div>
                            <span class="validation-error" v-show="errors.has($t('validation.description'))">{{ errors.first($t('validation.description')) }}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" :disabled="checkCreateButtonDisability([problemState.problem.description, problemState.problem.name])" @click="createProblem">{{ $t("common.save") }}</button>
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
    import ProblemState from '../../../../store/functional/problem/types';
    import {checkButtonDisability} from '../../../../domain/util/interface/ButtonDisability';

    @Component
    export default class CreateProblem extends Vue {
        @State('problem')
        public problemState!: ProblemState;

        @Action('createProblem')
        public createProblem;

        @Provide()
        protected checkCreateButtonDisability = checkButtonDisability;
    }
</script>
