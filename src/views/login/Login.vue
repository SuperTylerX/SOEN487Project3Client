<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Header style="height: 60px">
        <Menu class="container" mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">Library Book Reservation System</div>
        </Menu>
      </Header>
      <Content class="container" style="padding-top: 20px">
        <Card>
          <div style="min-height: 500px;">
            <div class="login-wrap">
              <div class="icon">
                <Icon type="ios-contact"/>
              </div>
              <Form ref="formInline" :model="loginData" :rules="ruleInline">
                <FormItem prop="user">
                  <Input type="text" v-model="loginData.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" v-model="loginData.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <div id="g-recaptcha"></div>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')">Sign In</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">Concorida SOEN 487 Assignment 3
      </Footer>
    </Layout>
  </div>
</template>


<script>
import axios from 'axios';
import {captcha} from '@/api/recaptcha';
import qs from 'querystring';

export default {
  name: "Login.vue",
  data() {
    return {
      loginData: {
        username: '',
        password: '',
        captchaToken: ''
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      if (this.loginData.captchaToken === "") {
        this.$Message.error("Please check the captcha");
        return;
      }

      this.$refs[name].validate(async (valid) => {
        if (valid) {
          try {
            let result = await axios.post("http://localhost:8080/library/auth/login", qs.stringify(this.loginData)).then(data => data.data);
            if (result.code === 200) {
              sessionStorage.setItem("token", result.token);
              this.$Message.success('login Successfully!');
              await this.$store.dispatch("userStore/CHANGE_USERINFO")
              if (this.$store.state.userStore.userInfo.role === "reader") {
                await this.$router.push({
                  path: '/library/index',
                })
              } else {
                await this.$router.push({
                  path: '/admin/reservation-list',
                })
              }

            } else {
              window.grecaptcha.reset();
              this.$Message.error(result.message);
            }

          } catch (err) {
            this.$Message.error('Network Connection Failed!');
          }

        }
      })
    }
  },
  mounted() {
    let self = this;
    window.onloadCallback = function () {
      // Request the client token
      window.grecaptcha.render('g-recaptcha', {
        sitekey: '6LcGq4UaAAAAAMXDLzuf_pQi2cpmRNIfHBJtQ5Jh',
        callback: function (token) {
          self.loginData.captchaToken = token;
        }
      });
    }
    captcha();
  }
}
</script>


<style lang="less">

body, html {
  height: 100%;
}

.container {
  width: 1280px;
  margin: 0 auto;
}

.layout {
  background: #f5f7f9;
  overflow: hidden;
  min-height: 100%;
}

.layout-logo {
  float: left;
  top: 15px;
  left: 20px;
  font-size: 20px;
  color: white;
}

.layout-nav {
  float: right;
}

.layout-footer-center {
  text-align: center;
}

.dropDownText {
  color: white;

  &:hover {
    color: #d0d2d0;
  }
}

.normalText {
  color: #515a6e;
  text-decoration: none;

  &:hover {
    color: #515a6e;
  }
}

.login-wrap {
  position: relative;

  .icon {
    position: relative;
    top: 50px;
    left: 50%;
    width: 90px;
    margin-left: -45px;
    text-align: center;
    font-size: 90px;
    display: block;
    color: #515a6e;
  }

  Form {
    position: absolute;
    top: 200px;
    left: 50%;
    width: 304px;
    margin-left: -152px;

    .g-recaptcha {
      padding-top: 20px;
      width: 100%;
    }

    Button {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
