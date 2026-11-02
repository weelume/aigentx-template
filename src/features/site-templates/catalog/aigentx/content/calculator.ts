/** 保留参考站首页演示的对数用量刻度，与价格页方案独立配置。 */
export function taskEstimate(position:number):{tasks:number;tier:number} {
 const tasks=Math.round(1000*Math.pow(5000,position/1000)/1000)*1000
 return {tasks,tier:tasks<=10000?0:tasks<=50000?1:tasks<=500000?2:3}
}
