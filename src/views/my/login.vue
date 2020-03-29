<template>
    <div id="login">
        <h5>用户登录</h5>
        <van-cell-group class="input_group">
            <van-field
                    left-icon="phone-o"
                    v-model="userPhone"
                    maxlength="11"
                    placeholder="请输入手机号"
                    clearable
            />
            <van-field
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
            >
                <van-button slot="button"
                            size="small"
                            type="primary"
                            color="#1989fa"
                            :disabled="sendCodeDis"
                            @click="sendCode"
                >{{sendBtnText}}
                </van-button>
            </van-field>
            <div class="btn_warp">
                <van-button :disabled="isLogin === false"
                            round
                            block
                            type="info"
                            @click="login">
                    登录
                </van-button>
                <h6>忘记密码？</h6>
                <p>还没有账号，立即注册</p>
            </div>
            <template v-if="isWx">
                <van-divider>快速登录</van-divider>
                <div class="icon_wrap">
<!--
                    <img src="../../assets/img/qqicon.png" alt="">
-->
                    <img src="../../assets/img/wxicon.png" alt="">
                </div>
            </template>

        </van-cell-group>
    </div>
</template>

<script>
    import {cookie, isMPStrict, wxBrowser} from "../../assets/js/util";

    export default {
        name: "login",
        data() {
            return {
                username: '',
                userPhone: '',
                sms: '',
                sendBtnText: "发送验证码",
                sendCodeDis: false,
                isWx:true
            }
        },
        mounted() {
            if(wxBrowser){
                this.isWx = true
            }
        },
        methods: {
            sendCode() {
                if (this.userPhone === '' || !isMPStrict(this.userPhone)) {
                    return this.$toast.fail('请输入正确的手机号码')
                }
                let ss = 6;
                this.sendBtnText = ss + 's';
                this.sendCodeDis = true;
                let timer = setInterval(() => {
                    ss = ss-1;
                    this.sendBtnText=ss+'s'
                    if(this.sendBtnText==='0s'){
                        clearInterval(timer)
                        this.sendBtnText="发送验证码"
                        this.sendCodeDis=false
                    }
                }, 1000);
            },
            login() {
                if (this.userPhone === '' || !isMPStrict(this.userPhone)) {
                    return this.$toast.fail('请输入正确的手机号码')
                }
                if(this.sms === ''){
                    return this.$toast.fail('请输入验证码')
                }
                this.$toast.success({
                    type:'success',
                    message:'登录成功',
                    onOpened:(()=>{
                       cookie.setCookie('token','token',365)
                        this.$router.push({
                            path:'/my'
                        })
                    })
                })
            }
        },
        computed: {
            isLogin() {
                return this.userPhone !== "" && this.sms !== ""
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #login {
        position: relative;
        padding: 0.2rem;
        box-sizing: border-box;
        color: #333;
        h5 {
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.48rem;
            margin-top: 0.6rem;
        }

        .input_group {
            margin-top: 0.4rem;
            text-align: left;
        }

        .van-hairline--top-bottom::after {
            border: none;
        }

        .van-field {
            margin: 0.4rem 0;
        }

        .btn_warp {
            h6 {
                margin-top: 0.2rem;
                color:#666;
                text-align: right;
                font-size: 0.24rem;
                line-height: 0.6rem;
            }

            p {
                font-size: 0.24rem;
                line-height: 0.6rem;
                color: #333333;
                text-align: center;
            }
        }

        .icon_wrap {
            display: flex;
            justify-content: space-around;

            img {
                width: 0.8rem;
                height: 0.8rem;
            }
        }
    }

</style>