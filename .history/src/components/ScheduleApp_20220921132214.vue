<template>
  <div class="schedule">
    <button v-on:click="scheduleRan">＋予定</button>
  </div>
  <div v-if="scheduleKinou" class="scheduleKinou">
    <br />
    <div class="startend1">
      予定を追加
      <input type="text" v-model="inputComment" />
    </div>
    <br />

    <div class="startend2">
      <br />
      <div class="nichizi">日時を選択</div>
      始まり
      <input type="date" name="date" v-model="selectDate" />
      <option
        v-for="date in optionDate"
        v-bind:value="date.name"
        v-bind:key="date.id"
      >
        {{ date.name }}
      </option>
      <select v-model="selectedTime">
        <option disabled value="">Hour</option>
        <option
          v-for="time in optionTimes"
          v-bind:value="time.name"
          v-bind:key="time.id"
        >
          {{ time.name }}
        </option>
      </select>
      <select v-model="selectedTime2">
        <option disabled value="">Minute</option>
        <option
          v-for="time2 in optionTimes2"
          v-bind:value="time2.name"
          v-bind:key="time2.id"
        >
          {{ time2.name }}
        </option>
      </select>
    </div>

    <div class="startend3">
      終わり
      <input type="date" name="date" v-model="selectDate2" />
      <option
        v-for="date2 in optionDate2"
        v-bind:value="date2.name"
        v-bind:key="date2.id"
      >
        {{ date2.name }}
      </option>
      <select v-model="selectedTimeLast">
        <option disabled value="">Hour</option>
        <option
          v-for="lastTime in optionTimesLast"
          v-bind:value="lastTime.name"
          v-bind:key="lastTime.id"
        >
          {{ lastTime.name }}
        </option>
      </select>
      <select v-model="selectedTimeLast2">
        <option disabled value="">Minute</option>
        <option
          v-for="lastTime2 in optionTimesLast2"
          v-bind:value="lastTime2.name"
          v-bind:key="lastTime2.id"
        >
          {{ lastTime2.name }}
        </option>
      </select>
      <!-- 78～134行目 さえちゃんの色機能のとこ -->
      <!-- ボタンを押したら色機能を表示 -->
      <div v-if="isVisible">
        <button v-on:click="irokinou">背景色を変更</button>
      </div>
      <!-- 予定の背景の色を変化...クリックした色を表示させる
    <div class="output" :style="bgColor"></div> -->

      <!-- Paletteを作る -->
      <!-- デフォルトカラー14色 -->
      <section v-if="colorArea">
        <select v-model="DefaultPalette">
          <div class="DefaultPalette">
            <div
              v-for="(defaultColor, defaultColorIndex) in defaultColors"
              :key="defaultColorIndex"
              @click="defaultColorBtn(defaultColor.id)"
            >
              <div :class="defaultColor.colorid">{{ defaultColor.color }}</div>
            </div>
          </div>
        </select>
        <!-- パステルカラー12色 -->
        <select v-model="PastelPalette">
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
        </select>

        <!-- グラデーション11色 -->
        <select v-model="GradationColor">
          <div class="GradationColor">
            <br />
            <div
              v-for="(gradationColor, gradationColorIndex) in gradationColors"
              :key="gradationColorIndex"
              @click="gradationColorBtn(gradationColor.id)"
            >
              <div :class="gradationColor.colorid">
                {{ gradationColor.color }}
              </div>
            </div>
          </div>
        </select>

        <!-- ミックス6色 -->
        <select v-model="MixColor">
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
        </select>
      </section>
    </div>
    <br />

    <div class="startend4">
      <button v-on:click="push" class="scheduleButton1">追加</button>
      <button v-on:click="edit" class="scheduleButton2">編集</button>
      <button v-on:click="deletes" class="scheduleButton3">削除</button>
    </div>
  </div>
  <div>
    <ul>
      <!-- <li v-for="(item, index) in items" :key="index"> -->
      <!--さえちゃんの色機能のとこ  -->
      <!-- </li> -->
      <li v-for="(item, index) in items" :key="index" :style="bgColor">
        <label class="commentItem">
          <span
            >{{ item.text }} {{ item.date }} {{ item.time }}:{{ item.time2 }} ~
            {{ item.date2 }} {{ item.lastTime }}:{{ item.lastTime2 }}</span
          >
          <!-- 一旦コメントアウトしとく削除機能 -->
          <button v-on:click="deleteBtn(index)">削除</button>
        </label>
      </li>
    </ul>
  </div>
