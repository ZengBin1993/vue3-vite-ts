// 默认参数
let defaultsProp = {
  unitToConvert: 'px',
  viewportWidth: 750,
  unitPrecision: 6,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  minPixelValue: 1,
};
function toFixed(number, precision) {
  let multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function ($0, $1) {
    let show$0 = $0;
    show$0.split('px');
    if (!$1) return;
    let pixels = parseFloat($1);
    if (pixels <= minPixelValue) return;
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit;
  };
}
const templateReg = /<template>([\s\S]+)<\/template>/gi;
const pxGlobalReg = /(\d+)px/gi;

// 生成插件的工厂方法
const pluginGenerator = (customOptions = defaultsProp) => {
  // 返回插件
  return {
    // 插件名称
    name: 'postcss-px-to-viewport',

    // transform 钩子
    async transform(code, id) {
      if (/.vue$/.test(id)) {
        let _source = '';
        if (templateReg.test(code)) {
          _source = code.match(templateReg)[0];
        }
        if (pxGlobalReg.test(_source)) {
          let $source = _source.replace(pxGlobalReg, createPxReplace(customOptions.viewportWidth, customOptions.minPixelValue, customOptions.unitPrecision, customOptions.viewportUnit));

          code = code.replace(_source, $source);
        }
      }
      return { code };
    },
  };
};

export default pluginGenerator;
