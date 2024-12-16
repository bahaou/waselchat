import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.waselchatConfig = {
        hostURL: 'https://app.waselchat.com',
        helpCenterURL: 'https://help.waselchat.com',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.waselchat.com/hc/handbook'
      );
      window.waselchatConfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.waselchatConfig = {
        hostURL: 'https://app.waselchat.com',
        helpCenterURL: 'https://help.waselchat.com',
      };
      expect(
        buildPortalArticleURL('handbook', 'culture', 'fr', 'article-slug')
      ).toEqual('https://help.waselchat.com/hc/handbook/articles/article-slug');
      window.waselchatConfig = {};
    });
  });
});
