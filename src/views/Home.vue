<template>
    <el-row>
        <!-- 左 -->
        <el-col :span="8" style="padding-right: 10px;">
            <!-- 用户信息展示 -->
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user.jpg" alt="">
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2023-3-5</span></p>
                    <p>上次登录地点：<span>深圳</span></p>
                </div>
            </el-card>

            <!-- 表格 -->
            <el-card style="margin-top: 20px; height: 460px;">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column v-for="(val, key, index) in tableLabel" :prop="key" :label="val" :key="index"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 右 -->
        <el-col :span="16" style="padding-left: 10px;">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>

            <el-card style="height: 280px;">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px;"></div>
            </el-card>

            <div class="graph">
                <el-card>
                    <!-- 柱状图 -->
                    <div ref="echarts2" style="height: 260px;"></div>
                </el-card>
                <el-card>
                    <!-- 饼状图 -->
                    <div ref="echarts3" style="height: 240px;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
    .user {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        img {
            margin-right: 40px;
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
        .userInfo {
            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }
            .access {
                color: #999;
            }
        }
    }
    .login-info {
        p {
            line-height: 28px;
            font-size: 14px;
            color: #999;
            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px 0px;
        .icon {
            width: 130px;
            height: 130px;
            font-size: 70px;
            text-align: center;
            line-height: 130px;
            color: white;
        }
        .detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;
            .price {
                font-size: 30px;
                margin-bottom: 10px;
            }
            .desc {
                font-size: 14px;
                text-align: center;
                color: #999;
                height: 30px;
                line-height: 30px;
            }
        }
        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }
    }
    .graph {
        display: flex;
        justify-content: space-between;
        .el-card {
            width: 48%;
            height: 260px;
            margin-top: 20px;
        }
    }
</style>

<script>
import { getData } from '../api';
import * as echarts from 'echarts';
export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '手机型号',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                }
            ]
        }
    },
    mounted() {
        getData().then(({data}) => {
            //层级比较深，所以多解构几次
            const {tableData} = data.data
            this.tableData = tableData

            //1.折线图
            //基于准备好的dom节点，初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            //指定图表的配置项和数据
            const echarts1Option = {}
            //处理数据xAxis
            const {videoData, orderData, userData} = data.data
            // console.log(orderData)
            const legend =  Object.keys(orderData.data[0])
            const legendData = {
                data: legend
            }
            const xAxisData = {
                data: orderData.date
            }
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}
            echarts1Option.legend = legendData
            echarts1Option.series = []
            legend.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            // console.log(echarts1Option)
            //根据指定的配置项显示图表
            echarts1.setOption(echarts1Option)

            //2.柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option = {
                legend: {
                    textStyle: {
                        color: '#333'
                    }
                },
                grid: {
                    left: '20%'
                },
                //提示框
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',//类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: '#17b3a3'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#333'
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        }
                    }
                ],
                color: ['#2ec7c9', '#b6a2de'],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ]
            }
            echarts2.setOption(echarts2Option)

            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            // console.log(videoData)
            const echarts3Option = {
                tooltip: {
                    trigger: 'item'
                },
                color: [
                    '#0f78f4',
                    '#dd536b',
                    '#9462e5',
                    '#a6a6a6',
                    '#e1bb22',
                    '#39c362',
                    '#3ed1cf'
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ]
            }
            echarts3.setOption(echarts3Option)
        })
    }
}
</script>