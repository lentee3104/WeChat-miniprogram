// index.js
// 获取应用实例
const app = getApp()

Page({
  redirectToTest01: function(){
    wx.redirectTo({
      url: '/pages/test01/test01',
    })
  },

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  uploadImage: function(){
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function (res){
        //判断用户是否选择了文件
        if(res.tempFiles && res.tempFiles.length > 0){
          // 选择成功后，获取图片本地路径
          var imagePath = res.tempFiles[0].tempFilePath;
          // 根据图片路径创建一个canvas对象
          var ctx = res.createSelectorQuery('myCanvas');
          // 绘制上传的图片到canvas中
          ctx.drawImage(imagePath, 0, 0, 300, 300);
          // 对图片进行处理，比如添加滤镜
          ctx.filter = 'grayscale(100%)';
          // 将处理后的图片导出为本地临时文件
          ctx.draw(false, function() {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: function (res) {
                // 导出成功后，展示处理后的图片
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function() {
                    // 导出成功后，res.tempFilePath 即为临时文件的路径
                    console.log(res.tempFilePath);
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success'
                    })
                  },
                  fail: function() {
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              }
            });
          });
        }else{
          // 用户取消了选择文件的操作，不进行任何处理
          console.log('用户取消了选择文件的操作');
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  }
})