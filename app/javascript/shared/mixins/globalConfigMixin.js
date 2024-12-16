export const useInstallationName = (str, installationName) => {
  if (str && installationName) {
    return str.replace(/Waselchat/g, installationName);
  }
  return str;
};

export default {
  methods: {
    useInstallationName,
  },
};
