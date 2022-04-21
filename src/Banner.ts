
export const setBuildBanner = (pkg:any): string  => {
let nowData:Date = new Date()
return `
*  @plugin ${pkg.name}
*  @version ${pkg.version} (${nowData.getFullYear()}-${nowData.getMonth()+1}-${nowData.getDate()})
*  @description ${pkg.description}
*  @copyright (${nowData.getFullYear()}) ${pkg.author||'Five(Li Hailong)'} . All rights reserved. ${ pkg.repository&&pkg.repository.url? '\n*  @repository '+ pkg.repository.url : 'https://github.com/tinymce-plugin'+pkg.name.replace(/\@tinymce-plugin/,'')}
`
}