</template>
<script>
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "../firebase"
// 削除ボタンのimportの処理
// import { doc, deleteDoc } from "firebase/firestore"
import { doc, updateDoc, deleteField } from "firebase/firestore"

export default {
  data() {
    return {
      inputComment: "",
      items: [],
      scheduleKinou: false,
      selectDate: "",
      // dateSchedule: false,
      selectedTime: "",
      optionTimes: [
        { id: 1, name: "0" },
        { id: 2, name: "1" },
        { id: 3, name: "2" },
        { id: 4, name: "3" },
        { id: 5, name: "4" },
        { id: 6, name: "5" },
        { id: 7, name: "6" },
        { id: 8, name: "7" },
        { id: 9, name: "8" },
        { id: 10, name: "9" },
        { id: 11, name: "10" },
        { id: 12, name: "11" },
        { id: 13, name: "12" },
        { id: 14, name: "13" },
        { id: 15, name: "14" },
        { id: 16, name: "15" },
        { id: 17, name: "16" },
        { id: 18, name: "17" },
        { id: 19, name: "18" },
        { id: 20, name: "19" },
        { id: 21, name: "20" },
        { id: 22, name: "21" },
        { id: 23, name: "22" },
        { id: 24, name: "23" },
      ],
      selectedTime2: "",
      optionTimes2: [
        { id: 1, name: "00" },
        { id: 2, name: "05" },
        { id: 3, name: "10" },
        { id: 4, name: "15" },
        { id: 5, name: "20" },
        { id: 6, name: "25" },
        { id: 7, name: "30" },
        { id: 8, name: "35" },
        { id: 9, name: "40" },
        { id: 10, name: "45" },
        { id: 11, name: "50" },
        { id: 12, name: "55" },
      ],
      selectedTimeLast: "",
      optionTimesLast: [
        { id: 1, name: "0" },
        { id: 2, name: "1" },
        { id: 3, name: "2" },
        { id: 4, name: "3" },
        { id: 5, name: "4" },
        { id: 6, name: "5" },
        { id: 7, name: "6" },
        { id: 8, name: "7" },
        { id: 9, name: "8" },
        { id: 10, name: "9" },
        { id: 11, name: "10" },
        { id: 12, name: "11" },
        { id: 13, name: "12" },
        { id: 14, name: "13" },
        { id: 15, name: "14" },
        { id: 16, name: "15" },
        { id: 17, name: "16" },
        { id: 18, name: "17" },
        { id: 19, name: "18" },
        { id: 20, name: "19" },
        { id: 21, name: "20" },
        { id: 22, name: "21" },
        { id: 23, name: "22" },
        { id: 24, name: "23" },
      ],
      selectedTimeLast2: "",
      optionTimesLast2: [
        { id: 1, name: "00" },
        { id: 2, name: "05" },
        { id: 3, name: "10" },
        { id: 4, name: "15" },
        { id: 5, name: "20" },
        { id: 6, name: "25" },
        { id: 7, name: "30" },
        { id: 8, name: "35" },
        { id: 9, name: "40" },
        { id: 10, name: "45" },
        { id: 11, name: "50" },
        { id: 12, name: "55" },
      ],
      // 263～444行目 さえちゃんの色機能のとこ
      isVisible: true,
      colorArea: true,
      DefaultPalette: "",
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
        { id: 13, colorid: "color14", cl: "rgb(56, 56, 56)" },
      ],
      PastelPalette: "",
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
      GradationColor: "",
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
      MixColor: "",
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
        backgroundColor: "white",
        backgroundImage: "",
      },
      // 削除ボタンに対するreturn
      comments: "",
    }
  },
  async created() {
    const q = query(collection(db, "Schedule"))

    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      this.items.push({
        text: doc.data().text,
        date: doc.data().date,
        time: doc.data().time,
        time2: doc.data().time2,
        date2: doc.data().date2,
        lastTime: doc.data().lastTime,
        lastTime2: doc.data().lastTime2,
      })
      this
      // defaultColor: doc.data().defaultColor,
    })
  },
  methods: {
    scheduleRan: function () {
      if (this.scheduleKinou) {
        this.scheduleKinou = false
        console.log("予定作成欄が消えたよ")
      } else {
        this.scheduleKinou = true
        console.log("予定作成欄が出現したよ")
      }
    },
    // 477～516行目 さえちゃんの色機能のとこ
    irokinou: function () {
      if (this.colorArea) {
        this.colorArea = false
        console.log("色機能が消えた")
      } else {
        this.colorArea = true
        console.log("色機能が表示された")
      }
    },
    defaultColorBtn(defaultColorId) {
      const targetDefaultColorIndex = this.defaultColors.findIndex(
        (defaultColor) => defaultColor.id === defaultColorId
      )
      console.log(targetDefaultColorIndex)
      this.bgColor.backgroundColor =
        this.defaultColors[targetDefaultColorIndex].cl
      // await addDoc(collection(db, "Schedule"), item)
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
    async push() {
      if (this.inputComment !== "") {
        this.items.push({
          text: this.inputComment,
          date: this.selectDate,
          time: this.selectedTime,
          time2: this.selectedTime2,
          date2: this.selectDate2,
          lastTime: this.selectedTimeLast,
          lastTime2: this.selectedTimeLast2,
          defaultColor: this.DefaultPalette,
        })
        let item = {
          text: this.inputComment,
          date: this.selectDate,
          time: this.selectedTime,
          time2: this.selectedTime2,
          date2: this.selectDate2,
          lastTime: this.selectedTimeLast,
          lastTime2: this.selectedTimeLast2,
        }
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
        console.log("追加できてるよ")
        await addDoc(collection(db, "Schedule"), item)

        this.inputMemo = ""
      }
    },
    edit() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else this.inputComment === "", {}
      this.inputComment = ""
    },
    deletes: function () {
      if (this.scheduleKinou) {
        this.scheduleKinou = false
        console.log("予定作成欄が消えたよ")
      }
    },
    // 削除ボタンを押したときの処理
    async deleteBtn(index) {
      this.items.splice(index, 1)
      console.log("削除できたよ")
      // await deleteDoc(doc(db, "Schedule", this.items.splice(index, 1)))
      // ここの"Schedule"のあとがエラーになる
      const deleteBtn = doc(db, "Schedule", this.items[index])

      // Remove the 'capital' field from the document
      await updateDoc(deleteBtn, {
        text: deleteField(),
        date: deleteField(),
        time: deleteField(),
        time2: deleteField(),
        date2: deleteField(),
        lastTime: deleteField(),
        lastTime2: deleteField(),
      })
    },
  },
}
//dataプロパティとmethodsプロパティは{},になる
//methodsの末の関数の末は{},
//key: value,のオブジェクト
</script>
<style>
.schedule {
  display: flex;
  justify-content: flex-end;
}
.startend {
}
.scheduleKinou {
  border-top-style: double;
  border-bottom-style: double;
  border-right-style: double;
  border-left-style: double;
  border-color: #faa9b6;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: thick;
  width: 300px;
  background-color: #fed4db;
  border-radius: 20px;
  /* height: 200px; */
}
.startend1 {
}
.startend2 {
  border-top-style: double;
  border-color: #faa9b6;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: thick;
  width: 300px;
}
.startend3 {
}
.startend4 {
  border-top-style: double;
  border-color: #faa9b6;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: thick;
  width: 300px;
  radius: 50px;
}
.scheduleButton1 {
  margin-right: 20px;
}
.scheduleButton2 {
  margin-right: 20px;
}
.nichizi {
  text-align: center;
}
/* 625～1009行目 さえちゃんの色機能のとこ */
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
  background-color: rgb(56, 56, 56);
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
