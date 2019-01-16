<template>
    <div class="address">

        <!-- Город -->
        <div class="row">
            <div class="col-sm-5 clearfix">
                <label for="claim_city">Город</label>
                <input :name="$t('validation.address')" id="claim_city" v-model="search.city"
                              @keydown="changeCity" @click="showCitiesList" autocomplete="off"/>

                <vue-scrollbar class="menu-scrollbar dropdown-menu dropdown-menu-right" ref="scrollbar"
                               v-show="visibility.cityList">
                    <ul>
                        <li v-for="(city, i) in filteredCities" :key="i">
                            <a @click="setCity(city)"> {{ city.SHORTNAME}}. {{ city.FORMALNAME }} </a>
                        </li>
                    </ul>
                </vue-scrollbar>
            </div>
            <span class="validation-error" v-if="addressValidation['city'] !== undefined">{{ addressValidation['city'][0] }}</span>

            <!-- Улица -->
            <div class="col-sm-5 clearfix">
                <label for="claim_city">Улица</label>
                <input :name="$t('validation.address')" id="claim_street" v-model="search.street" ref="street"
                              @keydown="changeStreet" @click="showStreetsList" autocomplete="off"/>

                <vue-scrollbar class="menu-scrollbar dropdown-menu dropdown-menu-right" ref="scrollbar"
                               v-show="visibility.streetList">
                    <ul>
                        <li v-for="(street, i) in filteredStreets" :key="i"><a @click="setStreet(street)"> {{
                            street.FORMALNAME }} </a></li>
                    </ul>
                </vue-scrollbar>
            </div>
            <span class="validation-error" v-if="addressValidation['street'] !== undefined">{{ addressValidation['street'][0] }}</span>

            <!-- Дом -->
            <div class="col-sm-2 clearfix">
                <label for="claim_house">Дом</label>
                <input :name="$t('validation.address')" id="claim_house" v-model="search.building"
                              @keydown="changeBuilding" autocomplete="off"/>

                <vue-scrollbar class="menu-scrollbar dropdown-menu dropdown-menu-right" ref="scrollbar"
                               v-show="visibility.buildingList">
                    <ul>
                        <li v-for="(building, i) in filteredBuildings" :key="i"><a @click="setBuilding(building)"> {{
                            building.FORMALNAME }} </a></li>
                    </ul>
                </vue-scrollbar>
            </div>
            <span class="validation-error" v-if="addressValidation['building'] !== undefined">{{ addressValidation['building'][0] }}</span>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
import {fiasUrl} from '@/globals';
import ScrollBar from 'vue2-scrollbar'

export default {
    name: 'AddressPartial',

    components: {
        VueScrollbar: ScrollBar
    },

    props: ['value', 'validation'],

    data() {

        return {
            //Списки всех городов, улиц и домов. Загружаются с FIAS по API
            cities: [],
            streets: [],
            buildings: [],

            //Видимость выпадающих списков
            visibility: {cityList: false, streetList: false, buildingList: false,},

            //Выбранные текущие данные (объект)
            current: {city: {}, street: {}, building: {}, shortcadnum: ''},

            //Строка поиска по спискам городов, улиц, домов, короткий кадастровый номер
            search: {city: '', street: '', building: '', shortcadnum: ''}
        }
    },

    // watch: {
    //     'current.city': function (city) {
    //         this.value.city = city.SHORTNAME + '. ' + city.FORMALNAME;
    //         this.search.city = city.SHORTNAME + '. ' + city.FORMALNAME;
    //         this.visibility.cityList = false;
    //     },
    //     'current.street': function (street) {
    //         this.value.street = street.FORMALNAME;
    //         this.search.street = street.FORMALNAME;
    //         this.visibility.streetList = false;
    //     },
    //     'current.building': function (building) {
    //         this.value.building = building.FORMALNAME;
    //         this.search.building = building.FORMALNAME;
    //         this.visibility.buildingList = false;
    //     },
    //     'value': function (value) {
    //         this.search = value;
    //     },
    // },

    computed: {
        /* Проверка ввода адресной информации */
        addressValidation() {
            if (this.validation['address'] === undefined) return {};
            return this.validation['address'];
        },

        /* Отфильтрованный список городов */
        filteredCities() {
            let search = this.search.city === undefined ? '' : this.search.city;
            return this.cities.filter(item => {
                let city = item.SHORTNAME + '. ' + item.FORMALNAME;
                if (city.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item;
            });
        },

        /* Отфильтрованный список улиц */
        filteredStreets() {
            let search = this.search.street === undefined ? '' : this.search.street;
            return this.streets.filter(item => {
                let street = item.FORMALNAME;
                if (street.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item;
            });
        },

        /* Отфильтрованный список домов */
        filteredBuildings() {
            let search = this.search.building === undefined ? '' : this.search.building;
            return this.buildings.filter(item => {
                let building = item.FORMALNAME;
                if (building.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item;
            });
        },
    },

    methods: {

        /* Получить список городов */
        getCitiesList() {
            axios.get(fiasUrl + 'choose_cities').then(response => {
                this.cities = response.data;
            });
        },

        /* Отобразить выпадающий список с городами */
        showCitiesList() {
            this.visibility.cityList = true;
            this.visibility.streetList = false;
            this.visibility.buildingList = false;
        },

        /* Событие: начали ввод символов в поле для выбора города */
        changeCity() {
            this.showCitiesList();
            this.current.street = {};
            this.current.building = {};
        },

        /* Выбрали новый город */
        setCity(city) {
            this.search.city = city.SHORTNAME + '. ' + city.FORMALNAME;
            this.visibility.cityList = false;
            this.current.city = city;

            this.getStreetsList();
        },

        /* Получить список улиц */
        getStreetsList() {
            axios.get(fiasUrl + 'choose_street/' + this.current.city.AOGUID).then(response => {
                this.streets = response.data;
                this.showStreetsList();
            });
        },

        /* Отобразить выпадающий список с улицами */
        showStreetsList() {
            this.visibility.cityList = false;
            this.visibility.streetList = true;
            this.visibility.buildingList = false;
            this.$refs.street.focus();
        },

        /* Событие: начали ввод символов в поле для выбора улицы */
        changeStreet() {
            this.showStreetsList();
            this.current.building = {};
        },

        /* Выбрали новую улицу */
        setStreet(street) {
            this.search.street = street.FORMALNAME;
            this.current.street = street;
            this.getBuildingsList();
        },

        /* Получить список домов */
        getBuildingsList() {
            axios.get(fiasUrl + 'choose_building/' + this.current.street.AOGUID).then(response => {
                this.buildings = response.data;
                this.showBuildingsList();
            });
        },

        /* Отобразить выпадающий список с домами */
        showBuildingsList() {
            this.visibility.cityList = false;
            this.visibility.streetList = false;
            this.visibility.buildingList = true;
            this.$refs.building.focus();
        },

        /* Событие: начали ввод символов в поле для выбора дома */
        changeBuilding() {
            this.showBuildingsList();
        },

        /* Выбрали новый дом */
        setBuilding(building) {
            this.current.building = building;
            this.search.building = building.FORMALNAME;
            this.visibility.buildingList = false;

        },

    },

    created() {
        let a = this.value;
        this.getCitiesList();
    }

}
</script>