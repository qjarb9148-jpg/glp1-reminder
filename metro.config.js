const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// react-native-google-mobile-ads pulls in native-only RN internals
// (codegenNativeComponent) that Metro cannot bundle for web. Ads are
// already skipped at runtime on web (see src/utils/environment.ts), but
// Metro still needs a web-safe module to resolve the import to.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-google-mobile-ads' && platform === 'web') {
    return {
      filePath: path.join(__dirname, 'src/ads/googleMobileAdsWebStub.tsx'),
      type: 'sourceFile',
    };
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
