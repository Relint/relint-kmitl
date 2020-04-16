<template>
<div>
    <div class="contain-profile">
        <div class="form-profile"  >
          <div class="stage-l" id="scroll-task">
            <div v-for="(task,indexT) in temp0" :key="task">
                <div class="member-task" v-bind:style="{left:5+(indexT)*400+(indexT)*30 + 'px',top:20+'px' }">
                    {{task.userName}}<br>
                    {{task.priority}}
                
                <div class="scroll-jobs" >
                    <div v-for="job in temp0.jobs" :key="job">
                        <div class="member-jobs"  >
                            {{job.jobName}} 
                            {{job.date}}
                         </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="stage-r">

        </div>
        </div>
     </div>
</div>
</template>
<script>
export default {
    name:'boardManage',
    data () {
        return {
            task:[],
            member:[],
            temp0:[
                {
                    userName: "U1",
                    priority: "Admin",
                    jobs: []
                },
                {
                userName: "U2",
                priority: "Co-Admin",
                jobs: [
                        {
                        jobName: "Backend",
                        date: "32/13/2000"
                        },
                        {
                        jobName: "Server",
                        date: "42/46/2484"
                        },
                    ]
                },
                {
                userName: "U3",
                priority: "member",
                jobs: [
                        {
                        jobName: "Hunt a girl",
                        date: "32/13/2000"
                        },
                        {
                        jobName: "Take she/he home",
                        date: "42/46/2484"
                        },
                        {
                        jobName: "Eat her things",
                        date: "01/01/2020"
                        },
                        {
                        jobName: "gave",
                        date: "25/03/2020"
                        },
                        {
                        jobName: "Hunt a man",
                        date: "32/13/2000"
                        },
                        {
                        jobName: "Eat him",
                        date: "42/46/2484"
                        },
                        {
                        jobName: "Angry",
                        date: "01/01/2020"
                        }
                    ]
                },
                {
                userName: "U4",
                priority: "Member",
                jobs: [
                        {
                        jobName: "Plaing ROV",
                        date: "32/13/2000"
                        },
                        {
                        jobName: "In Love",
                        date: "42/46/2484"
                        },
                        {
                        jobName: "Take bath",
                        date: "01/01/2020"
                        },
                        {
                        jobName: "Plaing CSGO",
                        date: "25/03/2020"
                        }
                    ]
                },
                {
                userName: "U5",
                priority: "Member",
                jobs: [
                        {
                        jobName: "Angry",
                        date: "32/13/2000"
                        },
                        {
                        jobName: "Shout",
                        date: "42/46/2484"
                        },
                        {
                        jobName: "Watching YouTube",
                        date: "01/01/2020"
                        },
                    ]
                },
                {
                userName: "U6",
                priority: "Member",
                jobs: [
                        {
                        jobName: "Angry",
                        date: "32/13/2000"
                        },
                    ]
                },
                {
                userName: "U7",
                priority: "Member",
                jobs: [
                        {
                        jobName: "Angry",
                        date: "32/13/2000"
                        },
                        {
                        jobName: "Shout",
                        date: "42/46/2484"
                        },
                        {
                        jobName: "Watching YouTube",
                        date: "01/01/2020"
                        },
                        {
                        jobName: "Make a gun",
                        date: "25/03/2020"
                        },
                        {
                        jobName: "Kill Pun",
                        date: "30/04/2020"
                        }
                    ]
                },
        
             ]
        }
    }
}
</script>
<style scoped lang="scss">
@import "./boardManage.scss";
</style>