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
  name: "Loader"
};
</script>
<style scoped>

#loader {
  position:fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.1);
  z-index: 1000;
}

#loader > div  {
  position: relative;
  top: 50%;
}

.cs-loader {
  position: absolute;
  height: 100%;
  width: 100%;
}

.cs-loader-inner {
  transform: translateY(-50%);
  position: absolute;
  width: 100%;
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner label {
  font-size: 20px;
  display: inline-block;
  color: #eb5865;
}

@keyframes wave-bebeLoutre {
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

@-webkit-keyframes wave-bebeLoutre {
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
  -webkit-animation: wave-bebeLoutre 1s infinite ease-in-out;
  animation: wave-bebeLoutre 1s infinite ease-in-out;
}

.cs-loader-inner label:nth-child(5) {
  -webkit-animation: wave-bebeLoutre 1s 100ms infinite ease-in-out;
  animation: wave-bebeLoutre 1s 100ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(4) {
  -webkit-animation: wave-bebeLoutre 1s 200ms infinite ease-in-out;
  animation: wave-bebeLoutre 1s 200ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(3) {
  -webkit-animation: wave-bebeLoutre 1s 300ms infinite ease-in-out;
  animation: wave-bebeLoutre 1s 300ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(2) {
  -webkit-animation: wave-bebeLoutre 1s 400ms infinite ease-in-out;
  animation: wave-bebeLoutre 1s 400ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(1) {
  -webkit-animation: wave-bebeLoutre 1s 500ms infinite ease-in-out;
  animation: wave-bebeLoutre 1s 500ms infinite ease-in-out;
}

.cs-loader-inner-bis {
  transform: translateY(-50%);
  position: absolute;
  width: 100%;
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner-bis label {
  font-size: 20px;
  display: inline-block;
  color: #589cc7;
}

@keyframes wave-bebeLoutreBis {
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

@-webkit-keyframes wave-bebeLoutreBis {
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
  -webkit-animation: wave-bebeLoutreBis 1s infinite ease-in-out;
  animation: wave-bebeLoutreBis 1s infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(5) {
  -webkit-animation: wave-bebeLoutreBis 1s 100ms infinite ease-in-out;
  animation: wave-bebeLoutreBis 1s 100ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(4) {
  -webkit-animation: wave-bebeLoutreBis 1s 200ms infinite ease-in-out;
  animation: wave-bebeLoutreBis 1s 200ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(3) {
  -webkit-animation: wave-bebeLoutreBis 1s 300ms infinite ease-in-out;
  animation: wave-bebeLoutreBis 1s 300ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(2) {
  -webkit-animation: wave-bebeLoutreBis 1s 400ms infinite ease-in-out;
  animation: wave-bebeLoutreBis 1s 400ms infinite ease-in-out;
}

.cs-loader-inner-bis label:nth-child(1) {
  -webkit-animation: wave-bebeLoutreBis 1s 500ms infinite ease-in-out;
  animation: wave-bebeLoutreBis 1s 500ms infinite ease-in-out;
}
</style>
