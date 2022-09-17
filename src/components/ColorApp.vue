<template>
  <!-- ボタンを押したら色機能を表示 -->
  <button v-on:click="irokinou">背景色を変更</button>

  <!-- 予定の背景の色を変化...クリックした色を表示させる -->
  <div class="output" :style="bgColor"></div>

  <!-- Paletteを作る -->
  <!-- デフォルトカラー14色 -->
  <section v-if="colorArea">
    <div class="DefaultPalette">
      <div
        v-for="(defaultColor, defaultColorIndex) in defaultColors"
        :key="defaultColorIndex"
        @click="defaultColorBtn(defaultColor.id)"
      >
        <div :class="defaultColor.colorid">{{ defaultColor.color }}</div>
      </div>
    </div>
    <!-- パステルカラー12色 -->
    <div class="PastelPalette">
      <br />
      <div
        v-for="(pastelColor, pastelColorIndex) in pastelColors"
        :key="pastelColorIndex"
        @click="pastelColorBtn(pastelColor.id)"
      >
        <div :class="pastelColor.colorid">{{ pastelColor.color }}</div>
      </div>
    </div>

    <!-- グラデーション11色 -->
    <div class="GradationColor">
      <br />
      <div
        v-for="(gradationColor, gradationColorIndex) in gradationColors"
        :key="gradationColorIndex"
        @click="gradationColorBtn(gradationColor.id)"
      >
        <div :class="gradationColor.colorid">{{ gradationColor.color }}</div>
      </div>
    </div>

    <!-- ミックス6色 -->
    <div class="MixColor">
      <br />
      <div
        v-for="(mixColor, mixColorIndex) in mixColors"
        :key="mixColorIndex"
        @click="mixColorBtn(mixColor.id)"
      >
        <div :class="mixColor.colorid">{{ mixColor.color }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      inputComment: "",
      items: [],
      colorArea: false,
      defaultColors: [
        { id: 0, colorid: "color1", cl: "rgb(233, 37, 37)" },
        { id: 1, colorid: "color2", cl: "#ff007f" },
        { id: 2, colorid: "color3", cl: "#ff00ff" },
        { id: 3, colorid: "color4", cl: "#7f00ff" },
        { id: 4, colorid: "color5", cl: "purple" },
        { id: 5, colorid: "color6", cl: "#0000ff" },
        { id: 6, colorid: "color7", cl: "#00ffff" },
        { id: 7, colorid: "color8", cl: "#007fff" },
        { id: 8, colorid: "color9", cl: "#00ff7f" },
        { id: 9, colorid: "color10", cl: "#00ff00" },
        { id: 10, colorid: "color11", cl: "greenyellow" },
        { id: 11, colorid: "color12", cl: "#ffff00" },
        { id: 12, colorid: "color13", cl: "#ff7f00" },
        { id: 13, colorid: "color14", cl: "#a19e9ea7" },
      ],
      pastelColors: [
        { id: 0, colorid: "Pcolor1", cl: "#ff7f7f" },
        { id: 1, colorid: "Pcolor2", cl: "#ff7fbf" },
        { id: 2, colorid: "Pcolor3", cl: "#ff7fff" },
        { id: 3, colorid: "Pcolor4", cl: "#bf7fff" },
        { id: 4, colorid: "Pcolor5", cl: "#7f7fff" },
        { id: 5, colorid: "Pcolor6", cl: "#7fbfff" },
        { id: 6, colorid: "Pcolor7", cl: "#7fffff" },
        { id: 7, colorid: "Pcolor8", cl: "#84ffc1" },
        { id: 8, colorid: "Pcolor9", cl: "#7fff7f" },
        { id: 9, colorid: "Pcolor10", cl: "#bfff7f" },
        { id: 10, colorid: "Pcolor11", cl: "#ffff6f" },
        { id: 11, colorid: "Pcolor12", cl: "#ffbf7f" },
        { id: 12, colorid: "Pcolor13", cl: "#dbf594" },
        { id: 13, colorid: "Pcolor14", cl: "#878484a7" },
      ],
      gradationColors: [
        {
          id: 0,
          colorid: "Gcolor1",
          cl: "linear-gradient(to right, red, #ffb7b7)",
        },
        {
          id: 1,
          colorid: "Gcolor2",
          cl: "linear-gradient(to right, #ff007f, #ffb7db)",
        },
        {
          id: 2,
          colorid: "Gcolor3",
          cl: "linear-gradient(to right, #7f00ff, #ffb7ff)",
        },
        {
          id: 3,
          colorid: "Gcolor4",
          cl: "linear-gradient(to right, #0000ff, #cab7ff)",
        },
        {
          id: 4,
          colorid: "Gcolor5",
          cl: " linear-gradient(to right, #007fff, #b7dbff)",
        },
        {
          id: 5,
          colorid: "Gcolor6",
          cl: "linear-gradient(to right, #00ffff, #b7ffff)",
        },
        {
          id: 6,
          colorid: "Gcolor7",
          cl: "linear-gradient(to right, #00ff7f, #b7ffdb)",
        },
        {
          id: 7,
          colorid: "Gcolor8",
          cl: "linear-gradient(to right, #00ff00, #b7ffb7)",
        },
        {
          id: 8,
          colorid: "Gcolor9",
          cl: "linear-gradient(to right, #7fff00, #dbffb7)",
        },
        {
          id: 9,
          colorid: "Gcolor10",
          cl: "linear-gradient(to right, #ffff00, #ffffb7)",
        },
        {
          id: 10,
          colorid: "Gcolor11",
          cl: "linear-gradient(to right, #ff7f00, #ffdbb7)",
        },
        {
          id: 11,
          colorid: "Gcolor12",
          cl: "linear-gradient(to right, #ff5acd, #f3e1d0)",
        },
        {
          id: 12,
          colorid: "Gcolor13",
          cl: "linear-gradient(to right, #faaca8, #ddd6f3)",
        },
        {
          id: 13,
          colorid: "Gcolor14",
          cl: "linear-gradient(to right, #85ffbd, #fffb7d)",
        },
      ],
      mixColors: [
        {
          id: 0,
          colorid: "Mcolor1",
          cl: "linear-gradient(to right, red, yellow)",
        },
        {
          id: 1,
          colorid: "Mcolor2",
          cl: "linear-gradient(to right, #3eecac, #ee74e1)",
        },
        {
          id: 2,
          colorid: "Mcolor3",
          cl: " linear-gradient(to right, #00dbde, #fc00ff)",
        },
        {
          id: 3,
          colorid: "Mcolor4",
          cl: "linear-gradient(to right, #c850c0, #4158d0)",
        },
        {
          id: 4,
          colorid: "Mcolor5",
          cl: " linear-gradient(to right, #ff7f00, rgb(250, 250, 29))",
        },
        {
          id: 5,
          colorid: "Mcolor6",
          cl: "linear-gradient(to right, #f4d03f, #16a085)",
        },
        {
          id: 6,
          colorid: "Mcolor7",
          cl: "linear-gradient(to right, #52acff, #ffe32c)",
        },
        {
          id: 7,
          colorid: "Mcolor8",
          cl: "linear-gradient(to right, #fbab7e, #f7eb68)",
        },
        {
          id: 8,
          colorid: "Mcolor9",
          cl: "linear-gradient(to right, #fee140, #fa709a)",
        },
        {
          id: 9,
          colorid: "Mcolor10",
          cl: "linear-gradient(to right, #6284ff, #ff0000)",
        },
        {
          id: 10,
          colorid: "Mcolor11",
          cl: "linear-gradient(to right, #ffe53b, #ff2525)",
        },
        {
          id: 11,
          colorid: "Mcolor12",
          cl: "linear-gradient(to right, #f9ea3d, #f76b1c)",
        },
        {
          id: 12,
          colorid: "Mcolor13",
          cl: "linear-gradient(to right, #fa8bff, #2bd2ff, #2bff88)",
        },
        {
          id: 13,
          colorid: "Mcolor14",
          cl: "linear-gradient(to right, #4158d0, #c850c0, #ffcc70)",
        },
      ],
      bgColor: {
        backgroundColor: "",
        backgroundImage: "",
      },
    }
  },
  methods: {
    irokinou: function () {
      if (this.colorArea) {
        this.colorArea = false
        console.log("色機能が消えたよ")
      } else {
        this.colorArea = true
        console.log("色機能が表示されたよ")
      }
    },

    defaultColorBtn(defaultColorId) {
      const targetDefaultColorIndex = this.defaultColors.findIndex(
        (defaultColor) => defaultColor.id === defaultColorId
      )
      console.log(targetDefaultColorIndex)
      this.bgColor.backgroundColor =
        this.defaultColors[targetDefaultColorIndex].cl
    },
    pastelColorBtn(pastelColorid) {
      const targetPasteltColorIndex = this.pastelColors.findIndex(
        (pastelColor) => pastelColor.id === pastelColorid
      )
      console.log(targetPasteltColorIndex)
      this.bgColor.backgroundColor =
        this.pastelColors[targetPasteltColorIndex].cl
    },
    gradationColorBtn(gradationColorid) {
      const targetGradationColorIndex = this.gradationColors.findIndex(
        (gradationColor) => gradationColor.id === gradationColorid
      )
      console.log(targetGradationColorIndex)
      this.bgColor.backgroundImage =
        this.gradationColors[targetGradationColorIndex].cl
    },
    mixColorBtn(mixColorId) {
      const targetMixColorIndex = this.mixColors.findIndex(
        (mixcolor) => mixcolor.id === mixColorId
      )
      console.log(targetMixColorIndex)
      this.bgColor.backgroundImage = this.mixColors[targetMixColorIndex].cl
    },
  },
}
</script>

