<template>
  <div class="setuserinfo">
    <el-dialog title="修改用户信息" :show-close="false" :visible.sync="visible">
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户头像:" label-width="100px">
              <el-row style="display:flex;justify-content: space-between;">
                <div style="width: 50px;height: 50px;">
                  <img class="buddha" :src="form.HeadIcon" alt="">
                </div>
                <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/upload" :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item class="Album" label="个人相册:" label-width="100px">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="UID:" label-width="100px">
              <el-input placeholder="请输入内容" v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="rare" label="稀有ID:" label-width="100px">
              <el-input placeholder="请输入内容" v-model="form.PrettyUserId" maxlength="6" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="昵称:" label-width="100px">
              <el-input placeholder="请输入内容" v-model="form.NickName" maxlength="10" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="性别:" label-width="100px">
              <el-select v-model="form.Sex" placeholder="请选择">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主播认证:" label-width="100px">
              <el-switch style="display: block;padding: 10px 0;" v-model="form.IsOfficial" active-color="#13ce66"
                active-text="是" inactive-text="否" :active-value="true" :inactive-value="false">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="超管认证:" label-width="100px">
              <el-switch style="display: block;padding: 10px 0;" v-model="form.IsSuperManage" active-color="#13ce66"
                active-text="是" inactive-text="否" :active-value="true" :inactive-value="false">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="个性签名:" label-width="100px">
          <el-input placeholder="请输入内容" v-model="form.Signature" maxlength="40" show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { inject } from 'vue'
import { SetUserInfo } from '@/http/api'
export default {
  setup(props, context) {
    //provide() 和 inject() 可以实现嵌套组件之间的数据传递。
    // 这两个函数只能在 setup() 函数中使用。
    // 父级组件中使用 provide() 函数向下传递数据。
    // 子级组件中使用 inject() 获取上层传递过来的数据。
    const propsForm = inject('Visible')

    const visible = propsForm[0]
    const form = propsForm[1]
    const update = () => {
      SetUserInfo(form).then((res) => {
        console.log(res)
      })
    }
    const cancel = () => {
      console.log('cancel')
    }
    const handleAvatarSuccess = (value) => {
      form.HeadIcon = value.url
      console.log(this.form)
    }
    return {
      visible,
      form,
      cancel,
      update,
    }
  },
}
</script>