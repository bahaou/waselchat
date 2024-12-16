<template>
  <router-link
    v-slot="{ href, isActive, navigate }"
    :to="to"
    custom
    active-class="active"
  >
    <li
      class="font-medium h-7 my-1 hover:bg-slate-25 hover:text-bg-50 flex items-center px-2 rounded-md dark:hover:bg-slate-800"
      :class="{
        'bg-woot-25 dark:bg-slate-800': isActive,
        'text-ellipsis overflow-hidden whitespace-nowrap max-w-full':
          shouldTruncate,
      }"
      @click="navigate"
    >
      <a
        :href="href"
        :class="'inline-flex text-left max-w-full w-full items-center radius5 color'+icon+' rtl:rtlcolor'+icon+'  dark:darkcolor'+icon+' rtl:dark:rtldarklcolor'+icon"
      >  
        <span v-if="icon">
          <img width="20" :src="'/integrations/inboxes/' + icon + '.png'" :class="'img'+icon+' imgbasic'" />
          <!-- <fluent-icon class="inbox-icon" :icon="icon" size="12" /> -->
        </span>

<!--        <span
          v-if="icon"
          class="inline-flex items-center justify-center w-4 rounded-sm bg-slate-100 dark:bg-slate-700 p-0.5 mr-1.5 rtl:mr-0 rtl:ml-1.5"
        >
          <fluent-icon
            class="text-xxs text-slate-700 dark:text-slate-200"
            :class="{
              'text-woot-500 dark:text-woot-500': isActive,
            }"
            :icon="icon"
            size="12"
          />
        </span>
-->
        <span
          v-if="labelColor"
          class="inline-flex rounded-sm bg-slate-100 h-3 w-3.5 mr-1.5 rtl:mr-0 rtl:ml-1.5 border border-slate-50 dark:border-slate-900"
          :style="{ backgroundColor: labelColor }"
        />
        <div
          class="items-center flex overflow-hidden whitespace-nowrap text-ellipsis w-full justify-between"
        >
          <span
            :title="menuTitle"
            class="text-sm text-slate-700 dark:text-slate-100"
            :class="{
              'text-woot-500 dark:text-woot-500': isActive,
              'text-ellipsis overflow-hidden whitespace-nowrap max-w-full':
                shouldTruncate,
            }"
          >
            &nbsp;&nbsp;&nbsp;{{ label }}
          </span>
          <span
            v-if="showChildCount"
            class="bg-slate-50 dark:bg-slate-700 rounded-full min-w-[18px] justify-center items-center flex text-xxs font-medium mx-1 py-0 px-1"
            :class="
              isCountZero
                ? `text-slate-300 dark:text-slate-500`
                : `text-slate-700 dark:text-slate-50`
            "
          >
            {{ childItemCount }}
          </span>
        </div>
        <span
          v-if="warningIcon"
          class="inline-flex mr-1 bg-red-50 dark:bg-red-900 p-0.5 rounded-sm"
        >
          <fluent-icon
            v-tooltip.top-end="$t('SIDEBAR.REAUTHORIZE')"
            class="text-xxs text-red-500 dark:text-red-300"
            :icon="warningIcon"
            size="12"
          />
        </span>
      </a>
    </li>
  </router-link>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelColor: {
      type: String,
      default: '',
    },
    shouldTruncate: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    warningIcon: {
      type: String,
      default: '',
    },
    showChildCount: {
      type: Boolean,
      default: false,
    },
    childItemCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showIcon() {
      return {
        'overflow-hidden whitespace-nowrap text-ellipsis': this.shouldTruncate,
      };
    },
    isCountZero() {
      return this.childItemCount === 0;
    },
    menuTitle() {
      return this.shouldTruncate ? this.label : '';
    },
  },
};
</script>
<style scoped>
.imgbasic{
height:auto;
width:24px;
}
.imgcloud{
width:40px!important;
margin:-4px !important;
}
.imgglobe-desktop{
width:18px !important;
}
.imgbrand-telegram{
width:20px !important;
}
.imgbrand-facebook{
width:26px !important;
}
.imbrand-line{
width:22px !important;
}
.imgmail{
width:21px !important;;
}
.imgchat{
width:24px !important;
}
.imgbrand-whatsapp{
width:22px!important;
}
.colorglobe-desktop{
background:linear-gradient(90deg, #effdff 15%, #9592f7)
}
:is([dir="rtl"] .rtl\:rtlcolorglobe-desktop){
background:linear-gradient(90deg,#9592f7 15%,#effdff)
}

:is(.dark .dark\:darkcolorglobe-desktop){
background:linear-gradient(90deg, #1d0e39 5%, #2f2c91)
}
:is([dir="rtl"] .dark\:rtldarkcolorglobe-desktop){
background:linear-gradient(90deg,#48b4ca 5%,#000);
}

.colorbrand-line{
background:linear-gradient(90deg,#effdff 15%,#82f08e);
}
:is([dir="rtl"] .rtl\:rtlcolorbrand-line){
background:linear-gradient(90deg,#8fee99 35%,#effdff);
}

:is(.dark .dark\:darkcolorbrand-line){
background:linear-gradient(90deg, #181e11 5%, #398e4a)
}


.colorbrand-whatsapp{
background:linear-gradient(90deg,#effdff 15%,#82f08e);
}
:is([dir="rtl"] .rtl\:rtlcolorbrand-whatsapp){
background:linear-gradient(90deg,#8fee99 35%,#effdff);
}

:is(.dark .dark\:darkcolorbrand-whatsapp){
background:linear-gradient(90deg, #181e11 5%, #398e4a)
}




.colorbrand-facebook{
background:linear-gradient(90deg,#effdff 15%,#fbb3df);
}
:is([dir="rtl"] .rtl\:rtlcolorbrand-facebook){
background:linear-gradient(90deg, #fbb3df 35%, #effdff);
}

:is(.dark .dark\:darkcolorbrand-facebook){
background:linear-gradient(90deg,#3c1728 5%,#f272c0);
}




.colorbrand-telegram{
background:linear-gradient(90deg,#effdff 15%,#00d4ff);
}
:is([dir="rtl"] .rtl\:rtlcolorbrand-telegram){
background:linear-gradient(90deg,#00d4ff 35%,#effdff);
}

:is(.dark .dark\:darkcolorbrand-telegram){
background:linear-gradient(90deg,#0e3939 5%,#48b4ca);
}



.radius5{
border-radius:5px;
}

</style>