<style>
.output {
  display: center;
  width: 100px;
  height: 50px;
  animation: bggradient 5s ease infinite;
}

.colorArea {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  justify-content: space-between;
}

.DefaultPalette {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  margin: 3%;
  justify-content: space-between;
}

.PastelPalette {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  margin: 3%;
  justify-content: space-between;
}

.GradationColor {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  margin: 3%;
  justify-content: space-between;
}

.MixColor {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  margin: 3%;
  justify-content: space-between;
}

/* デフォルトカラー */
.color1 {
  width: 40px;
  height: 40px;
  background-color: rgb(233, 37, 37);
  border-radius: 50% 50% 0 50%;
}

.color2 {
  width: 40px;
  height: 40px;
  background-color: #ff007f;
  border-radius: 50% 50% 0 50%;
}

.color3 {
  width: 40px;
  height: 40px;
  background-color: #ff00ff;
  border-radius: 50% 50% 0 50%;
}
.color4 {
  width: 40px;
  height: 40px;
  background-color: #7f00ff;
  border-radius: 50% 50% 0 50%;
}
.color5 {
  width: 40px;
  height: 40px;
  background-color: rgb(183, 4, 183);
  border-radius: 50% 50% 0 50%;
}
.color6 {
  width: 40px;
  height: 40px;
  background-color: #0000ff;
  border-radius: 50% 50% 0 50%;
}
.color8 {
  width: 40px;
  height: 40px;
  background-color: #007fff;
  border-radius: 50% 50% 0 50%;
}
.color7 {
  width: 40px;
  height: 40px;
  background-color: #00ffff;
  border-radius: 50% 50% 0 50%;
}
.color9 {
  width: 40px;
  height: 40px;
  background-color: #00ff7f;
  border-radius: 50% 50% 0 50%;
}
.color10 {
  width: 40px;
  height: 40px;
  background-color: #00ff00;
  border-radius: 50% 50% 0 50%;
}
.color11 {
  width: 40px;
  height: 40px;
  background-color: greenyellow;
  border-radius: 50% 50% 0 50%;
}
.color12 {
  width: 40px;
  height: 40px;
  background-color: #ffff00;
  border-radius: 50% 50% 0 50%;
}
.color13 {
  width: 40px;
  height: 40px;
  background-color: #ff7f00;
  border-radius: 50% 50% 0 50%;
}
.color14 {
  width: 40px;
  height: 40px;
  background-color: rgb(40, 39, 39);
  border-radius: 50% 50% 0 50%;
}

