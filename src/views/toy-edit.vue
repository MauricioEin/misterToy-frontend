
<template>
  <h1 class="toy-edit-header text-center">{{ title }}</h1>
  <user-avatar :avatarUrl="updatedToy.imgUrl" />
  <img-upload @saved="setImg" :avatarUrl="updatedToy.imgUrl"/>
  <el-form :model="updatedToy" label-width="120px" :rules="rules" ref="updatedToyRef" class="text-center">
    <el-form-item label="Toy name" prop="name">
      <el-input v-model="updatedToy.name" />
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="updatedToy.price" type="number" />
    </el-form-item>
    <el-form-item label="In stock">
      <el-switch v-model="updatedToy.inStock" />
    </el-form-item>
    <el-form-item label="Labels:">
      <el-checkbox-group v-model="updatedToy.labels">
        <el-checkbox v-for="label in labels" :label="label" :name="label" />
      </el-checkbox-group>
    </el-form-item>
    <!-- <img-list :imgUrls="imgUrls" @setAvatar="setAvatar" /> -->
    <el-form-item>
      <el-button type="primary" :disabled="!updatedToy.price || updatedToy.name.length < 3" @click="save()">Save
      </el-button>
      <router-link to="/toy">
        <el-button>Back</el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
import imgUpload from '../cmps/img-upload.cmp.vue'
import imgList from '../cmps/img-list.cmp.vue'
import userAvatar from '../cmps/user-avatar.cmp.vue'
import { imgService } from '../services/img-sevice'
// import { FormInstance, FormRules } from 'element-plus'


// do not use same name with ref
export default {
  data() {
    return {
      imgUrls: [],
      updatedToyRef: ref(),
      updatedToy: {
        _id: null,
        name: '',
        price: +100,
        inStock: true,
        labels: [],
        msgs: [],
        imgUrl: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please write toy name',
            trigger: 'blur',
          },
          {
            min: 3,
            message: 'Name should be at least 3 letters long',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: 'Please enter price',
            trigger: 'blur',
          },
        ],
      },
    }
  }, created() {
    this.getToyById()
    this.imgUrls = imgService.getImgs()

  },
  computed: {
    title() {
      return this.updatedToy._id ? 'Toy edit' : 'Add a toy'
    },
    labels() {
      return this.$store.getters.labels
    }
  },
  methods: {
    async getToyById() {
      var toyId = this.$route.params.id
      if (toyId) {
        const toy = await this.$store.dispatch({ type: 'getToyById', toyId })
        var currToyCopy = JSON.parse(JSON.stringify(toy))
        this.updatedToy = currToyCopy
      }
    },
    async save() {
      const action = this.updatedToy._id ? 'updated' : 'added'
      await this.$store.dispatch({ type: 'saveToy', toy: this.updatedToy })
      // this.$store.dispatch({
      //   type: 'setUserActivities',
      //   toy,
      //   txt: `Toy was ${action}`,
      // })
      this.$router.push('/toy')
      const msg = { txt: `Toy was succesfully ${action}`, type: 'success' }
      this.$store.commit({ type: 'setMsg', msg })
    },
    saveImg(url) {
      this.imgUrls.push(url)
      imgService.saveImg(url)
    },
    setImg(url) {
      this.updatedToy.imgUrl = url
    },

  },
  components: {
    imgUpload,
    imgList,
    userAvatar,
  },
}

</script>
