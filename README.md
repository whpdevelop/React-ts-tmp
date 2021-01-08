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

### git 常用命令

 - 合并单独文件
 - git checkout --patch <分支> 文件
 - git diff branch1 branch2 --stat   //显示出所有有差异的文件列表
 - git diff branch1 branch2 文件名(带路径)   //显示指定文件的详细差异
 - git diff branch1 branch2      //显示出所有有差异的文件的详细差异
 - git checkout -b 本地分支名x origin/远程分支名x


 ### cmd 常用命令
  - lsof -i:3000
  - kill pid  