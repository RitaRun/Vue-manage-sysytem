<template>
    <div class="manage">
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd">
                + 新增
            </el-button>
        </div>
        <div class="common-table">
            <!-- 用户数据表格 -->
            <el-table :data="tableData" style="width: 100%" height="90%" stripe>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sexLabel"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :rules="rules" :model="form" label-width="80px" :inline="true">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-DD"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getUser, addUser, editUser, delUser} from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入姓名'}
                ],
                age: [
                    {required: true, message: '请输入年龄'}
                ],
                sex: [
                    {required: true, message: '请选择性别'}
                ],
                birth: [
                    {required: true, message: '请选择日期'}
                ]
            },
            tableData: [],
            modelType: 0, //0表示新增的弹窗，1表示编辑的弹窗
            total: 0,
            pageData: {
                page: 1,
                limit: 20
            }
        }
    },
    methods: {
        //提交用户表单
        submit(){
            this.$refs.form.validate((valid) => {
                if(valid){//验证成功
                    if(this.modelType === 0){
                        addUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    else{
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    //this.$refs.form表单处理
                    this.$refs.form.resetFields()
                    this.dialogVisible = false//关闭弹窗
                }
            })
        },
        //弹窗关闭
        handleClose(){
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel(){
            this.handleClose()
        },
        handleEdit(row) {
            this.modelType = 1
            this.dialogVisible = true
            this.form = JSON.parse(JSON.stringify(row))//深拷贝
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({id: row.id}).then(() => {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    //重新获取列表接口
                    this.getList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleAdd(){
            this.modelType = 0
            this.dialogVisible = true
        },
        getList(){
            getUser({params: this.pageData}).then(({data}) => {
                // console.log(data, 'data')
                this.tableData = data.list
                this.tableData.map((item) => item.sex === 0 ? item.sexLabel='女' : item.sexLabel='男')
                this.total = data.count || 0
            })
        },
        handlePage(val){
            // console.log(val, 'val')
            this.pageData.page = val
            this.getList()
        }
    },
    mounted () {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
    .manage {
        height: 90%;
        .common-table {
            position: relative;
            height: calc(100% - 62px);
            .pager {
                position: absolute;
                bottom: 0;
                right: 20px;
            }
        }   
    }
</style>