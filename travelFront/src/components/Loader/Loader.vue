<template>
    <div id="loader">
        <div>
            <div class="cs-loader-inner">
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
            </div>
        </div>
        <div class="cs-loader">
            <div class="cs-loader-inner-bis">
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
            </div>
        </div>
    </div>  
</template>
<script>
export default {
  name: "Home"
};
</script>
<style scoped>


.cs-loader {
  position: absolute;
  height: 100%;
  width: 100%;
}

.cs-loader-inner {
  transform: translateY(-50%);
  position: absolute;
  width: calc(100% - 200px);
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner label {
  font-size: 20px;
  display: inline-block;
  color: #eb5865;
}

@keyframes lol {
  0% {
    transform: translateY(-15px);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(-15px);
  }
}

@-webkit-keyframes lol {
  0% {
    -webkit-transform: translateY(-15px);
  }
  50% {
    -webkit-transform: translateY(15px);
  }
  100% {
    -webkit-transform: translateY(-15px);
  }
}

.cs-loader-inner label:nth-child(6) {
  -webkit-animation: lol 1s infinite ease-in-out;
  animation: lol 1s infinite ease-in-out;
}

.cs-loader-inner label:nth-child(5) {
  -webkit-animation: lol 1s 100ms infinite ease-in-out;
  animation: lol 1s 100ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(4) {
  -webkit-animation: lol 1s 200ms infinite ease-in-out;
  animation: lol 1s 200ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(3) {
  -webkit-animation: lol 1s 300ms infinite ease-in-out;
  animation: lol 1s 300ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(2) {
  -webkit-animation: lol 1s 400ms infinite ease-in-out;
  animation: lol 1s 400ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(1) {
  -webkit-animation: lol 1s 500ms infinite ease-in-out;
  animation: lol 1s 500ms infinite ease-in-out;
}

.cs-loader-inner-bis {
  transform: translateY(-50%);
  position: absolute;
  width: calc(100% - 200px);
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner-bis label {
  font-size: 20px;
  display: inline-block;
  color: #589cc7;
}

@keyframes mdr {
  0% {
    transform: translateY(15px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(15px);
  }
}

@-webkit-keyframes mdr {
  0% {
    -webkit-transform: translateY(15px);
  }
  50% {
    -webkit-transform: translateY(-15px);
  }
  100% {
    -webkit-transform: translateY(15px);
  }
}

.cs-loader-inner-bis label:nth-child(6) {
  -webkit-animation: mdr 1s infinite ease-in-out;
  animation: mdr 1s infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(5) {
  -webkit-animation: mdr 1s 100ms infinite ease-in-out;
  animation: mdr 1s 100ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(4) {
  -webkit-animation: mdr 1s 200ms infinite ease-in-out;
  animation: mdr 1s 200ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(3) {
  -webkit-animation: mdr 1s 300ms infinite ease-in-out;
  animation: mdr 1s 300ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(2) {
  -webkit-animation: mdr 1s 400ms infinite ease-in-out;
  animation: mdr 1s 400ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(1) {
  -webkit-animation: mdr 1s 500ms infinite ease-in-out;
  animation: mdr 1s 500ms infinite ease-in-out;
}
</style>
