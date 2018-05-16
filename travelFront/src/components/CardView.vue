<template>
    <!-- Card -->
    <div class="row">
        <div class="tb-cardView col s10 offset-s1 m10 offset-m1">
            <div :style="{ 'backgroundImage': 'url(' + card.cover_picture + ')' }" class="card-img col m12 s12"></div>

            <div class="card-desc row">
                <div class="header col s12 m12 center-align">
                    <h3 class="title">{{card.title}}</h3>
                </div>
                <div class="card-info col s12 m12">
                    <div class="col s12 m6">
                        <img :src="imgCatPath" class="cat-ico m3" alt=""/>
                        <div class="localisation bold italic m9">{{card.adress}}</div>
                        <div class="category bold m9">{{card.category}}</div>
                    </div>
                    <div class="col s12 m6 right-align">
                        <div class="localisation bold italic">Auteur : {{card.author}}</div>
                    </div>
                </div>
                <div class="summary col s12 m12">
                    {{ card.para1 }}
                </div>
            </div>
        </div>
    </div>
  <!-- End card -->
</template>

<script>
import { HTTP } from "./../http/http-base";
import { EventBusModal } from "../events/event-modals";

import ImgCatHotel from './../assets/img/Hotel.svg';
import ImgCatMonument from './../assets/img/Monument.svg';

export default {
    data() {
        return {
            card: '',
            imgCatPath: '',
        }
    },
    created() {
        console.log(this.card)
        EventBusModal.$emit("loading-loader", true);
        HTTP.get(`card/`+ this.$route.params.id ).then(response => {
            this.card = response.data;
            this.getCategoryImg();
            EventBusModal.$emit("loading-loader", false);
        });
    },
    methods:{
        getCategoryImg() {
            console.log("debug: Get category img");
            switch(this.card.category) {
                case 'Restaurant':
                    console.log("debug: Restaurant");
                    this.imgCatPath = "";
                    break;
                case 'Hotel':
                    console.log("debug: Hotel");
                    this.imgCatPath = ImgCatHotel;
                    break;
                case 'Monument':
                    console.log("debug: Monument");
                    this.imgCatPath = ImgCatMonument;
                    break;
                default:
                    console.log("debug: Autre > "+this.card.category);
                    break;
            }
        },
        fetchItems() {}
    },
}
</script>

