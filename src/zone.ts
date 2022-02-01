import "zone.js";
import { Detector } from "./change-detection";
import { Angular } from "./framework";

export const FrameworkZone = Zone.current.fork({
  name: "frameworkZone",
  onInvokeTask(delegate, current, target, task, applyThis, applyArgs) {
    delegate.invokeTask(target, task, applyThis, applyArgs);

    Angular.digest();
  },
});
