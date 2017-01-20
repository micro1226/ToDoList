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
    todoList: [
      { sid: 1, text: '第1条备忘录', isSelected: false },
      { sid: 2, text: '第2条备忘录', isSelected: false },
      { sid: 3, text: '第3条备忘录', isSelected: false },
      { sid: 4, text: '第4条备忘录', isSelected: false }],
    finishedList: [
      { sid: 5, text: '第5条备忘录', isSelected: false },
      { sid: 6, text: '第6条备忘录', isSelected: false },
      { sid: 7, text: '第7条备忘录', isSelected: false },
      { sid: 8, text: '第8条备忘录', isSelected: false }
    ]
  },
  //事件处理函数
  addNewDemo: function () {
    const nextIndex = this.data.todoList.length + 1
    this.data.todoList = this.data.todoList.concat([{ sid: nextIndex, text: this.data.newMsg }])
    this.setData({
      todoList: this.data.todoList,
      focus: false,
      inputText: ''
    })
  },
  deleteDemo: function (e) {
    const deleteId = e.currentTarget.id - 1
    this.data.todoList.splice(deleteId, 1)
    const length = this.data.todoList.length
    for (let i = deleteId; i < length; i++) {
      this.data.todoList[i].sid -= 1
    }
    this.setData({
      todoList: this.data.todoList
    })
  },
  inputNewMsg: function (e) {
    var text = e.detail.value
    this.setData({
      newMsg: text
    })
  },
  cilckCircle: function (e) {
    var index = e.currentTarget.id - 1
    this.data.todoList[index].isSelected = !this.data.todoList[index].isSelected
    this.setData({
      todoList: this.data.todoList
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
  }
})
