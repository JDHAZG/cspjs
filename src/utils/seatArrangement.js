var _ = require('lodash');
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

  //先排奇数座位
  for(let i=1;i<=KCnum;i++){
    count=0,num=0
    C[i-1]=[]
    for(let schoolName in schoolNum){
      if(schoolNum[schoolName]===0)
        continue
      P[count]=schoolNum[schoolName]/arrangementLeft
      L[count]=Math.ceil(P[count]*seatsNum)
      if(!arrangeMemo[schoolName])
        arrangeMemo[schoolName]=0
      const index=arrangeMemo[schoolName]
      // 先排奇数后排偶数方案2：直接在一个循环里完成似乎不会有相邻问题
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
        // C[i-1][num]=`HB-J${i+prefix+groupInfo[schoolName][j+index]['序号']+num}`
        C[i-1][num]=`HB-J${i.toString().padStart(2,'0')+prefix+groupInfo[schoolName][j+index]['序号'].toString().padStart(4,'0')+num.toString().padStart(2,'0')}`
        groupInfo[schoolName][j+index]['准考证号test']=C[i-1][num]
        num+=2
      }
      // arrangeMemo[schoolName]+=L[count]
      if(num>=seatsNum)
        break
      count++
    }
    arrangementLeft=arrangementLeft-Math.floor((parseInt(seatsNum)+1)/2)
  }

  //再排偶数座位
  for(let i=1;i<=KCnum;i++){
    count=0,num=1
    // C[i-1]=[]
    let keys=Object.keys(schoolNum)
    //倒序排偶数座位防止同一学校考生在同一考场相邻
    for(let k=keys.length-1;k>=0;k--){
      let schoolName=keys[k]
      if(schoolNum[schoolName]===0)
        continue
      P[count]=schoolNum[schoolName]/arrangementLeft
      L[count]=Math.ceil(P[count]*seatsNum)
      if(!arrangeMemo[schoolName])
        arrangeMemo[schoolName]=0
      const index=arrangeMemo[schoolName]
      // console.log('test',L[count],P[count])
      for(let j=0;j<L[count]&&num<seatsNum;j++){
        /**防止数组溢出 */
        schoolNum[schoolName]=schoolNum[schoolName]-1
        arrangeMemo[schoolName]=arrangeMemo[schoolName]+1
        if(schoolNum[schoolName]<0){
          schoolNum[schoolName]=0
          break
        }
        /**防止数组溢出 */
        console.log('偶数:',schoolName,schoolNum[schoolName],j+index,'j:'+j,'memo:'+index)
        C[i-1][num]=`HB-J${i.toString().padStart(2,'0')+prefix+groupInfo[schoolName][j+index]['序号'].toString().padStart(4,'0')+num.toString().padStart(2,'0')}`
        groupInfo[schoolName][j+index]['准考证号test']=C[i-1][num]
        num+=2
      }
      // arrangeMemo[schoolName]+=L[count]
      if(num>=seatsNum)
        break
      count++
    }
    arrangementLeft=arrangementLeft-Math.floor(seatsNum/2)
  }

  console.log(JSON.stringify(C))
  return groupInfo
}
exports.seatArrangement=seatArrangement
