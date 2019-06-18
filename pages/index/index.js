     //获取应用实例
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;


Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav:0,
    navlist:[],
    navswiper: [],
    videoslist:[],
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    scrollLeft:600
  },
  activeNav(e) {
    // console.log(123)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  getNavList(){
   let that=this
   wx.request({
    url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList',
    success: res=>{
      wx.stopPullDownRefresh()
      // console.log(res)
      if(res.data.code===0){
        that.setData({
          navlist:res.data.data.navList
        })
        this.setData({
          scrollLeft: this.data.scrollLeft
        })
        // console.log(that.navlist)
      }
    }, 
  })
},
getSwiper(){
  let that=this
    wx.request({
      url: 'https://api.maplegg.com/banner',
      success: function (res){
        wx.stopPullDownRefresh()
        // console.log(res)
        if(res.data.code===200){
          that.setData({
            navswiper:res.data.body
          })
          // console.log(that.navswiper)
        }
      },
    })
},
  lunbosuolve(e) {
    wx.previewImage({
      current:e.target.dataset.img , // 当前显示图片的http链接
      urls: this.data.navswiper// 需要预览的图片http链接列表
    })
  },
getVideosList(){
  let that=this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/VideosList',
      success: function (res){
        wx.stopPullDownRefresh()
        // console.log(res)
        if(res.data.code===0){
          that.setData({
            videoslist: res.data.data.videosList
          })
          // console.log(that.videoslist)
        }
      },
    })
},

// 滑动
  swiperPlay(e){
    this.setData({
      currentIndexNav: e.detail.current
    })
  },
// 直接定位
  // huoquweizhi() {
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success(res) {
  //       const latitude = res.latitude
  //       const longitude = res.longitude
  //       const speed = res.speed
  //       const accuracy = res.accuracy
  //       console.log(res)
  //     }
  //   })
  // },

// 用户定位授权
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        wx.stopPullDownRefresh()
        console.log(res)
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res);
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList();
    this.getSwiper();
    this.getVideosList();
    // this.huoquweizhi();
    // console.log(options)
    qqmapsdk = new QQMapWX({
      key: 'OWCBZ-GLO65-7E3IS-QFJBD-7FYIS-GGBXD' //这里自己的key秘钥进行填充
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let vm = this;
    vm.getUserLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 定位
    // let vm = this;
    // vm.getUserLocation();
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
    this.getUserLocation();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("没有更多了")
    wx.showToast({
      title: '底线了，我只提醒一遍欧',
      icon: 'waiting',
      image: '../../images/mark.png',
      duration: 2000
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})