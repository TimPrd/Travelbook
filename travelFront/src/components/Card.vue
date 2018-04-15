<template>
  <!-- Card -->
  <div class="tb-card">
    <img src="#" class="card-img col m5 s5" alt="card image"/>
    <div class="card-desc col m7 s7 row">
      <div class="header m12">
        <h3 class="title m12">{{card.title}}</h3>
        <img src="#" class="cat-ico m3" alt=""/>
        <div class="localisation bold italic m9">Localisation</div>
        <div class="category bold m9">Catégorie</div>
        <div class="score">
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="far fa-star star"></i><!-- Empty star -->
        </div>
      </div>
      <div class="summary m12">
        Tem et magnima perumque si con
        nis erem velitatur, omnissequi rem
        solorestrum volorec atemque nim
        rem velitatur, omnissequi rem solorestrum
        volorec restrum volorec atemque nim
        rem velitatur,omnissequi rem solorestrum
        volorec
      </div>
      <div class="btn-bar m12">
        <button class="btn-white m4">Lire la suite</button>
        <button class="btn-white m1">+</button>
      </div>
    </div>
  </div>
  <!-- End card -->
</template>

<script>
  export default {
    props: {
      card: {
        type: Object,
      }
    },

    mounted: function () {
      console.log(this.card)
    }
  }
</script>
