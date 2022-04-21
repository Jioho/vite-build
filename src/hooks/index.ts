const toHump = (name:any) =>{
  return name.replace(/[-|\_](\w)/g, function(all:any, letter:any){
      return letter.toUpperCase();
  });
}
// 驼峰转换下划线
const toLine = (name:any) =>{
return name.replace(/([A-Z])/g,"_$1").toLowerCase().replace(/\-/g,"_");
}
const toHyphen = (name:string) =>{
  return name.replace(/([A-Z])/g,"-$1").toLowerCase().replace(/\_/g,"-");
}
export const namingFormat:any = {
  toHump: toHump,
  toLine: toLine,
  toHyphen: toHyphen,
}
     