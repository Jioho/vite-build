"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBuildBanner = void 0;
const setBuildBanner = (pkg) => {
    let nowData = new Date();
    return `
*  @plugin ${pkg.name}
*  @version ${pkg.version} (${nowData.getFullYear()}-${nowData.getMonth() + 1}-${nowData.getDate()})
*  @description ${pkg.description}
*  @copyright (${nowData.getFullYear()}) ${pkg.author || 'Five(Li Hailong)'} . All rights reserved. ${pkg.repository && pkg.repository.url ? '\n*  @repository ' + pkg.repository.url : 'https://github.com/tinymce-plugin' + pkg.name.replace(/\@tinymce-plugin/, '')}
`;
};
exports.setBuildBanner = setBuildBanner;
//# sourceMappingURL=Banner.js.map