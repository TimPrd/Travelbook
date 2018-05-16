<template>
    <!-- Card -->
    <div class="row">
        <div class="tb-cardView col s10 offset-s1 m10 offset-m1">
            <div :style="{ 'backgroundImage': 'url(' + card.cover_picture + ')' }" class="card-img col m12 s12"></div>

            <div class="card-desc col m7 s7 row">
                <div class="header m12">
                    <h3 class="title m12 center-align">{{card.title}}</h3>
                </div>
                <div class="card-info">
                    <img src="#" class="cat-ico m3" alt=""/>
                    <div class="localisation bold italic m9">{{card.adress}}</div>
                    <div class="category bold m9">{{card.category}}</div>
                </div>
                <div class="summary m12">
                    {{card.body}}
                </div>
            </div>
        </div>
    </div>
  <!-- End card -->
</template>

<script>
import { HTTP } from "./../http/http-base";
import { EventBusModal } from "../events/event-modals";

export default {
    data() {
        return {
            card: ''
        }
    },
    created() {
        console.log(this.card)
        EventBusModal.$emit("loading-loader", true);
        HTTP.get(`card/`+ this.$route.params.id ).then(response => {
            this.card = response.data;
            EventBusModal.$emit("loading-loader", false);
        });
    },
    method:{
        fetchItems() {}
    }
}
</script>

