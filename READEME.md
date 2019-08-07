### 项目介绍
- 本项目为基于`webpack4.x`搭建的商场平台，主要包括后台管理平台和前端展示界面。
### 项目技术栈
- 数据库相关
  - mysql
- 后端逻辑实现
  - eggjs
- 前台逻辑实现
  - react && redux && react-router && axios && less && antd
### 项目运行
```
git clone http://git.luckincoffee.com/tech-train/tt5-mall_system-yifeng.tao.git

cd mall_system

npm install

npm run bulid

npm run dev:server  

```
### 项目可执行命令
```javascript
"npm run dev:client"  // 监听文件改变，并自动打包
"npm run dev:server"  // 启动后端逻辑
"npm run bulid"       // 打包项目
"npm run stop"        // 杀死egg进程
```
### 项目目录树
├─app
│  │─router.js
│  ├─controller
│  ├─middleware
│  ├─public
│  └─service
├─client
│  ├─public
│  └─src
│      ├─common
│      ├─manage-system
│      └─shop-system
├─config
│
└─database
│  package-lock.json
│  package.json
│  READEME.md
│  webpack.config.js
│  yarn.lock

### 功能一览
- 项目按路由模块加载
- 用户的登录、登出、注册以及验证
- 后台管理平台
  - 会员管理
  - 商品管理
  - 订单管理
- 商城平台
  - 商品列表展示
  - 商品详情信息展示
  - 购物车
  - 个人中心（个人已购买商品、购买时间、会员等级、个人信息修改）
  - 查询商品
