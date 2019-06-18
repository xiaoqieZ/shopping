const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videosAv:[],
    comensList: "",
    isSearch: false
  },
  comensDel(e) {
    this.setData({
      comensList: ''
    })
  },
  // 获取内容
  searchList(e){
    this.setData({
      comensList: e.detail.value
    })
  },

  // 点击回车
  searchVideo(){
    // console.log("点击了")
  },
  // 那数据
  getVideos(){
    let that=this
    wx.request({
      url: 'https://api.maplegg.com/v1/videos?page=1',
        success:res=>{
          // console.log(res)
          if(res.data.code===200){
             that.setData({
               videosAv: res.data.body
             })
          }
        }
    })
  },
  playbas(e){
    let play = this.data.videosAv[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '/pages/boxted/boxted?play='+encodeURIComponent(JSON.stringify(play)),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideos()
    // console.log(options)
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
    this.getVideos()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})