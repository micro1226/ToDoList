// pages/index/finished.js
var util = require('../../utils/util.js')

Page({
  data: {
    finishedList: []
  },
  //数据处理函数
  refresh: function () {
    this.setData({
      finishedList: wx.getStorageSync('finishedList')
    })
  },
  //事件处理函数
  deleteDemo: function (e) {
    util.deleteMemo(e.currentTarget.id - 1)
    this.refresh()
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  },
  cilckCircle: function (e) {
    util.changeMemoState(e.currentTarget.id - 1)
    this.refresh()
  },
  //生命周期
  onLoad: function (options) {
    this.refresh()
  }
})