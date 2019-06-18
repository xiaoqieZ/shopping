//logs.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    saomanneirong:'',
    address: {
      name: '',
      phone: '',
      address: ''
    },
  },
      
// 详细地址
  saveContent: function (e) {
    let addr = 'address.' + e.target.dataset.name;
    this.setData({
      [addr]: e.detail.value
    })
  },
// 地图
  dingweiX: function (e) {
    let addr = 'address.' + e.target.dataset.name;
    this.setData({
      [addr]: e.detail.value
    })
  },

  goLocation: function (e) {
    wx.chooseLocation({
      success: res => {
        app.globalAddress.address = res.address
        console.log(res)

        this.setData({
          address: app.globalAddress
        })

      },

      fail: errmsg => {
        wx.getSetting({
          success: res => {
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '提示',
                content: '定位需要打开位置信息',
                success: ress => {
                  if (ress.confirm) {
                    wx.openSetting({
                      success: resss => {
                        // console.log(resss)
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: app.globalAddress
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    danmuList: [
      {
        text: '天下文章一大抄',
        color: '#ff0000',
        time: 1
      },
      {
        text: '哈哈哈，吓唬谁呢，鲁迅的文章都是抄的',
        color: '#ff00ff',
        time: 3
      }]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
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
    this.onLoad();
    this.onReady()
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