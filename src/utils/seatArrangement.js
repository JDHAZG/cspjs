const Kaodian=300
const KC={
    "第一考场":30,
    "第二考场":30,
    "第三考场":30,
    "第四考场":30,
    "第五考场":30,
    "第六考场":30,
    "第七考场":30,
    "第八考场":30,
    "第九考场":30,
    "第十考场":30,
}
const schoolNum={
    "一中":50,
    "二中":40,
    "三中":30,
    "四中":20,
    "五中":10,
    "六中":50,
    "七中":40,
    "八中":30,
    "九中":20,
    "十中":10,
}
let arrangementLeft=Kaodian
// export default function seatArrangement() {
function seatArrangement() {
  const P=[],L=[],C={}
  let count=0,num=0
  for(let roomName in KC){
    count=0,num=0
    C[roomName]=[]
    for(let schoolName in schoolNum){
        if(schoolNum[schoolName]===0)
        continue
        P[count]=schoolNum[schoolName]/arrangementLeft//学校未编排人数/考点剩余人数
        L[count]=Math.ceil(P[count]*KC[roomName])// 比例*考场总人数
        schoolNum[schoolName]=schoolNum[schoolName]-L[count]
        for(let i=0;i<L[count]&&num<KC[roomName];i++){
            C[roomName][num]=roomName+schoolName+num
            num++
        }
        if(num==KC[roomName])
        break
        count++
    }
    arrangementLeft=arrangementLeft-KC[roomName]
  }
//   console.log(JSON.stringify(C))
  console.log(C)
}
seatArrangement()
