    <template>
  <!-- Card -->
  <div class="tb-card">
    <img src="#" class="card-img col m5 s5" alt="card image"/>
    <div class="card-desc col m7 s7 row">
      <div class="header m12">

        <h3 class="title m12">{{card.title}}</h3>
        <img src="#" class="cat-ico m3" alt=""/>
        <div class="localisation bold italic m9">{{card.adress}}</div>
        <div class="category bold m9">Catégorie</div>
        <div class="score">
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="far fa-star star"></i><!-- Empty star -->
        </div>
      </div>
      <div class="summary m12">
        {{card.body}}
      </div>
      <div class="btn-bar m12">
        <button class="btn-white m4"><router-link :to="{ name: 'cardView', params: {id:card.id} }"  >Lire la suite</router-link>
</button>
        <button class="btn-white m1">+</button> <!-- trigger event : add -->
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
      return { card: '' }
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
      fetchItems() {

      }
    }

  }
</script>

