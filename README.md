# Vue-supermall

<h1 align="center">Welcome to Vue-supermall👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/node-v10.15.3-green" />
  <img src="https://img.shields.io/badge/npm-6.14.8-yellowgreen" />
  <img src="https://img.shields.io/badge/vue-^2.6.11-greenyellow" />
  <img src="https://img.shields.io/badge/vueCli-4.5.0-yellow" />
</p>

## 🚀 如何运行

```
# 克隆
git clone https://github.com/yxiuzhu/mushroom.git
```

```
# 打开项目目录
cd mushroom
```

```
# 安装依赖
npm install
```

```
# 开启本地服务运行项目
npm run serve
```

## 项目演示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210406162955536.gif)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210406163545971.gif)

## 项目页面及功能

- Home商城首页
- Cart购物车详情页
- Detail商品详情页

## 🏠Home商城首页

- 利用`axios`进行服务端通讯获取接口数据
- `Swiper`轮播图组件
- `TabControl` 标签吸顶
- `GoodsList` 商品列表通过`event bus`实现按需动态加载
- 利用`mixin`混入添加防抖函数`debounce`

## 💸Cart购物车详情页

- `NavBar`利用**具名插槽**实现三栏布局
- `Vuex`对购物车进行状态管理
- `CheckButton`商品全选按钮
- `Vue.js`组件复用

## 👗Detail商品详情页

- 封装第三方JS库`better-scroll`，处理商品详情滚动，实现详情页上下联动
- 封装工具函数`utils.js`进行时间格式化
- 封装`Toast`弹窗插件

## 实用的组件

> 通用组件包括如下
> 
> - `Scroll`移动端滚动组件
> - `Swiper`轮播图组件
> - `Toast`弹窗组件
> - 基于`axios`封装的服务端通讯组件
>
> 还有一些是为本项目量身订做的组件，与上面的通用组件都在 `src/components` 目录下

## CSS布局样式

> - 公共`base.css`–基础样式，变量设置、防止高度塌陷
> - 初始化`normalize.css`-初始化浏览器样式

## 项目优化

>- `vue-lazyload`实现商品图片懒加载
>- `FastClick`解决移动端点击的300ms的延迟
>- `debounce`防抖函数实现页面刷新
>- `keep-alive`避免页面反复重渲染导致的性能问题

## 作者

👤 **y_xiuzhu(杨秀竹)**

[项目github地址，期待你的星星🌟](https://github.com/yxiuzhu/supermall)


## 项目目录结构

supermall 
    ├─assets -- css资源及项目图片
    ├─common -- 工具类及通用的mixin代码
    ├─components -- 项目组件
    │  ├─common -- 项目通用组件
    │  └─content -- 项目业务组件     
    ├─network -- axios服务端通讯
    ├─router -- Vue Router
    ├─store -- Vuex 
    └─views -- 项目业务视图组件

## 项目总结

**`axios`进行服务端通讯**

* 利用`axios`封装服务端通讯的数据接口
* 接口数据获取

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407110931743.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`Swiper`轮播图组件**

* 组件轮播图的实现：`Swiper`、`SwiperItem`
* 轮播组件使用`HomeSwiper`、`DetailSwiper`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407142349161.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407142413344.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407142443509.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`TabControl` 标签吸顶**

* 引用`better-scroll`框架之后使`sticky`粘性定位失效
* 使用多一层`TabControl`标签的方式来实现标签吸顶效果
* 根据滚动位置决定标签是否吸顶

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407142938654.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407143120833.png)

 **`GoodsList` 商品列表通过`event bus`实现按需动态加载**

* 利用**事件总线**进行组件通讯，动态加载商品数据后触发`better-scroll`的`refresh`方法
* `Home`（监听事件总线事件）、`GoodsList`、`GoodsListItem`（利用事件总线通讯） 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407150311447.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407145427112.png)

**利用`mixin`混入添加防抖函数`debounce`**

* 将防抖函数封装进工具类`utils.js`
* 防止动态加载商品列表时，`refresh`方法调用次数过多

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407150909273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`NavBar`利用具名插槽实现三栏布局**

* 封装公共组件`NavBar`，利用**具名插槽**实现组件复用
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407151310460.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`Vuex`对购物车进行状态管理**

* 利用`Vuex`实现购物车商品列表的状态管理，如商品列表、商品属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407152037855.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407152250898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`CheckButton`商品全选按钮**

* `CheckButton`新添商品默认选中
* `CartBottomBar`监测是否全选

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407154712318.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407154859869.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407154913138.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**封装第三方JS库better-scroll，处理商品详情滚动，实现详情页上下联动**

* 利用插槽将`better-scroll`封装成`Scroll`组件
* `Scroll`组件监听到对应事件后将事件发送给父组件进行处理，例如上拉加载更多商品的实现，页面滚动的实时位置。
*  `Scroll`组件通用方法的封装：页面滚动动画、页面刷新、完成上拉加载更多、返回上次滚动的页面位置

**封装工具函数utils.js进行时间格式化**

* 正则的使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407161345715.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**封装`Toast`弹窗插件**

* 将`Toast`弹窗组件封装进`Vue`原型，便于组件复用
* 安装`Toast`插件，使用时仅需`this.$toast.show('message', 2000)`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407094509517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
