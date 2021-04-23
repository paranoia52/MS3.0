import { get, post } from './index'

// 登陆
export const Login = (query: any) => post('/users/login', query)
// 注册
export const Regist = (query: any) => post('/users/add', query)
// 用户列表
export const GetUserList = (query: any) => post('/users/userList', query)
// 更新用户数据
export const SetUserInfo = (query: any) => post('/users/updata', query)

// 添加歌曲
export const AddMusic = (query: any) => post('/music/add', query)
// 获取歌曲列表
export const GetMusic = (query: any) => post('/music/query', query)

// 获取角色列表
export const GetRole = (query: any) => post('/role/query', query)
// 添加角色
export const AddRole = (query: any) => post('/role/add', query)
// 删除角色
export const DelRole = (query: any) => get('/role/del', query)