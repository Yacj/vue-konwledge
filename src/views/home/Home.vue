<template>
    <div id="home">
        <header class="h-header van-hairline--bottom">
            <router-link class="h-header-search"
                         to="search">
                <van-icon name="search"/>
                搜索您感兴趣的课程
            </router-link>
            <router-link class="h-header-user"
                         to="my">
            </router-link>
        </header>
        <main class="h-container">
            <div class="banner">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="item of swiperList" :key="item.id">
                        <img class="swiper-img" :src="item.pic"/>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="recommend">
                <van-grid :border="false" :column-num="5">
                    <van-grid-item v-for="(item,index ) in recommendList"
                                   :key="index">
                        <div class="picture">
                            <img :src="item.icon" alt="">
                        </div>
                        <p class="text">{{item.title}}</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </main>
        <tabbar :active="0"></tabbar>
    </div>
</template>

<script>

    import Tabbar from "../../components/Tabbar/Tabbar";
    import {homeService} from "../../api/home/home";

    export default {
        name: 'Home',
        components: {Tabbar},
        data() {
            return {
                swiperOption: {
                    pagination:{ el: ".swiper-pagination"},
                    paginationClickable: false,
                    autoplay:{
                        disableOnInteraction: false,
                        delay:2000
                    },
                    speed: 1000,
                    loop: true,
                    effect: "coverflow",
                    slidesPerView: "auto",
                    centeredSlides: true,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: -80, // slide左右距离
                        depth: 400, // slide前后距离
                        modifier: 0.5, //
                        slideShadows: false // 滑块遮罩层
                    },
                    observer: true,
                    observeParents: true,
                    autoplayDisableOnInteraction: false
                },
                swiperList: [],
                recommendList:[]
            }
        },
        created() {
            this.getHomeData()
        },
        mounted() {
            this.$store.commit('showLoading')
            this.swiper.slideTo(false)
        },
        methods: {
            async getHomeData() {
                await homeService.banner().then(res => {
                    let data = res.data;
                    this.swiperList = data
                });
                await homeService.recommend().then(res=>{
                    console.log(res)
                    let Data = res.data
                    this.recommendList = Data
                })
                this.$store.commit('hideLoading')
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        }

    }
</script>

<style scoped lang="scss">
    #home {
        width: 100%;
        height: 100%;
        position: absolute;
        .h-header {
            width: 100%;
            height: 44px;
            background: #fff;
            z-index: 100;
            position: fixed;
            .h-header-search {
                height: 30px;
                line-height: 30px;
                margin: 0 60px 0 96px;
                background: #f0f0f0;
                display: block;
                position: relative;
                top: 7px;
                border-radius: 5px;
                color: #999;
                font-size: 14px;
                padding-left: 10px;
                >i{
                    font-size: 15px;
                    top: 10%;
                }
            }

            .h-header-user {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                top: 0;
                right: 15px;
                margin-top: 7px;
                background: url(../../assets/img/header_logout.png) center no-repeat;
                background-size: 30px auto;
                position: absolute;
            }
        }

        .h-container {
            padding: 45px 0;
            .banner {
                height: 4.55rem;
                padding: 15px 0;

                .swiper-container {
                    height: 100%;
                }

                .swiper-slide {
                    width: 6.66rem !important;
                    height: 3.24rem;
                    border-radius: 0.1rem;

                    >img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                .swiper-pagination{
                    bottom: -5px;
                }
                .swiper-pagination-bullet {
                    width: 0.1rem;
                    height: 0.1rem;
                    border-radius: 50%;
                    background-color: #B4B4B4;
                }
                .swiper-pagination-bullet.swiper-pagination-bullet-active {
                    width: 0.2rem;
                    border-radius: 0.05rem;
                    background-color: #6690F6;
                }

            }
            .recommend{
                .picture{
                    width: 0.9rem;
                    height: 0.9rem;
                    border-radius: 50%;
                    margin: 0 auto 0.18rem auto;
                    >img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>
