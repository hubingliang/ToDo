<template>
    <div class="calendar">
        <i class="el-icon-arrow-left"> {{this.year}}</i>
        <h4 class="month">{{this.currentMonth}}</h4>
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
            <div v-for="(dates,index) in app.todo" v-bind:class="{past:dates.past === true,now:dates.now === true}" v-on:click="changeDay(dates.date)" ref="menuItem">
                <p>{{ dates.date }}</p>
                <div class="circular" v-if="!dates.finish"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        month : new Date().getMonth(),
        year : new Date().getFullYear(),
        today : new Date().getDate(),
        currentMonth: new Array("J a n u a r y", "F e b r u a r y", "M a r c h","A p r i l", "M a y", "J u n e", "J u l y", "A u g u s t", "S e p t e m b e r", "O c t o b e r", "N o v e m b e r", "D e c e m b e r")[new Date().getMonth()]
    }),
    props:['app'],
    mounted() {
        this.resetDate()
    },
    methods:{
        changeDay:function(date){
            if(date === ' '){
                return //如果点击空白日期则返回
            }else{
                this.app.weekday = new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date(this.year,this.month,date).getDay()]
                this.app.day = Number(date)
                this.app.currentTodo = this.app.todo[this.app.substitute + this.app.day - 2].todoList
            }
        },
        resetDate: function(){
            //生成有日期的日历
            let totalDays = new Date(this.year,this.month,0).getDate()
            for(let i = 1;i <= totalDays;i++){
                if(i < this.today){
                    this.app.todo.push({date: `${i}`,past:true,todoList:[],finish:true})
                }else if(i === this.today){
                    this.app.todo.push({date: `${i}`,now:true,todoList:[],finish:true})
                }else{
                    this.app.todo.push({date: `${i}`,past:false,todoList:[],finish:true})
                }
            }
            //用空白填充没日期的日历
            this.app.substitute = new Date(this.year,this.month,1).getDay()
            for(let i = 1;i < this.app.substitute;i++){
                this.app.todo.unshift({date:' ',finish:true})
            }
            this.app.currentTodo = this.app.todo[this.app.substitute + this.app.day - 2].todolist
        },
    }
}
</script>
