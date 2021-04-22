# motorcortex-polymorph

## Demo
[Check it out here](https://kissmybutton.github.io/motorcortex-polymorph/demo/index.html)

## Installation

```bash
$ npm install --save @kissmybutton/motorcortex-polymorph
# OR
$ yarn add @kissmybutton/motorcortex-polymorph
```

## Loading

```javascript
const MotorCortex = require("@kissmybutton/motorcortex/");
const cometsDefinition = require("@kissmybutton/motorcortex-polymorph");
const Plugin = MotorCortex.loadPlugin(BannersDefinition);
```

# Create incident

## Comets

```javascript
const comet = new Plugin.Polymorph(
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

### Comets Attrs

| Name        | Are           | Values  |
| ------------- |:-------------:| -----:|
| d     | svg path  | sting |
| addPoints     | Adds additional points to each side of the tween over what is required  | num |
|  originX   | Is values between 0 and 1 representing 0% to 100% of the bounding box of the path. | num |
| originY     | the minimum size of comets  | num |
| precision     | The list of colors of meteorite  | num |


