<template>
  <div>
    <!-- 这是 实时获取当前时间的组件 -->
    {{ currentDate }}
  </div>
</template>
<script>
import moment from 'moment'

export default {
      name:'CurrentDate',
      data(){
          return {
              currentDate:moment().format('YYYY年MM月DD日 HH:mm:ss')
          }
      }
      }
}
</script>
<style lang="less" scoped>
</style>