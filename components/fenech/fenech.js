Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  souList(){
    wx.navigateTo({
      url: '../../pages/comens/comens'
    })
  },
  // 下载按钮
  download(){
    wx.showToast({
      title: '暂不支持下载',
      // icon: 'waiting',
      image:'../../images/mark.png',
      duration: 2000
    })
  },
  // 视频按钮
  video(e){
    wx.scanCode({
      success:res=> {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
