<template>
  <div>
    <div>
      <el-form ref="form" :model="form">
        <el-row>
          <el-col :span="20" :push="2" id="control">
            <el-row :gutter="40">
              <el-col :span="6" :push="2">
                <el-form-item label="A类线程数量：">
                  <el-input-number v-model="form.numA" :min="1" :max="20" :disabled="!visibles.startBtn"></el-input-number>
                </el-form-item>
                <el-form-item label="缓存A的大小：">
                  <el-input-number v-model="form.sizeA" :min="1" :max="20" :disabled="!visibles.startBtn"></el-input-number>
                </el-form-item>
                <el-form-item label="缓存A的初始数据：">
                  <el-input v-model="form.initBuffer1" placeholder='请用 ","隔开' :disabled="!visibles.startBtn"></el-input>
                </el-form-item>
                <el-form-item>
                  <span class="demonstration">A的速度(10ms/步)</span>
                  <el-slider
                    v-model="form.waitTimeA"
                    :step="10"
                    show-stops
                    :disabled="!visibles.startBtn"
                    :min="10"
                    :max="100">
                  </el-slider>
                  <!--<el-input v-model="form.waitTimeA" :disabled="!visibles.startBtn"></el-input>-->
                </el-form-item>
              </el-col>
              <el-col :span="6" :push="2">
                <el-form-item label="B类线程数量：">
                  <el-input-number v-model="form.numB" :min="1" :max="20" :disabled="!visibles.startBtn"></el-input-number>
                </el-form-item>
                <el-form-item label="缓存B的大小：">
                  <el-input-number v-model="form.sizeB" :min="1" :max="20" :disabled="!visibles.startBtn"></el-input-number>
                </el-form-item>
                <el-form-item label="缓存B的初始数据：">
                  <el-input v-model="form.initBuffer2" placeholder='请用 ","隔开' :disabled="!visibles.startBtn"></el-input>
                </el-form-item>
                <el-form-item>
                  <span class="demonstration">B的速度(10ms/步)</span>
                  <el-slider
                    v-model="form.waitTimeB"
                    :step="10"
                    :min="10"
                    show-stops
                    :disabled="!visibles.startBtn"
                    :max="100">
                  </el-slider>
                  <!--<el-input v-model="form.waitTimeB" :disabled="!visibles.startBtn"></el-input>-->
                </el-form-item>
              </el-col>
              <el-col :span="6" :push="2">
                <!--<el-button-group>--><br/><br/>
                <el-button @click="startPro" v-if="visibles.startBtn">开始执行</el-button>
                <br/><br/>
                <el-button v-if="visibles.shortStopBtn" @click="switchStop">{{shortStopBtnMsg}}</el-button>
                <br/><br/>
                <el-button v-if="visibles.overBtn" @click="over">结束</el-button>
                <!--</el-button-group>-->
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br/>
    <div id="show">
      <el-row>
        <el-col :span="14" :push="2" class="col-me" v-if="visibles.part2Show">
          <!--这里是展示I区-->
          <br>
          <el-row>
            <el-col :span="2" :push="2">
              BufferA
            </el-col>
            <el-col :span="16" :push="2" class="col-me">
              <el-button v-for="dataA in bufferAList" :key="dataA" type="danger" size="mini" round>{{dataA}}</el-button>
            </el-col>
          </el-row>
          <br><br><br>
          <el-row style="text-align: center">
            <el-col :span="8" :push="1" class="col-me">
              <el-row>
                <h4>A类线程</h4>
                <div v-for="aThread in aThreads" :key="aThread.id">
                  <el-button type="success" size="mini" :disabled="aThread.disabledAttr">{{aThread.threadName}}</el-button>
                  <!--<div v-if="aThread.takeData>0">-->
                  <i v-if="aThread.takeData>0" class="el-icon-right"></i>
                  <el-button v-if="aThread.takeData>0" type="danger" size="mini" round>{{aThread.takeData}}</el-button>
                  <!--</div>-->
                  <br><br>
                </div>
              </el-row>
            </el-col>
            <el-col :span="8" :push="7" class="col-me">
              <el-row>
                <h4>B类线程</h4>
                <div v-for="bThread in bThreads" :key="bThread.id">
                  <el-button type="primary" size="mini" :disabled="bThread.disabledAttr">{{bThread.threadName}}</el-button>
                  <!--<div v-if="bThread.takeData>0">-->
                  <i v-if="bThread.takeData>0" class="el-icon-right"></i>
                  <el-button v-if="bThread.takeData>0" type="warning" size="mini" round>{{bThread.takeData}}</el-button>
                  <!--</div>-->
                  <br><br>
                </div>
              </el-row>
            </el-col>
          </el-row>
          <br><br><br>
          <el-row>
            <el-col :span="2" :push="2">
              BufferB
            </el-col>
            <el-col :span="16" :push="2" class="col-me">
              <el-button v-for="dataB in bufferBList" :key="dataB" type="warning" size="mini" round>{{dataB}}</el-button>
            </el-col>
            <br><br><br>
          </el-row>
          <el-row>
            <el-col :span="2" :push="1">
              fullA
            </el-col>
            <el-col :span="16" :push="2" class="col-me">
              <!--<div v-for="thread in fullAList" :key="thread.id">-->
                <el-button v-for="thread in fullAList" :key="thread.id" type="primary" size="mini" round>{{thread.threadName}}</el-button>
              <!--</div>-->
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="2" :push="1">
              emptyA
            </el-col>
            <el-col :span="16" :push="2" class="col-me">
              <!--<div v-for="thread in emptyAList" :key="thread.id">-->
                <el-button v-for="thread in emptyAList" :key="thread.id" type="info" size="mini" round>{{thread.threadName}}</el-button>
              <!--</div>-->
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="2" :push="1">
              fullB
            </el-col>
            <el-col :span="16" :push="2" class="col-me">
              <!--<div v-for="thread in fullBList" :key="thread.id">-->
                <el-button v-for="thread in fullBList" :key="thread.id" type="primary" size="mini" round>{{thread.threadName}}</el-button>
              <!--</div>-->
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="2" :push="1">
              emptyB
            </el-col>
            <el-col :span="16" :push="2" class="col-me">
              <!--<div v-for="thread in emptyBList" :key="thread.id">-->
                <el-button v-for="thread in emptyBList" :key="thread.id" type="primary" size="mini" round>{{thread.threadName}}</el-button>
              <!--</div>-->
            </el-col>
            <br><br><br>
          </el-row>
        </el-col>
        <el-col :span="6" :push="3" class="col-me" v-if="visibles.part3Show">
          <!--这里是展示II区--><br>
          <el-row>
            <el-col :span="20" :push="2">
              <el-row>
                <el-col :span="16" :push="8">
                  <el-row>
                    A缓冲区：{{bufferAList.length}}/{{form.sizeA}}
                  </el-row>
                  <el-row>
                    B缓冲区：{{bufferBList.length}}/{{form.sizeB}}
                  </el-row>
                  <el-row>
                    运行时间：{{runTime}} s
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <h4 style="margin-left: 20%">A类操作</h4>
                  <el-input
                    type="textarea"
                    :rows="20"
                    v-model="aTextArea"
                    :disabled="true">
                  </el-input>
                </el-col>
                <el-col :span="11" :push="2">
                  <h4 style="margin-left: 20%">B类操作</h4>
                  <el-input
                    type="textarea"
                    :rows="20"
                    v-model="bTextArea"
                    :disabled="true">
                  </el-input>
                </el-col>
              </el-row>
              <br>
              <el-row>
                BufferA的平均数量：{{averBufferA}}<br>
                BufferB的平均数量：{{averBufferB}}
              </el-row>
              <br><br>
              <el-row>
                <el-button type="primary" @click="exportData">数据导出</el-button>
              </el-row>
              <br><br>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div v-if="visibles.part4Show">
      <el-row>
        <el-col :span="20" :push="2" id="charts">
          <!--<el-col :span="6" :push="2" class="col-me">-->
            <el-row>
              <el-col :span="18" :push="3">
                <br><br>
                <el-row class="col-me">
                  <h4 style="text-align: center">缓存区数量统计图</h4>
                  <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
                </el-row>
                <el-row class="col-me">
                  <h4 style="text-align: center">等待队列数量统计图</h4>
                  <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
                </el-row>
                <el-row class="col-me">
                  <h4 style="text-align: center">A/B类指令数量对比图</h4>
                  <div id="myChart3" :style="{width: '100%', height: '300px'}"></div>
                </el-row>
                <!--<el-row class="col-me">-->
                  <!--<div id="myChart4" :style="{width: '100%', height: '300px'}"></div>-->
                <!--</el-row>-->
                <br><br>
              </el-col>
            </el-row>
          <!--</el-col>-->
        </el-col>
      </el-row>
    </div>
    <br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'index',
  data () {
    return {
      form: {
        numA: 0,
        sizeA: 0,
        initBuffer1: '',
        waitTimeA: 0,
        numB: 0,
        sizeB: 0,
        initBuffer2: '',
        waitTimeB: 0
      },
      optA: [],
      optB: [],
      instructions: [],
      visibles: {
        startBtn: true,
        shortStopBtn: false,
        overBtn: false,
        shortStopBtnUse: false,
        part2Show: false,
        part3Show: false,
        part4Show: false
      },
      shortStopBtnMsg: '暂停',
      aThreads: [],
      bThreads: [],
      fullAList: [],
      emptyAList: [],
      fullBList: [],
      emptyBList: [],
      threadMap: {},
      bufferAList: [],
      bufferBList: [],
      stopFlag: false,
      currentIndex: -1,
      intervalClock: null,
      runTime: 0,
      accountBufferA: 0,
      accountBufferB: 0,
      account: {
        instructionAAccount: 0, // A指令到来的条数
        instructionBAccount: 0, // B指令到来的条数
        accountFullA: 0, // fullA 的总数
        accountEmptyA: 0, // emptyA 的总数
        accountFullB: 0,
        accountEmptyB: 0,
        listBufferA: [], // BufferA 的状态折现
        listBufferB: [],
        listFullA: [],
        listFullB: [],
        listEmptyA: [],
        listEmptyB: [],
        timeList: [],
        listInstructionA: [],
        listInstructionB: []
      },
      chartsList: {
        charts1: null,
        charts2: null,
        charts3: null,
        charts4: null
      }
    }
  },
  methods: {
    startPro () {
      this.visibles.startBtn = false
      this.visibles.overBtn = true
      this.visibles.shortStopBtn = true
      this.visibles.part2Show = true
      this.visibles.part3Show = true
      this.visibles.part4Show = true
      let that = this
      this.optA = []
      this.optB = []
      if (this.form.initBuffer1 === '') {
        this.form.initBuffer1 = '-1'
      }
      if (this.form.initBuffer2 === '') {
        this.form.initBuffer2 = '-1'
      }
      this.$axios.get('/startProject', {params: this.form}).then(response => {
        this.$message('开始执行过程')
        this.accountBufferA = 0
        this.accountBufferB = 0
        this.aThreads = response.data['A']
        this.bThreads = response.data['B']
        this.threadMap = response.data['threadMap']
        this.bufferAList = this.form.initBuffer1 === '-1' ? [] : this.form.initBuffer1.split(',')
        this.bufferBList = this.form.initBuffer2 === '-1' ? [] : this.form.initBuffer2.split(',')
        this.form.initBuffer1 = this.form.initBuffer1 === '-1' ? '' : this.form.initBuffer1
        this.form.initBuffer2 = this.form.initBuffer2 === '-1' ? '' : this.form.initBuffer2
        this.initCharts()
      })
      setTimeout(function () {
        that.mission()
      }, 1000) // 启动任务
      setTimeout(function () {
        that.$axios.get('/over')
      }, 3000) // 延迟关闭接口访问
    },
    over () {
      clearInterval(this.intervalClock)
      this.$message('已结束本次运行')
      this.visibles.startBtn = true
      this.visibles.shortStopBtn = false
      this.visibles.overBtn = false
      this.visibles.shortStopBtnUse = false
      this.shortStopBtnMsg = '暂停'
      // this.stopFlag = false
      this.bufferAList = []
      this.bufferBList = []
      this.aThreads = []
      this.bThreads = []
      this.fullAList = []
      this.emptyAList = []
      this.fullBList = []
      this.emptyBList = []
      this.currentIndex = -1
      // this.visibles.part2Show = false
      this.account.listEmptyB = []
      this.account.listFullB = []
      this.account.listEmptyA = []
      this.account.listFullA = []
      this.account.timeList = []
      this.account.listInstructionA = []
      this.account.listInstructionB = []
      this.account.listBufferB = []
      this.account.listBufferA = []
      this.account.instructionBAccount = 0
      this.account.instructionAAccount = 0
      // this.form.initBuffer1 = this.form.initBuffer1 === '-1' ? '' : this.form.initBuffer1
      // this.form.initBuffer2 = this.form.initBuffer2 === '-1' ? '' : this.form.initBuffer2
    },
    switchStop () {
      this.visibles.shortStopBtnUse = !this.visibles.shortStopBtnUse
      if (this.visibles.shortStopBtnUse === true) {
        this.shortStopBtnMsg = '继续'
        clearInterval(this.intervalClock)
        // this.stopFlag = true
      } else {
        this.shortStopBtnMsg = '暂停'
        this.intervalClock = setInterval(this.intervalMission, 1000)
      }
    },
    mission () {
      // while (this.visibles.overBtn === true) {
      //   while (this.stopFlag) {}
      //   this.currentIndex++
      //   if (this.currentIndex >= this.instructions.length) {
      //     let that = this
      //
      //     // await this.emptyInstructions()
      //   }
      // }
      let that = this
      $.ajax({
        type: 'GET',
        url: 'http://47.105.187.18:8090/api/getInstructions',
        async: false,
        success: function (response) {
          that.instructions = response
          that.intervalClock = setInterval(that.intervalMission, 1000)

          // that.instructions.forEach(ele => {
          //   try {
          //     // this.sleep(1000)
          //   } catch (e) {
          //     // console.log(e)
          //   }
          // })
        }
      })
    },
    intervalMission () {
      try {
        // while (this.shortStopBtnUse) {}
        this.account.timeList.push(this.runTime)
        this.currentIndex++
        this.runTime++
        this.accountBufferA += this.bufferAList.length
        this.accountBufferB += this.bufferBList.length
        this.account.listBufferA.push(this.bufferAList.length)
        this.account.listBufferB.push(this.bufferBList.length)
        let tid = this.instructions[this.currentIndex][0]
        let instruction = this.instructions[this.currentIndex][1]
        let index = this.threadMap[tid].index
        console.log('类别为：' + this.threadMap[tid].classify)
        if (this.threadMap[tid].classify === 'A') {
          this.account.instructionAAccount++
        } else {
          this.account.instructionBAccount++
        }
        this.account.listInstructionA.push(this.account.instructionAAccount)
        this.account.listInstructionB.push(this.account.instructionBAccount)
        // console.log(instruction)
        switch (instruction) {
          case 1:
            this.aThreads[index].disabledAttr = true
            this.fullAList.push(this.aThreads[index])
            this.optA.push(this.aThreads[index].threadName + ': 进入 fullA 队列')
            break
          case 2:
            this.aThreads[index].takeData = this.bufferAList.shift()
            this.optA.push(this.aThreads[index].threadName + ': 获取到' + this.aThreads[index].takeData)
            break
          case 3:
            this.aThreads[index].disabledAttr = false
            this.deleteItem(this.aThreads[index].id, this.fullAList)
            this.optA.push(this.aThreads[index].threadName + ': 被唤醒(fullA)')
            break
          case 4:
            this.aThreads[index].disabledAttr = true
            this.emptyBList.push(this.aThreads[index])
            this.optA.push(this.aThreads[index].threadName + ': 进入 emptyB 队列')
            break
          case 5:
            this.bufferBList.push(this.aThreads[index].takeData)
            this.optA.push(this.aThreads[index].threadName + ': 将数据' + this.aThreads[index].takeData + '存入 BufferB')
            this.aThreads[index].takeData = -1
            break
          case 6:
            this.aThreads[index].disabledAttr = false
            this.deleteItem(this.aThreads[index].id, this.emptyBList)
            this.optA.push(this.aThreads[index].threadName + ': 被唤醒(emptyB)')
            break
          case 7:
            this.fullBList.push(this.bThreads[index])
            this.bThreads[index].disabledAttr = true
            this.optB.push(this.bThreads[index].threadName + ': 进入 fullB 队列')
            break
          case 8:
            this.bThreads[index].takeData = this.bufferBList.shift()
            this.optB.push(this.bThreads[index].threadName + ': 获取到' + this.bThreads[index].takeData)
            break
          case 9:
            this.deleteItem(this.bThreads[index].id, this.fullBList)
            this.bThreads[index].disabledAttr = false
            this.optB.push(this.bThreads[index].threadName + ': 被唤醒(fullB)')
            break
          case 10:
            this.emptyAList.push(this.bThreads[index])
            this.bThreads[index].disabledAttr = true
            this.optB.push(this.bThreads[index].threadName + ': 进入 emptyA 队列')
            break
          case 11:
            this.bufferAList.push(this.bThreads[index].takeData)
            this.optB.push(this.bThreads[index].threadName + ': 将数据' + this.bThreads[index].takeData + '存入 BufferA')
            this.bThreads[index].takeData = -1
            break
          case 12:
            this.deleteItem(this.bThreads[index].id, this.emptyAList)
            this.bThreads[index].disabledAttr = false
            this.optB.push(this.bThreads[index].threadName + ': 被唤醒(emptyA)')
            break
          default:
            break
        }

        this.account.listFullA.push(this.fullAList.length)
        this.account.listEmptyA.push(this.emptyAList.length)
        this.account.listFullB.push(this.fullBList.length)
        this.account.listEmptyB.push(this.emptyBList.length)

        this.chartsList.charts1.setOption(this.char1Options)
        this.chartsList.charts2.setOption(this.char2Options)
        this.chartsList.charts3.setOption(this.char3Options)
        // this.chartsList.charts4.setOption(this.char1Options)
      } catch (e) {
        clearInterval(this.intervalClock)
      }
    },
    initCharts () {
      this.chartsList.charts1 = this.$echarts.init(document.getElementById('myChart1'))
      this.chartsList.charts2 = this.$echarts.init(document.getElementById('myChart2'))
      this.chartsList.charts3 = this.$echarts.init(document.getElementById('myChart3'))
      // this.chartsList.charts4 = this.$echarts.init(document.getElementById('myChart4'))
    },
    deleteItem (item, list) {
      // 先遍历list里面的每一个元素，对比item与每个元素的id是否相等，再利用splice的方法删除
      for (var key in list) {
        if (list[key].id === item) {
          list.splice(key, 1)
          break
        }
      }
    },
    baoliu (params) {
      let newpar = parseFloat(params)
      let reg = /^[0-9]+.?[0-9]*$/
      if (reg.test(newpar)) {
        return newpar.toFixed(3)
      }
    },
    exportData () {
      this.download('data.txt', this.aTextArea + '\n\n' + this.bTextArea)
    },
    download (filename, content, contentType) {
      if (!contentType) contentType = 'application/octet-stream'
      let a = document.createElement('a')
      let blob = new Blob([content], { 'type': contentType })
      a.href = window.URL.createObjectURL(blob)
      a.download = filename
      a.click()
    }
  },
  computed: {
    aTextArea: function () {
      return this.optA.join('\n')
    },
    bTextArea: function () {
      return this.optB.join('\n')
    },
    averBufferA: function () {
      return this.baoliu(this.accountBufferA / this.runTime)
    },
    averBufferB: function () {
      return this.baoliu(this.accountBufferB / this.runTime)
    },
    char1Options: function () {
      var that = this
      return {
        // title: {
        //   text: '缓存区数量统计图',
        //   // subtext: '纯属虚构',
        //   left: 'center'
        // },
        tooltip: { // 设置tip提示
          trigger: 'axis'
        },
        legend: {
          data: ['BufferA', 'BufferB']
        },
        xAxis: {
          type: 'category',
          data: that.account.timeList,
          name: '运行时间',
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '数量',
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        label: {},
        series: [{
          name: 'BufferA',
          data: that.account.listBufferA,
          type: 'line'
        }, {
          name: 'BufferB',
          data: that.account.listBufferB,
          type: 'line'
        }]
      }
    },
    char2Options: function () {
      var that = this
      return {
        // title: {
        //   text: '等待队列数量统计图',
        //   // subtext: '纯属虚构',
        //   left: 'center'
        // },
        tooltip: { // 设置tip提示
          trigger: 'axis'
        },
        legend: {
          data: ['fullA', 'emptyA', 'fullB', 'emptyB']
        },
        xAxis: {
          type: 'category',
          data: that.account.timeList,
          name: '运行时间',
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '数量',
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        label: {},
        series: [{
          name: 'fullA',
          data: that.account.listFullA,
          type: 'line'
        }, {
          name: 'emptyA',
          data: that.account.listEmptyA,
          type: 'line'
        }, {
          name: 'fullB',
          data: that.account.listFullB,
          type: 'line'
        }, {
          name: 'emptyB',
          data: that.account.listEmptyB,
          type: 'line'
        }]
      }
    },
    char3Options: function () {
      var that = this
      return {
        // title: {
        //   text: '缓存区数量统计图',
        //   // subtext: '纯属虚构',
        //   left: 'center'
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie', // 设置图表类型为饼图
            radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [ // 数据数组，name 为数据项名称，value 为数据项值
              {value: that.account.instructionAAccount, name: 'A类指令数量'},
              {value: that.account.instructionBAccount, name: 'B类指令数量'}
            ]
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #control {
    margin-top: 3%;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .col-me {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  #charts{
    margin-top: 3%;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
