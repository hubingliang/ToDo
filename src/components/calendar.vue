<template>
    <div class="calendar">
        <i class="el-icon-arrow-left"> {{year}}</i>
        <h4 class="month">{{month}}</h4>
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
            <div v-for="dates in dates" v-bind:class="{past:dates.past === true,now:dates.now === true}">
                {{ dates.date }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            year:new Date().getFullYear(),
            month: new Array("J a n u a r y", "F e b r u a r y", "M a r c h","A p r i l", "M a y", "J u n e", "J u l y", "A u g u s t", "S e p t e m b e r", "O c t o b e r", "N o v e m b e r", "D e c e m b e r")[new Date().getMonth()],
            dates: [
            ]   
        }
    },
    mounted() {
        this.monthdays()
        this.whichDay()
    },
    methods:{
        whichDay: function(){ 
            let date = new Date()
            let month = date.getMonth()
            let year = date.getFullYear()
            let nowdate = new Date(year,month,1)
            let weekday = nowdate.getDay()
            for(let i = 1;i < weekday;i++){
                this.dates.unshift({date:'  '})
            }
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
                    day = '0'+day
                }
                if(day < nowday){
                    this.dates.push({date: `${day}`,past:true})
                    day++
                }else if(day === nowday){
                    this.dates.push({date: `${day}`,now:true})
                    day++
                }else{
                    this.dates.push({date: `${day}`,past:false})
                    day++
                }
            }
        }
    }
}
</script>
