//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    focus: false,
    newMsg: '',
    inputText: '',
    motto: 'Hello World',
    userInfo: {},
    allList: [
      { sid: 1, text: '第1条备忘录', isFinished: false },
      { sid: 2, text: '第2条备忘录', isFinished: false },
      { sid: 3, text: '第3条备忘录', isFinished: false },
      { sid: 4, text: '第4条备忘录', isFinished: false },
      { sid: 5, text: '第5条备忘录', isFinished: true },
      { sid: 6, text: '第6条备忘录', isFinished: true },
      { sid: 7, text: '第7条备忘录', isFinished: true },
      { sid: 8, text: '第8条备忘录', isFinished: true }],
    todoList: [],
    finishedList: []
  },
  //数据处理函数
  refresh: function() {
    var todoList = []
    var finishedList = []
    for (let i = 0; i < this.data.allList.length; ++i) {
      var item = this.data.allList[i]
      console.log("kdhkahskdj")
      console.log(this.data.allList)
      console.log(item)
      if (!item.isFinished) {
        todoList.push(item)
      } else {
        finishedList.push(item)
      }
    }
    this.setData({
      todoList: todoList,
      finishedList: finishedList
    })
  },
  //事件处理函数
  cilckCircle: function (e) {
    console.log('kdhkahskdj')
    const index = e.currentTarget.id - 1
    this.data.allList[index].isFinished =  !this.data.allList[index].isFinished
    this.setData({
      allList: this.data.allList
    })
    this.refresh()
  },
  addNewDemo: function () {
    const nextIndex = this.data.allList.length + 1
    this.data.allList = this.data.allList.concat([{ sid: nextIndex, text: this.data.newMsg, isFinished: false }])
    this.setData({
      allList: this.data.allList,
      inputText: ''
    })
    this.refresh()
  },
  deleteDemo: function (e) {
    const deleteId = e.currentTarget.id - 1
    this.data.allList.splice(deleteId, 1)
    const length = this.data.allList.length
    for (let i = deleteId; i < length; i++) {
      this.data.allList[i].sid -= 1
    }
    this.setData({
      allList: this.data.allList
    })
    this.refresh()
  },
  inputNewMsg: function (e) {
    var text = e.detail.value
    this.setData({
      newMsg: text
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    this.refresh()
  }
})