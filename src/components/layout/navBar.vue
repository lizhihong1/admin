<template>
    <div class='navBar'>
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Event from '../../util/Event';

    export default {
        // 组建的名称
        title: '',
        name: 'navBar',
        computed: {
            ...mapState({
                // showLoader: state => state.vux.showLoader,
            }),
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        /**
         * 子组建传值
         * objData: {
         *   type: Object,
         *   default: () => ({ })
         * }
         * arrData: {
         *   type: Array,
         *   twoWay: true,
         *   default: []
         * }
         */
        props: {},
        // 组建刷新
        inject: ['reload'],
        // 挂在组建
        components: {},
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'home',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'tableList',
                                title: '用户列表'
                            },
                            {
                                index: 'examList',
                                title: '考试列表'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                ]
            }
        },
        // 初始化记载
        created() {

            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            Event.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        // DOM加载完毕执行操作
        mounted() {
        },
        // 事件处理
        methods: {},
        // 离开路由的操作
        destroyed() {
        }
    }
</script>

<style scoped lang='less'>
    .navBar {
        ul {
            height: 100%;
        }

        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;

        .sidebar::-webkit-scrollbar {
            width: 0;
        }

        .sidebar-el-menu:not(.el-menu--collapse) {
            width: 250px;
        }

        .sidebar > ul {
            height: 100%;
        }
    }
</style>
