<template>
  <div id="header">
    <span class="header-arrow" v-on:click="lastMonth">＜</span>
    <span class="selected-month">{{ year }}年{{ month }}月</span>
    <span class="header-arrow" v-on:click="nextMonth">＞</span>
  </div>
  <div>
    <table id="main">
      <thead>
        <th v-for="(dayName, dayIndex) in weekdays" :key="dayIndex">
          {{ dayName }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(weekData, weekDataIndex) in calendar" :key="weekDataIndex">
          <td
            v-for="(dayNumber, dayNumberIndex) in weekData"
            :key="dayNumberIndex"
            :class="{ today: isToday(dayNumber) }"
          >
            <span v-on:click="commentRan"> <CommentApp />{{ dayNumber }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import CommentApp from "./components/CommentApp.vue"
export default {
  // components: {
  //   CommentApp,
  // },
  data() {
    return {
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      year: 2021,
      month: 3,
      today: "",
      commentKinou: false,
    }
  },
  computed: {
    calendar: function () {
      let calendar = []
      let firstWeekDay = new Date(this.year, this.month - 1, 1).getDay()
      let lastDay = new Date(this.year, this.month, 0).getDate()
      let dayNumber = 1
      while (dayNumber <= lastDay) {
        let weekData = []
        for (let i = 0; i <= 6; i++) {
          if (calendar.length == 0 && i < firstWeekDay) {
            weekData[i] = ""
          } else if (lastDay < dayNumber) {
            weekData[i] = ""
          } else {
            weekData[i] = dayNumber
            dayNumber++
          }
        }
        calendar.push(weekData)
      }
      return calendar
    },
  },
  methods: {
    commentRan: function () {
      if (this.commentKinou) {
        this.commentKinou = false
        console.log("コメント欄が消えたよ")
      } else {
        this.commentKinou = true
        console.log("コメント欄が出現したよ")
      }
    },

    lastMonth: function () {
      if (this.month == 1) {
        this.year--
        this.month = 12
      } else {
        this.month--
      }
    },
    nextMonth: function () {
      if (this.month == 12) {
        this.year++
        this.month = 1
      } else {
        this.month++
      }
    },

    isToday: function (day) {
      let date = this.year + "-" + this.month + "-" + day
      if (this.today == date) {
        return true
      }
      return false
    },
  },

  mounted() {
    let date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    let actualDay = date.getDate()
    this.today = this.year + "-" + this.month + "-" + actualDay
  },
}
</script>

<style scoped>
#main {
  border: 1px solid #333;
  width: 100%;
}
td {
  border: 1px solid #333;
  padding-bottom: 6%;
}
#main th {
  text-align: center;
  font-weight: normal;
  color: black;
}
#header {
  font-size: 24px;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
  background-color: green;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
#header span {
  padding: 15px 20px;
  color: white;
  display: inline-block;
}
.today {
  background-color: pink;
}
</style>
