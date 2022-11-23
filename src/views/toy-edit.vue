<!-- <template>
  <section class="toy-edit-container">
    <h1 class="toy-edit-header padding-m-y">{{title}}</h1>
    <form @submit.prevent="save(updatedToy)">
      <label class="m-b-m">
        Name
        <input type="text" v-model="updatedToy.name" />
      </label><br>
      <label class="m-b-m">
        Price <input type="number" v-model="updatedToy.price" />
      </label>
      <div class="btns flex align-center">
        <button class="edit-save-btn btn">Save</button>
        <router-link to="/toy" class="edit-back-btn">Back</router-link>
      </div>
    </form>
  </section>
</template>


<script>
export default {
  data() {
    return {
      updatedToy: {
        name: '',
        toyId: null,
        price: 100,
      },
    }
  },
  created() {
    this.getToyById()
  },
  computed: {
    title() {
      return this.updatedToy._id ? 'TOY EDIT' : 'ADD A TOY'
    }
  },
  methods: {
    getToyById() {
      var toyId = this.$route.params.id
      if (toyId) {
        this.$store.dispatch({ type: 'getToyById', toyId }).then((toy) => {
          var currToyCopy = JSON.parse(JSON.stringify(toy))
          this.updatedToy = currToyCopy
        })
      }
    },
    save(toy) {
      const action = toy._id ? 'updated' : 'added'
      this.$store
        .dispatch({ type: 'saveToy', toy })
        .then(() => {
          // this.$store.dispatch({
          //   type: 'setUserActivities',
          //   toy,
          //   txt: `Toy was ${action}`,
          // })
          this.$router.push('/toy')
        })
        .then(() => {
          const msg = { txt: `Toy was succesfully ${action}`, type: 'success' }
          this.$store.commit({ type: 'setMsg', msg })
        })
    },
  },
}

</script> -->


<template>
  <h1 class="toy-edit-header padding-m-y">{{ title }}</h1>

  <el-form :model="updatedToy" label-width="120px" :rules="rules" ref="updatedToyRef">
    <el-form-item label="Toy name" prop="name">
      <el-input v-model="updatedToy.name" />
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="updatedToy.price" type="number" />
    </el-form-item>
    <el-form-item label="In stock">
      <el-switch v-model="updatedToy.inStock" />
    </el-form-item>
    <el-form-item label="Labels">
      <el-checkbox-group v-model="updatedToy.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="!updatedToy.price || updatedToy.name.length < 3" @click="save()">Save</el-button>
      <router-link to="/toy">
        <el-button>Back</el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
// import { FormInstance, FormRules } from 'element-plus'


// do not use same name with ref
export default {
  data() {
    return {
      updatedToyRef: ref(),
      updatedToy: {
        _id: null,
        name: '',
        price: +100,
        inStock: true,
        labels: [],
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
  },
  computed: {
    title() {
      return this.updatedToy._id ? 'TOY EDIT' : 'ADD A TOY'
    }
  },
  methods: {
    getToyById() {
      var toyId = this.$route.params.id
      if (toyId) {
        this.$store.dispatch({ type: 'getToyById', toyId }).then((toy) => {
          var currToyCopy = JSON.parse(JSON.stringify(toy))
          this.updatedToy = currToyCopy
        })
      }
    },
    async save() {
      // await this.rules.validate((valid, fields) => {
      //   if (valid) {
      //     console.log('submit!')
      //   } else {
      //     console.log('error submit!', fields)
      //   }
      // })
      // }



      const action = this.updatedToy._id ? 'updated' : 'added'
      this.$store
        .dispatch({ type: 'saveToy', toy: this.updatedToy })
        .then(() => {
          // this.$store.dispatch({
          //   type: 'setUserActivities',
          //   toy,
          //   txt: `Toy was ${action}`,
          // })
          this.$router.push('/toy')
        })
        .then(() => {
          const msg = { txt: `Toy was succesfully ${action}`, type: 'success' }
          this.$store.commit({ type: 'setMsg', msg })
        })
    },
  },
}
</script>
