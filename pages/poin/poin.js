Page({

  /**
   * 页面的初始数据
   */
  data: {
    videocurren:[],
    videoothers:[],
    commets:null,
  },
  getCurrenVideo(videoId){
    let that=this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videoDetail?id='+videoId,
      success(res){
        console.log(res)
        if(res.data.code===0){
          that.setData({
            videocurren: res.data.data.videoInfo
          })
        }
      }
    })
  },
  getOtherlist(videoId){
    let that=this;
     wx.request({
       url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id='+videoId,
       success(res){
        //  console.log(res)
         if(res.data.code===0){
           that.setData({
             videoothers: res.data.data.othersList
           })
         }
       }
     }) 
  },
  getComment(videoId){
    let that=this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=' + videoId,
      success(res){
        // console.log(res)
        if(res.data.code===0){
          that.setData({
            commets: res.data.data.commentData
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let videoId = options.id;
    this.getCurrenVideo(videoId);
    this.getOtherlist(videoId);
    this.getComment(videoId);
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
    this.getCurrenVideo();
    this.getOtherlist();
    this.getComment();
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