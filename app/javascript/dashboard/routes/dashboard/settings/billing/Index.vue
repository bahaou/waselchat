<template>
  <div class="flex-1 p-6 overflow-auto dark:bg-slate-900">
    <woot-loading-state v-if="uiFlags.isFetchingItem" />
    <div v-else-if="!hasABillingPlan">
      <p>Subsciption : </p>
    </div>
  </div>
</template>

<script>
import messageFormatterMixin from 'shared/mixins/messageFormatterMixin';

import { mapGetters } from 'vuex';
import accountMixin from '../../../../mixins/account';
import BillingItem from './components/BillingItem.vue';
// sdds
export default {
  components: { BillingItem },
  mixins: [accountMixin, messageFormatterMixin],
  computed: {
    ...mapGetters({
      getAccount: 'accounts/getAccount',
      uiFlags: 'accounts/getUIFlags',
    }),
    currentAccount() {
      return this.getAccount(this.accountId) || {};
    },
    customAttributes() {
      return this.currentAccount.custom_attributes || {};
    },
    hasABillingPlan() {
      return !!this.planName;
    },
    planName() {
      return this.customAttributes.plan_name || '';
    },
    subscribedQuantity() {
      return this.customAttributes.subscribed_quantity || 0;
    },
  },
  mounted() {
    this.fetchAccountDetails();
  },
  methods: {
    async fetchAccountDetails() {
      if (!this.hasABillingPlan) {
        this.$store.dispatch('accounts/subscription');
      }
    },
    onClickBillingPortal() {
      this.$store.dispatch('accounts/checkout');
    },
    onToggleChatWindow() {
      if (window.$waselchat) {
        window.$waselchat.toggle();
      }
    },
  },
};
</script>

<style lang="scss">
.manage-subscription {
  @apply bg-white dark:bg-slate-800 flex justify-between mb-2 py-6 px-4 items-center rounded-md border border-solid border-slate-75 dark:border-slate-700;
}

.current-plan--details {
  @apply border-b border-solid border-slate-75 dark:border-slate-800 mb-4 pb-4;

  h6 {
    @apply text-slate-800 dark:text-slate-100;
  }

  p {
    @apply text-slate-600 dark:text-slate-200;
  }
}

.manage-subscription {
  .manage-subscription--description {
    @apply mb-0 text-slate-600 dark:text-slate-200;
  }

  h6 {
    @apply text-slate-800 dark:text-slate-100;
  }
}
</style>
