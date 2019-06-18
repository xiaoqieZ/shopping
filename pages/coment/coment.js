const tool = require('../../utils/cal.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:100,
    catenamelist:{},
    business:[
      '菜单',
      '评价',
      '商家'
    ],
    businessed:0,
    showStatus:false,
    menused:0,
    priceZ:0,
    yuandian:0,
    oddList:0,
    goods:{},
  },
  // dbusiness(e){
  //   this.setData({
  //     businessed:e.target.dataset.index
  //   })
  // },

  // 商品数据
  getcatename(){
    let that=this
    wx.request({
      url: 'https://api.maplegg.com/v1/goods',
      success:(res)=>{
        console.log(res)
        if(res.data.code===200){
          that.setData({
            catenamelist: res.data.body.category
        })
        }
        let arr = [];
      }
    })
  },
  // 店家头像
  onclikL(){
    wx.previewImage({
      current:"current",  // 当前显示图片的http链接
      urls: ["http://www.channelcc.cc/images/goods/g (43).jpg"]// 需要预览的图片http链接列表
    })
  },
  // 商品图片
  goodsImage(e){
    wx.request({
      url: 'https://api.maplegg.com/v1/goods/'+e.currentTarget.dataset.img,
      success:res=>{
        wx.previewImage({
          current: res.data.body.gimage,  // 当前显示图片的http链接
          urls: [res.data.body.gimage]// 需要预览的图片http链接列表
        })
      }
    })
  },
  // 轮播切换按钮
  manualSwiper(e) {
    this.setData({
      businessed: e.target.dataset.index
    })
  },
  // 手动滑动切换
  valuateswipere(e){
    this.setData({
      businessed: e.detail.current,
      hideBottom: e.detail.current>0?true:false
    })

  },
  // 菜单切换内容
  menus(e){
    this.setData({
      menused: e.target.dataset.menuplay
    })
  },
  // 提交按钮提示框
  button(e){
  if (this.data.yuandian == 0) {
      wx.showToast({
        title: '你还没选购商品哦！',
        icon: 'none',
        image: "../../images/02.jpg",
        duration: 2000
      })
    }else {
    wx.showToast({
      title: '加入成功',
      icon: 'none',
      image: "../../images/02.jpg",
      duration: 2000
    })
    }
  },


  // 添加商品
  buttonTj(e){
    let gid = e.currentTarget.dataset.gid
    let obj = {
      gprice: e.currentTarget.dataset.gprice,
      total: this.data.goods[gid] ? this.data.goods[gid]['total']+=1 : 1
    }
    let price = this.data.priceZ
    this.setData({
      ['goods.'+gid]: obj,
      priceZ: tool.calculate.cPlus(price , tool.calculate.cMul(obj.gprice, 1)),
      yuandian:this.data.yuandian +=1
    })
    // console.log(this.data.goods)
  },



  // 减号
  jianhaoA(e){
    let peromes = e.currentTarget.dataset.peromes
    let obj = {
      pdd: e.currentTarget.dataset.pdd,
      total: this.data.goods[peromes] ? this.data.goods[peromes]['total'] -= 1 : 1
    }
    let price = this.data.priceZ
    this.setData({
      ['goods.' + peromes]: obj,
      priceZ: tool.calculate.cSub(price, tool.calculate.cMul(obj.pdd, 1)),
      yuandian: this.data.yuandian -= 1
    })
  },

  /**
   * 钩子函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcatename()
    // let commetgoods = options.id;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(50);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(50);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})