/* パステルカラー */
.Pcolor1 {
  width: 40px;
  height: 40px;
  background-color: #ff7f7f;
  border-radius: 50% 50% 0 50%;
}

.Pcolor2 {
  width: 40px;
  height: 40px;
  background-color: #ff7fbf;
  border-radius: 50% 50% 0 50%;
}

.Pcolor3 {
  width: 40px;
  height: 40px;
  background-color: #ff7fff;
  border-radius: 50% 50% 0 50%;
}

.Pcolor4 {
  width: 40px;
  height: 40px;
  background-color: #bf7fff;
  border-radius: 50% 50% 0 50%;
}

.Pcolor5 {
  width: 40px;
  height: 40px;
  background-color: #7f7fff;
  border-radius: 50% 50% 0 50%;
}

.Pcolor6 {
  width: 40px;
  height: 40px;
  background-color: #7fbfff;
  border-radius: 50% 50% 0 50%;
}

.Pcolor7 {
  width: 40px;
  height: 40px;
  background-color: #7fffff;
  border-radius: 50% 50% 0 50%;
}
.Pcolor8 {
  width: 40px;
  height: 40px;
  background-color: #84ffc1;
  border-radius: 50% 50% 0 50%;
}
.Pcolor9 {
  width: 40px;
  height: 40px;
  background-color: #7fff7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor10 {
  width: 40px;
  height: 40px;
  background-color: #bfff7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor11 {
  width: 40px;
  height: 40px;
  background-color: #ffff6f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor12 {
  width: 40px;
  height: 40px;
  background-color: #ffbf7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor13 {
  width: 40px;
  height: 40px;
  background-color: #dbf594;
  border-radius: 50% 50% 0 50%;
}
.Pcolor14 {
  width: 40px;
  height: 40px;
  background-color: #878484a7;
  border-radius: 50% 50% 0 50%;
}

