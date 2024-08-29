import { resolve } from 'path';
import { loadEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import DefineOptions from 'unplugin-vue-define-options/vite';
// import postcsspxtoviewport from 'postcss-px-to-viewport';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
// import stylePxToVw from './stylePxToVw';
import type { UserConfig, ConfigEnv } from 'vite';

const CWD = process.cwd();

export default ({ mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_DROP_CONSOLE } = loadEnv(mode, CWD);

  return {
    base: './',
    esbuild: {},

    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    plugins: [
      // stylePxToVw(),
      vue(),
      DefineOptions(), // https://github.com/sxzz/unplugin-vue-define-options
      vueJsx({}),
      Components({
        resolvers: [VantResolver()],
      }),
      checker({
        typescript: true,
        // vueTsc: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"', // for example, lint .ts & .tsx
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
        },
        scss: {},
      },
      // TODO 构建包含@charset问题 https://github.com/vitejs/vite/issues/5833
      postcss: {
        plugins: [
          // postcsspxtoviewport({
          //   unitToConvert: 'px', // 要转化的单位
          //   viewportWidth: 1920, // UI设计稿的宽度
          //   unitPrecision: 6, // 转换后的精度，即小数点位数
          //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          //   selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          //   replace: true, // 是否转换后直接更换属性值
          //   landscape: false, // 是否处理横屏情况
          //   exclude: [/node_modules\/vant/],
          // }),
        ],
      },
    },
    server: {
      port: 8080,
      hmr: true,
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: Object.is(VITE_DROP_CONSOLE, 'true'),
        },
      },
    },
  };
};
