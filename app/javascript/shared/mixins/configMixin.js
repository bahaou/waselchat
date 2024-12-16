export default {
  computed: {
    hostURL() {
      return window.waselchatConfig.hostURL;
    },
    vapidPublicKey() {
      return window.waselchatConfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.waselchatConfig.enabledLanguages;
    },
    isEnterprise() {
      return window.waselchatConfig.isEnterprise === 'true';
    },
    enterprisePlanName() {
      // returns "community" or "enterprise"
      return window.waselchatConfig?.enterprisePlanName;
    },
  },
};
