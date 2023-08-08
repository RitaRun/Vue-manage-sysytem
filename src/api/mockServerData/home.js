//mock数据模拟
import Mock from 'mockjs'

//首页的图表数据
let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    apple: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    samsum: Mock.Random.float(100, 8000, 0, 0),
                    mac: Mock.Random.float(100, 8000, 0, 0),
                    mi: Mock.Random.float(100, 8000, 0, 0)
                })
            )
        }
        return {
            code: 20000,
            data: {
                //饼图
                videoData: [
                    {
                        name: 'mi',
                        value: 2999
                    },
                    {
                        name: 'apple',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1500
                    },
                    {
                        name: 'oppo',
                        value: 1999
                    },
                    {
                        name: 'mac',
                        value: 2200
                    },
                    {
                        name: 'samsum',
                        value: 4500
                    }
                ],
                //柱状图
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 10,
                        active: 500
                    },
                    {
                        date: '周三',
                        new: 12,
                        active: 550
                    },
                    {
                        date: '周四',
                        new: 15,
                        active: 630
                    },
                    {
                        date: '周五',
                        new: 21,
                        active: 650
                    },
                    {
                        date: '周六',
                        new: 24,
                        active: 670
                    },
                    {
                        date: '周日',
                        new: 26,
                        active: 700
                    },
                ],
                //折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                //表格
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'vivo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'apple',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'samsum',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'mi',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    }
                ]
            }
        }
    }
}