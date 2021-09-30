# motorcortex-polymorph

## Demo
[Check it out here](https://donkeyclip.github.io/motorcortex-polymorph/demo/index.html)

## Installation

```bash
$ npm install --save @donkeyclip/motorcortex-polymorph
# OR
$ yarn add @donkeyclip/motorcortex-polymorph
```

## Loading

```javascript
import MotorCortex from "@donkeyclip/motorcortex/"
import polymorphDefinition from "@donkeyclip/motorcortex-polymorph"
const Plugin = MotorCortex.loadPlugin(polymorphDefinition);
```

# Create incident

## Polymorph

```javascript
const polymorph = new Plugin.Polymorph(
  {
    animatedAttrs: {
      d: `M209 289h-4c-4-8.4-5.8-8.8-13.5-3.9-2.4 1.5-5 2.6-7.5 11.4z`,
    },
    addPoints: 100,
    originX: 0,
    originY: 0,
    precision: 0,
  },
  {
    selector: "#poly",
    duration: 1000,
  }
);
```

### Polymorph Attrs

| Name        | Are           | Values  |
| ------------- |:-------------:| -----:|
| d     | svg path  | sting |
| addPoints     | Adds additional points to each side of the tween over what is required  | num |
|  originX   | Is values between 0 and 1 representing 0% to 100% of the bounding box of the path. | num |
| originY     | Is values between 0 and 1 representing 0% to 100% of the bounding box of the path.  | num |
| precision     | The number of decimal places to use when rendering paths  | num |


