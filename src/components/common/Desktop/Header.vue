<template>
    <div>
		<header class="main-header">
            <div class="header-container">
                <div class="header-content">
                    <div class="header-el">
                        <div class="topline"></div>
                        <nav>
                            <p class="title">
                                <b>У</b>МНЫЙ<br><b>Г</b>РАЖДАНИН
                            </p>
                        </nav>
                        <div class="bottomline"></div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Header extends Vue {

    }

</script>