import $ from './Axios'

const flag = true
const baseUrl = flag ? 'http://127.0.0.1:7075' : ''; //和代理相对应的请求地址

/* *api接口的统一管理* */
const LIST_API = baseUrl + '/users'
const ADD_DATA_API = baseUrl + '/user'
const EXAM_LIST_API = baseUrl + '/exams'
const EXAM_ADD_API = baseUrl + '/exam'

export default {
    // 用户列表
    // 列表查询
    getUserList(params) {
        return $.post(LIST_API, params);
    },
    // 新增
    addData(params) {
        return $.post(ADD_DATA_API, params);
    },
    // 删
    deleteData(id) {
        return $.delete(ADD_DATA_API + '/' + id);
    },
    // 改
    editData(id, params) {
        return $.put(ADD_DATA_API + '/' + id, params);
    },
    // 查
    getDeatail(id) {
        return $.get(ADD_DATA_API + '/' + id);
    },

    // 考试列表
    // 列表查询
    getExamList(params) {
        return $.post(EXAM_LIST_API, params);
    },
    // 新增
    addExamData(params) {
        return $.post(EXAM_ADD_API, params);
    },
    // 删
    deleteExamData(id) {
        return $.delete(EXAM_ADD_API + '/' + id);
    },
    // 改
    editExamData(id, params) {
        return $.put(EXAM_ADD_API + '/' + id, params);
    },
    // 查
    getexamDeatail(id) {
        return $.get(EXAM_ADD_API + '/' + id);
    },
}