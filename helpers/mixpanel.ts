const Mixpanel = require("mixpanel");

export default class MixpanelClient {
  public isDevelopment;
  public mixpanel;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";

    this.mixpanel = Mixpanel.init(process.env.MIXPANEL_KEY, {
      debug: this.isDevelopment,
    });

    // if (isDevelopment) {
    //   mixpanel.opt_out_tracking();
    // } else {
    //   mixpanel.opt_in_tracking();
    // }
  }

  track(name: string, data?: any) {
    // TODO: or disable tracking in dev altogether
    const sendName = this.isDevelopment ? "DEV - " + name : name;

    this.mixpanel.track(sendName, {
      ...data,
      isDevelopment: this.isDevelopment,
    });
  }
}
