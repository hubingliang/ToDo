<template>
    <div class="calendar">
        <i class="el-icon-arrow-left"> {{todo.year}}</i>
        <h4 class="month">{{todo.Cmonth}}</h4>
        <div class="weekday">
            <div>mo</div>
            <div>tu</div>
            <div>we</div>
            <div>th</div>
            <div>fr</div>
            <div class="weekend">sa</div>
            <div class="weekend">su</div>
        </div>
        <div class="monthday">
            <div v-for="(dates,index) in todo.dates" v-bind:class="{past:dates.past === true,now:dates.now === true}" v-on:click="changeday(index)" ref="menuItem">
                <p>{{ dates.date }}</p>
                <div class="circular" v-if="dates.finish"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['todo'],
    mounted() {
        this.monthdays()
        this.whichDay()
    },
    methods:{
        changeday:function(index){
            let date = new Date()
            let month = date.getMonth()
            let year = date.getFullYear()
            this.todo.day = this.todo.dates[index].date
            this.todo.weekday = new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date(year,month,this.todo.dates[index].date).getDay()]
            this.todo.index = this.todo.day - 1 + this.todo.empty
            this.todo.todolist = this.todo.dates[this.todo.index].todolist
        },
        whichDay: function(){ 
            let date = new Date()
            let month = date.getMonth()
            let year = date.getFullYear()
            let nowdate = new Date(year,month,1)
            let weekday = nowdate.getDay()
            for(let i = 1;i < weekday;i++){
                this.todo.dates.unshift({date:'  '})
            }
            this.todo.empty = weekday - 1
            this.todo.index = this.todo.day - 1 + this.todo.empty
        },
        monthdays: function(){
            let date = new Date()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let nowday = date.getDate()
            let lastdate = new Date(year,month,0)
            let days = lastdate.getDate()
            let day = 1
            for(let i = 1;i < days;i++){
                if(day < 10){
                    day = '0' + day
                }
                if(day < nowday){
                    this.todo.dates.push({date: `${day}`,past:true,todolist:[],finish:false})
                    day++
                }else if(day === nowday){
                    this.todo.dates.push({date: `${day}`,now:true,todolist:[],finish:false})
                    day++
                }else{
                    this.todo.dates.push({date: `${day}`,past:false,todolist:[],finish:false})
                    day++
                }
            }
        }
    }
}
</script>
