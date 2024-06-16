const fs = require('fs');
const path = require('path');

const config = {
  projectName: 'taro-vant',
  date: '2022-01-01',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
		375: 2 / 1
  },
  sourceRoot: './src',
  outputRoot: 'dist',
  plugins: [],
  sass: {
    resource: [
    ]
  },
  defineConstants: {
   
  },
  alias: {
		'@': path.resolve(__dirname, '../', 'src')
	},
  copy: {
    patterns: [],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
		miniCssExtractPluginOption: {
			ignoreOrder: true
		}
  }
}

module.exports = function (merge) {
	if (process.env.APP_ENV === 'dev') {
    const localDevConfigPath = path.resolve(__dirname, 'local.js')

    if (fs.existsSync(localDevConfigPath)) {
      return merge({}, config, require(localDevConfigPath))
    }

    return merge({}, config, require('./dev'))
  }

  if (process.env.APP_ENV === 'test') {
    return merge({}, config, require('./test'))
  }

  if (process.env.APP_ENV === 'prod') {
    return merge({}, config, require('./prod'))
  }

  return merge({}, config, require('./dev'))
}
