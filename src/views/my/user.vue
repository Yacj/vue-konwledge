<template>
    <div id="user">
        <header class="u-header acea-row row-between-wrapper">
            <div class="u-header-pic acea-row row-middle">
                <div class="picture">
                    <img :src="userInfo.avatar" alt="">
                </div>
                <div class="name ov1">
                    {{userInfo.name}}
                </div>
            </div>
            <van-icon name="arrow" color="#fff" class="icon"/>
        </header>
        <main class="u-container">
            <div class="nav acea-row row-middle">
                <van-grid :border="false" :column-num="3">
                    <van-grid-item>
                        <div class="picture">
                            <img src="../../assets/img/u_n01.png" />
                        </div>
                        <div class="name">我的课程</div>
                        <div class="info">管理您的课程订单</div>
                    </van-grid-item>
                    <van-grid-item>
                        <div class="picture">
                            <img src="../../assets/img/u_n02.png" />
                        </div>
                        <div class="name">学习记录</div>
                        <div class="info">共有{{userInfo.learning_records}}条学习记录</div>
                    </van-grid-item>
                    <van-grid-item>
                        <div class="picture">
                            <img src="../../assets/img/u_n03.png" />
                        </div>
                        <div class="name">收藏记录</div>
                        <div class="info">已收藏{{userInfo.collect}}个</div>
                    </van-grid-item>
                </van-grid>
            </div>
        </main>
        <tabbar :active="2"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "../../components/Tabbar/Tabbar";

    export default {
        name: "user",
        components: {Tabbar},
        data() {
            return {
                userInfo: {
                    avatar: require('../../assets/img/header_logout.png'),
                    name: '请登录',
                    learning_records:0,
                    collect:0
                }
            }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:#F7F4F8')
        },
        beforeDestroy () {
            document.querySelector('body').setAttribute('style', '')
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    .van-grid{
        width: 100%
    }
    #user {
        .u-header {
            padding: 0 0.6rem 0 0.3rem;
            background-color: $theme;
            height: 1.82rem;
            position: relative;

            .u-header-pic {
                font-size: 0.36rem;
                color: #fff;

                .picture {
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius: 50%;
                    margin-right: 0.28rem;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .name {
                    width: 4rem;
                }
            }

            .icon {
                font-size: 0.4rem;
            }

            &:after {
                position: absolute;
                left: 0;
                right: 0;
                bottom: -1.4rem;
                z-index: -1;
                content: '';
                height: 2rem;
                width: 100%;
                border-radius: 0 0 50% 50%;
                background-color: $theme;
            }
        }
        .u-container{
            .nav{
                justify-content: space-between;
                background-color: #fff;
                width: 6.9rem;
                height: 2rem;
                border-radius: 0.16rem;
                margin: 0 auto;
                .picture{
                    width: 0.7rem;
                    height: 0.7rem;
                    margin: 0 auto;
                    >img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    font-size: 0.26rem;
                    color: #333333;
                    margin-top: 0.14rem;
                }
                .info{
                    font-size: 0.2rem;
                    color: #999999;
                    margin-top: 0.04rem;
                }
            }
        }
    }
</style>