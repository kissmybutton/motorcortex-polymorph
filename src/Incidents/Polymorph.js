import MotorCortex from "@kissmybutton/motorcortex";
import * as Polymorph from "polymorph-js";

export default class MyEffect extends MotorCortex.Effect {
  onGetContext() {
    this.interpolator = Polymorph.interpolate(
      [this.initialValue, this.animAttributes.d],
      {
        addPoints: this.attrs.addPoints || 0,
        origin: {
          x: this.attrs.originX || 0,
          y: this.attrs.originY || 0,
        },
        precision: this.attrs.precision || "fill",
      }
    );
  }

  getScratchValue() {
    return this.element.getAttribute("d");
  }

  onProgress(fraction) {
    this.element.setAttribute("d", this.interpolator(fraction));
  }
}
