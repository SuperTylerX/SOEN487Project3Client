<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Header style="height: 60px">
        <Menu class="container" mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">Library Book Reservation System</div>
          <div class="layout-nav">
            <MenuItem name="1" to="/admin/reservation-list">
              Reservation List
            </MenuItem>
            <MenuItem name="1" to="/admin/book-list">
              Book List
            </MenuItem>
            <Dropdown placement="bottom-end">
              <a href="javascript:void(0)" class="dropDownText">
                {{ $store.state.userStore.userInfo.username }}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <div style="width: 100%" @click="logout">Logout</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Content class="container">
        <Breadcrumb :style="{ margin: '20px 0' }">
          <BreadcrumbItem to="/admin/reservation-list">Home</BreadcrumbItem>
          <BreadcrumbItem>{{ $store.state.routerName }}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 500px;">
            <router-view/>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">Concorida SOEN 487 Assignment 3
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "Library",
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push({
        path: "/login"
      })
    }
  },
  async mounted() {
    // get the user info
    try {
      await this.$store.dispatch("userStore/CHANGE_USERINFO")
    } catch (e) {
      this.$Message.error("Token Expired");
      await this.$router.push({
        path: '/login',
      })
    }
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
</style>
