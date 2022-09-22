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
            <span>{{ dayNumber }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
-->

<script>
export default {
  data() {
    return {
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      year: 2021,
      month: 3,
      today: "",
      image: ["9-yuyake.jpg", "10-moon.jpeg"],
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
        console.log("次の月")
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
  width: 100%;
  background: linear-gradient(to bottom, #759d9d, #e2b78d);
  color: white;
  font-size: 150%;
  font-weight: 300;
  justify-content: space-evenly;
}
td {
  border: 2px solid rgba(241, 239, 239, 0.69);
  padding-bottom: 6%;
}
#main th {
  text-align: center;
  font-weight: normal;
  color: white;
}
#header {
  font-size: 35px;
  padding: 0;
  text-align: center;
  background-color: rgba(249, 250, 250, 0);
  border-bottom: 2px solid #ddd;
  display: flex;
  justify-content: center;
}
#header span {
  padding: 15px 30px;
  color: rgb(255, 255, 255);
  display: inline-block;
}
.today {
  background-color: rgb(192, 180, 182);
}
</style>
