import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.myapp',
  appName: 'MyFacebookApp',
  webDir: 'www',
  plugins: {
    FacebookLogin: {
      appId: 'YOUR_FACEBOOK_APP_ID',
    }
  }
};

export default config;
