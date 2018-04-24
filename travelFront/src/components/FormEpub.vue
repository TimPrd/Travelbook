<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
<style>
  fieldset {
    border: 1px solid #ccc;
    min-height: 220px;
    padding: 5px;
    padding-bottom: 50px;
  }
  .bio-modal{padding:15px;}

  .dual-list .list-group {
    margin-top: 8px;
  }
  .dual-list{
    margin-top: 62px;
  }
  .image-preview-input {
    position: relative;
    overflow: hidden;
    margin: 0px;
    padding: 20px;
    color: #333;
    background-color: #fff;
  }
  .image-preview-input input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .image-preview-input img{
    padding: 0px;
  }
</style>

<template>
  <div id="page-top">
    <div v-if="loggedIn" >CONNECTE </div>
    <tb-popup-login v-show="showLoginPopup"></tb-popup-login>
    <!-- Header -->
    <tb-header></tb-header>
    <!-- End Header -->
    <!-- Content -->
    <section class="container center-align">
      <div class="filter-bar row">
        <button @click="generateEbook()" class="tb-btn btn-red search-btn btn-red col m4 s12 offset-m8 pull-m4">Générer Book</button>
      </div>

      <div v-show="searched" class="tb-cards row">
        <div v-if="list.length === 0" class="center">
          <p>Nothing to show :(</p>
        </div>
        <div v-else class="tb-cards row">
          <tb-card v-for="card in list" :card="card" />
        </div>
      </div>

      <div class="container-fluid">

        <p>Formulaire de l'epub :</p>
        <div class="row">
          <!-- List of page-->
          <div class="dual-list list-left col-md-2 col-sm-2 col-xs-12">
            <div class="well text-right">
              <div class="row">
                <div class="col-md-2">
                  <div class="btn-group">
                    <a class="btn btn-default selector" title="select all"><i class="glyphicon glyphicon-unchecked"></i></a>
                  </div>
                </div>
              </div>
              <ul class="list-group">
                <a href="#"><li class="list-group-item">Page 1</li></a>
                <a href="#"><li class="list-group-item">Page 2</li></a>
                <a href="#"><li class="list-group-item">Page 3</li></a>
                <a href="#"><li class="list-group-item">Page 4</li></a>
                <a href="#"><li class="list-group-item">Page 5</li></a>
              </ul>
            </div>
          </div>

          <div class="col-md-8 col-sm-8 col-xs-8">
            <h2>Page 1</h2>
            <form action="" class="form-horizontal">
              <fieldset>

                <!-- Text input-->
                <div class="form-group">
                  <div class="col-md-5">
                    <input id="title" name="title" type="text" placeholder="Title" class="form-control input-md" required="">

                  </div>
                </div>

                <!-- Prepended text-->
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="input-group">
                      <span class="input-group-addon">chapter</span>
                      <input id="chapter" name="chapter" class="form-control" placeholder="" type="text" required="">
                    </div>

                  </div>
                </div>

                <div class="btn btn-default image-preview-input col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <img src="http://placehold.it/150x150/" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview"/> <!-- rename it -->
                </div>
                <div class="btn btn-default image-preview-input col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <img src="http://placehold.it/150x150/" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview"/> <!-- rename it -->
                </div>
                <div class="btn btn-default image-preview-input col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <img src="http://placehold.it/150x150/" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview"/> <!-- rename it -->
                </div>

                <!-- Textarea -->
                <div class="form-group">
                  <div class="col-md-12">
                    <textarea class="form-control" id="text" name="text" rows="10" placeholder="description"></textarea>
                  </div>
                </div>

                <!-- Button -->
                <div class="form-group">
                  <div class="col-md-4">
                    <button id="validate" name="validate" class="btn btn-info">Save</button>
                  </div>
                </div>

              </fieldset>
            </form>
          </div>

          <div class="dual-list list-left col-md-2 col-sm-2 col-xs-12">
            <div class="well text-right">
              <div class="row">
                <div class="col-md-2">
                  <div class="btn-group">
                    <a class="btn btn-default selector" title="select all"><i class="glyphicon glyphicon-unchecked"></i> Choisir son thème</a>
                  </div>
                </div>
              </div>
              <ul class="list-group">
                <a href="https://github.com/bbilginn/bootstrap-duallist" target="_blank"><li class="list-group-item"><img src="http://placehold.it/150x150/" alt=""></li></a>
                <a href="https://github.com/bbilginn/bootstrap-duallist" target="_blank"><li class="list-group-item"><img src="http://placehold.it/150x150/" alt=""></li></a>
                <a href="https://github.com/bbilginn/bootstrap-duallist" target="_blank"><li class="list-group-item"><img src="http://placehold.it/150x150/" alt=""></li></a>
                <a href="https://github.com/bbilginn/bootstrap-duallist" target="_blank"><li class="list-group-item"><img src="http://placehold.it/150x150/" alt=""></li></a>
                <a href="https://github.com/bbilginn/bootstrap-duallist" target="_blank"><li class="list-group-item"><img src="http://placehold.it/150x150/" alt=""></li></a>
                <a href="https://github.com/bbilginn/bootstrap-duallist" target="_blank"><li class="list-group-item"><img src="http://placehold.it/150x150/" alt=""></li></a>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <!-- End section favorites -->
      <!-- Section map -->
      <div class="bookMap row">
        <h2 class="">Carte du book</h2>
        <div class="section-deco">v</div>
        <div class="deco-line m12"></div>
        <div class="wrapper-map col m12 s12">
          <tbMap/>
          <!-- <tbMap/> -->
        </div>
      </div>
      <!-- End section map -->


    </section>
    <!-- End Content -->
  </div>
</template>
<script src="/socket.io/socket.io.js"></script>
<script>
    const socket = io();

    // to get the value name to create an entity
    const text = document.getElementById('text');
    // to get the value name to create an entity
    const title = document.getElementById('title');
    // to get the value rating to create an entity
    const chapter = document.getElementById('chapter');
    // to listen to click event and send our request
    const validate = document.getElementById('validate');

    validate.addEventListener('click', () => { // listen to click event
        // send a post request with our input value
        event.preventDefault()
        fetch('/page', {
            method: 'post',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: `title=${title.value}&chapter=${chapter.value}&description=${text.value}`
        })
            .then((res) => {
                    if (res.status !== 200) return;
                    res.json().then((data) => console.log(data));
                }
            )
            .catch((err) => console.log('Fetch Error :-S', err));
    });

    $(".image-preview-input input:file").change(function (){
        var img = $(this).parent().find('img');
        var file = this.files[0];
        var reader = new FileReader();
        console.log(file);
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            console.log('onload');

            img.attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    });

    $(function () {

        $('body').on('click', '.list-group .list-group-item', function () {
            $(this).toggleClass('active');
        });
        $('.dual-list .selector').click(function () {
            var $checkBox = $(this);
            if (!$checkBox.hasClass('selected')) {
                $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
                $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
            } else {
                $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
                $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            }
        });

    });
</script>

<script>
    import { HTTP } from "./../http/http-base";
    import tbHeader from "./Header.vue";
    import tbCard from "./CardBook.vue";
    import tbMap from "./Map.vue";
    import tbPopupLogin from "./Popup/Login";
    import { EventBusModal } from "../events/event-modals";
    import auth from "./../auth/";
    import InfiniteLoading from "vue-infinite-loading";
    import tbLoader from "./Loader/Loader";

    export default {
        name: "Book",
        components: {
            tbHeader,
            tbCard,
            tbMap,
            tbPopupLogin,
            tbLoader,
            InfiniteLoading
        },
        data() {
            return {
                cards: [],
                showLoginPopup: false,
                published: false,
                loggedIn: auth.loggedIn(),
                category: "",
                country: "",
                list: []
            };
        },

        mounted() {
            //Listen for changement on login popup
            EventBusModal.$on("change-state-login", showModal => {
                this.showLoginPopup = showModal;
        });
        },
        created() {
            this.fetchItems();
            auth.onChange = loggedIn => {
                this.loggedIn = loggedIn;
            };
        },
        methods: {
            disconnect() {
                auth.logout();
            },
            generateEbook() {
                //todo : Tim
                //EventBusModal.$emit("loading-loader", true);
                /*.then(response => {
                  this.list = response.data;
                  EventBusModal.$emit("loading-loader", false), 4000
                });
                this.published = true;*/
            },
            hasDuplicates(array) {
                return new Set(array).size !== array.length;
            },
            checkDuplicateInObject(propertyName, inputArray) {
                var seenDuplicate = false,
                    testObject = {};

                inputArray.map(function(item) {
                    var itemPropertyName = item[propertyName];
                    if (itemPropertyName in testObject) {
                        testObject[itemPropertyName].duplicate = true;
                        item.duplicate = true;
                        seenDuplicate = true;
                    } else {
                        testObject[itemPropertyName] = item;
                        delete item.duplicate;
                    }
                });
                console.log(seenDuplicate);
                return seenDuplicate;
            },
            infiniteHandler($state) {
                let api = "/allcards";
                HTTP.get(api, {
                    params: {
                        country: this.country,
                        category: this.category
                    }
                }).then(({ data }) => {
                    console.log(data);
                if (data.length) {
                    if (this.checkDuplicateInObject("id", this.list)) {
                        $state.complete();
                    } else {
                        this.list = this.list.concat(data);
                        $state.loaded();
                    }
                } else {
                    $state.complete();
                }
            });
            },
            fetchItems() {
                EventBusModal.$emit("loading-loader", true);
                HTTP.get(`/favorites`).then(response => {
                    this.cards = response.data;
                EventBusModal.$emit("loading-loader", false);
            });
            },
            save: function (event) {
                // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
                alert('Bonjour ' + this.name + ' !')
                // `event` est l'évènement natif du DOM
                if (event) {
                    alert(event.target.tagName)
                }
            }
        }
    };
</script>
