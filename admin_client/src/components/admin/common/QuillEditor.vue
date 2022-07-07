<template>
  <div class="edit_container">
    <!-- 这是基于vue-quill-editor的富文本组件 -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      @change="onEditorChange"
      :options="editorOption"
    ></quill-editor>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

// 引入图拖拽上传组件
import * as Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);

//quill图片可拖拽改变大小
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

//quill编辑器的字体
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts; //将字体加入到白名单
Quill.register(Font, true);

export default {
  data() {
    return {
      content: ``,
      editorOption: {
        modules: {
          imageDrop: true, // 开启 拖拽图片
          imageResize: {}, // 开启 图片修改大小功能
          toolbar: [
            // 因为拖拽图片组件会覆盖原有的功能组件，所以需要手动在写一遍
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: fonts }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ]
        }
      }
    };
  },
  components: {
    quillEditor
  },
  props: ["bodyHtml"],
  methods: {
    onEditorChange() {
      this.$emit("saveHtml", this.content);
    }
  },
  watch: {
    bodyHtml(newVal, oldVal) {
      // oldVal 为空时，表明是打开dialog加载上次保存内容
      // oldVal 不为空是，表明是修改富文本内容，不需要赋值，否则会出现光标一直在最前的bug
      if (!oldVal) {
        this.content = newVal;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.edit_container {
  /deep/ .ql-editor {
    height: 300px;
  }
}
</style>