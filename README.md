## 配置别名

    - webpack.config.js => alias:paths.appSrc
    - tsconfig.json => compilerOptions:{
        "baseUrl": ".",
        "paths": {
        "@/*":["./src/*"]
        }
    }
## 配置全局 .scss

    {
        loader:'sass-resources-loader',
        options: {
            resources:paths.appSrc+'/assets/scss/base.scss'
        }
    }
## rem 配置

## yarn 
 - 查询当前镜像
 - yarn config get registry

 - 设置为淘宝镜像
 - yarn config set registry http://registry.npm.taobao.org/

 - 设置回默认的官方镜像
 - yarn config set registry https://registry.yarnpkg.com

 - 设置成功都有类似下面的输出
 - yarn config v1.16.0
   success Set "registry" to "http://registry.npm.taobao.org/".
   Done in 0.05s.