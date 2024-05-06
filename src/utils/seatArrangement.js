var _ = require('lodash');
// const Kaodian=300
// const KC={
//     "第一考场":30,
//     "第二考场":30,
//     "第三考场":30,
//     "第四考场":30,
//     "第五考场":30,
//     "第六考场":30,
//     "第七考场":30,
//     "第八考场":30,
//     "第九考场":30,
//     "第十考场":30,
// }
// const schoolNum={
//     "一中":50,
//     "二中":40,
//     "三中":30,
//     "四中":20,
//     "五中":10,
//     "六中":50,
//     "七中":40,
//     "八中":30,
//     "九中":20,
//     "十中":10,
// }
// let arrangementLeft=Kaodian
// export default function seatArrangement() {
// 准考证号形式HB-J00910，HB+类别+考场+座位编号
function seatArrangement(prefix,placeholder,seatsNum,studentInfo) {
  let arrangementLeft=studentInfo.length
  const KCnum=Math.ceil(studentInfo.length/seatsNum)
  const groupInfo=_.groupBy(studentInfo, item=>item['更新学校']);
  const schoolNum=_.countBy(studentInfo, item=>item['更新学校'])
  // console.log(schoolNum)
  // return groupInfo
  const P=[],L=[],C={},arrangeMemo={}
  let count=0,num=0// count是指当前学校，num是指当前考场的人数
  for(let i=1;i<=KCnum;i++){
    count=0,num=0
    C[i-1]=[]
    for(let schoolName in schoolNum){
      if(schoolNum[schoolName]===0)
        continue
      P[count]=schoolNum[schoolName]/arrangementLeft
      L[count]=Math.ceil(P[count]*seatsNum)
      // schoolNum[schoolName]=schoolNum[schoolName]-L[count]
      // arrangeMemo[schoolName]?arrangeMemo[schoolName]+=L[count]:arrangeMemo[schoolName]=0
      if(!arrangeMemo[schoolName])
        arrangeMemo[schoolName]=0
      const index=arrangeMemo[schoolName]
      for(let j=0;j<L[count]&&num<seatsNum;j++){
        /**防止数组溢出 */
        schoolNum[schoolName]=schoolNum[schoolName]-1
        arrangeMemo[schoolName]=arrangeMemo[schoolName]+1
        if(schoolNum[schoolName]<0){
          schoolNum[schoolName]=0
          break
        }
        /**防止数组溢出 */
        console.log(schoolName,schoolNum[schoolName],j+index,'j:'+j,'memo:'+index)
        C[i-1][num]=`HB-J${i+prefix+groupInfo[schoolName][j+index]['序号']+num}`
        groupInfo[schoolName][j+index]['准考证号test']=C[i-1][num]
        num++
      }
      // arrangeMemo[schoolName]+=L[count]
      if(num===seatsNum)
        break
      count++
    }
    arrangementLeft=arrangementLeft-seatsNum
  }
  console.log(JSON.stringify(C))
  return groupInfo

//   const P=[],L=[],C={}// p:
//   let count=0,num=0
//   for(let roomName in KC){
//     count=0,num=0
//     C[roomName]=[]
//     for(let schoolName in schoolNum){
//         if(schoolNum[schoolName]===0)
//         continue
//         P[count]=schoolNum[schoolName]/arrangementLeft//学校未编排人数/考点剩余人数
//         L[count]=Math.ceil(P[count]*KC[roomName])// 比例*考场总人数
//         schoolNum[schoolName]=schoolNum[schoolName]-L[count]
//         for(let i=0;i<L[count]&&num<KC[roomName];i++){
//             C[roomName][num]=roomName+schoolName+num
//             num++
//         }
//         if(num==KC[roomName])
//         break
//         count++
//     }
//     arrangementLeft=arrangementLeft-KC[roomName]
//   }
// //   console.log(JSON.stringify(C))
//   console.log(C)
}
exports.seatArrangement=seatArrangement
// seatArrangement()