/* グラデーション */
.Gcolor1 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, red, #f6d0d0);
  border-radius: 50% 50% 0 50%;
}

.Gcolor2 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff007f, #fde6f2);
  border-radius: 50% 50% 0 50%;
}
.Gcolor3 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #7f00ff, #f6d3f6);
  border-radius: 50% 50% 0 50%;
}
.Gcolor4 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #0000ff, #e7e0fa);
  border-radius: 50% 50% 0 50%;
}
.Gcolor5 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #007fff, #d1e3f4);
  border-radius: 50% 50% 0 50%;
}
.Gcolor6 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00ffff, #dbfbfb);
  border-radius: 50% 50% 0 50%;
}
.Gcolor7 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00ff7f, #d2fde7);
  border-radius: 50% 50% 0 50%;
}
.Gcolor8 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00ff00, #d7f5d7);
  border-radius: 50% 50% 0 50%;
}
.Gcolor9 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #7fff00, #e3f2d4);
  border-radius: 50% 50% 0 50%;
}
.Gcolor10 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ffff00, #fbfbd3);
  border-radius: 50% 50% 0 50%;
}
.Gcolor11 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff7f00, #f3e1d0);
  border-radius: 50% 50% 0 50%;
}
.Gcolor12 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff5acd, #f3e1d0);
  border-radius: 50% 50% 0 50%;
}
.Gcolor13 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #faaca8, #ddd6f3);
  border-radius: 50% 50% 0 50%;
}
.Gcolor14 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #85ffbd, #fffb7d);
  border-radius: 50% 50% 0 50%;
}

/* ミックスカラー */
.Mcolor1 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, red, yellow);
  border-radius: 50% 50% 0 50%;
}
.Mcolor2 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #3eecac, #ee74e1);
  border-radius: 50% 50% 0 50%;
}
.Mcolor3 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00dbde, #fc00ff);
  border-radius: 50% 50% 0 50%;
}
.Mcolor4 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #c850c0, #4158d0);
  border-radius: 50% 50% 0 50%;
}
.Mcolor5 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff7f00, rgb(250, 250, 29));
  border-radius: 50% 50% 0 50%;
}
.Mcolor6 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #f4d03f, #16a085);
  border-radius: 50% 50% 0 50%;
}
.Mcolor7 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #52acff, #ffe32c);
  border-radius: 50% 50% 0 50%;
}
.Mcolor8 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #fbab7e, #f7eb68);
  border-radius: 50% 50% 0 50%;
}
.Mcolor9 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #fee140, #fa709a);
  border-radius: 50% 50% 0 50%;
}
.Mcolor10 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #6284ff, #ff0000);
  border-radius: 50% 50% 0 50%;
}
.Mcolor11 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ffe53b, #ff2525);
  border-radius: 50% 50% 0 50%;
}
.Mcolor12 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #f9ea3d, #f76b1c);
  border-radius: 50% 50% 0 50%;
}
.Mcolor13 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #fa8bff, #2bd2ff, #2bff88);
  border-radius: 50% 50% 0 50%;
}
.Mcolor14 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #4158d0, #c850c0, #ffcc70);
  border-radius: 50% 50% 0 50%;
}
</style>
