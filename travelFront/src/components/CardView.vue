<template>
    <!-- Card -->
    <section class="row">
        <h2 class="center-align specialTitle">Fiche</h2>
        <div class="section-deco center-align">v</div>
        <div class="deco-line col m12"></div>

        <div class="btn-wrapper margin-bottom-30 row">
            <button @click="addInCart(card)" class="tb-btn tb-big-btn btn-red col m4 s12 offset-m8 pull-m4"><i class="fas fa-plus"></i> Ajouter au book</button>
            <button @click="removeInCart(card)" class="tb-btn tb-big-btn btn-red col m4 s12 offset-m8 pull-m4"><i class="fas fa-minus"></i> Retirer du book</button>
        </div>

        <div class="tb-cardView col s10 offset-s1 m10 offset-m1">
            <div :style="{ 'backgroundImage': 'url(' + card.cover_picture + ')' }" class="card-img col m12 s12"></div>

            <div class="card-desc row">
                <div class="header col s12 m12 center-align">
                    <h3>{{card.title}}</h3>
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
                <div class="content col s12 m12">
                    <div class="right-col col s12 m6 row">
                        <div :style="{ 'backgroundImage': 'url(' + card.picture1 + ')' }" class="para-img col s12 m12 margin-bottom-10"></div>
                        <div class="para col s12 m12">{{ card.para1 }}</div>
                    </div>
                    <div class="left-col col s12 m6 row">
                        <div class="para col s12 m12 margin-bottom-10">{{ card.para2 }}</div>
                        <div :style="{ 'backgroundImage': 'url(' + card.picture2 + ')' }" class="para-img col s12 m12"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End card -->
</template>

<script>
    import Vue from "vue";
    import { HTTP } from "./../http/http-base";
    import { EventBusModal } from "../events/event-modals";
    import VueSweetalert2 from 'vue-sweetalert2';

    import ImgCatHotel from './../assets/img/Hotel.svg';
    import ImgCatMonument from './../assets/img/Monument.svg';
    import ImgCatRestau from './../assets/img/Restau.svg';
    import ImgCatLieu from './../assets/img/Lieu.svg';

    Vue.use(VueSweetalert2);

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
        computed: {
            usr: function() {
                // `this` pointe sur l'instance vm
                return this.$store.state.usr
            }
        },
        methods:{
            getCategoryImg() {
                switch(this.card.category) {
                    case 'Restaurant':
                        this.imgCatPath = ImgCatRestau;
                        break;
                    case 'Hotel':
                        this.imgCatPath = ImgCatHotel;
                        break;
                    case 'Monument':
                        this.imgCatPath = ImgCatMonument;
                        break;
                    default:
                        this.imgCatPath = ImgCatLieu;
                        break;
                }
            },
            addInCart(card) {
                if(typeof this.usr._id === 'undefined')
                    EventBusModal.$emit("change-state-login", true)
                else
                {
                    this.$store.commit("addCart", card);
                    Vue.swal({
                        type: 'info',
                        title: 'Fiche ajoutée !',
                        text: 'Vous avez ajouté : ' + card.title,
                    });
                }
            },
            removeInCart(card){
                this.$store.commit("removeCart", card);
                Vue.swal({
                    type: 'info',
                    title: 'Fiche retirée !',
                    text: 'Vous avez retirée : ' + card.title,
                });
            },
            fetchItems() {}
        },
    }
</script>

