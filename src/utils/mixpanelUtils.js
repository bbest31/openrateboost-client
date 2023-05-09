export function trackEvent(mixpanel, name, properties) {
  try {
    if (mixpanel.config.token) {
      if (properties) {
        mixpanel.track(name, properties);
      } else {
        mixpanel.track(name);
      }
    }
  } catch (err) {
    console.warn('Mixpanel token not present: ', err);
  }
}
