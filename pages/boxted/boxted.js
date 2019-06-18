Page({

  /**
   * 页面的初始数据
   */
  data: {
    plaplaysvideoys:[],
    videoplay:0,
    videosList:[
      "介绍","评论"
    ]
  },
  getvideos(){
    let that=this
    wx.request({
      url: 'https://api.maplegg.com/v1/videos?page=1',
      success:res=>{
        console.log(res)
        if(res.data.code===200){
        that.setData({
         playsvideo:res.data.body
      })
        }
      }
    })
  },
  videotap(e) {
    this.setData({
      videoplay: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let videoid = options.id
    this.getvideos();
    this.setData({
      play: JSON.parse(decodeURIComponent(options.play))
    })
  },
  
  introduce(e){
    this.setData({
      videoplay: e.detail.current
    })
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