<template>
    <header class="row">
        <div class="left-side col s4 m4">
            <div class="search-bar row margin-bottom-0">
                <input class="search col s10 m4 right" type="text" placeholder="Recherche" />
                <i class="ico fas fa-search right"></i>
            </div>
            <div class="button-menu row margin-bottom-0">

                <router-link to="/" tag="button" class="tb-btn btn-red col s12 m5 right" >Nouveau Book</router-link>
                <router-link to="" tag="button" class="tb-btn btn-red col s12 m5 right" >Connexion</router-link>
            </div>
          </div>
        <div class="wrapper-logo col s4 m4 offset-m4">
            <router-link to="Home">
                <img src="../assets/img/logo.png" class="logo" alt="TravelBook"/>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {

}
</script>
