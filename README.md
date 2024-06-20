# MotorCortex-Polymorph

**Table of Contents**

- [MotorCortex-Polymorph](#motorcortex-polymorph)
  - [Demo](#demo)
- [Intro / Features](#intro--features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Importing and Loading](#importing-and-loading)
- [Creating Incidents](#creating-incidents)
  - [Polymorph](#polymorph)
- [Adding Incidents in your clip](#adding-incidents-in-your-clip)
- [Contributing](#contributing)
- [License](#license)
- [Sponsored by](#sponsored-by)

## Demo
[Check it out here](https://donkeyclip.github.io/motorcortex-polymorph/demo/index.html)

# Intro / Features
MotorCortex-Polymorph brings the capabilities of [Polymorph](https://notoriousb1t.github.io/polymorph-docs/) Library into MotorCortex. With this plugin you can morph a shape to another shape.

This Plugin exposes one Incident:
- Polymorph

# Getting Started
## Installation

```bash
$ npm install --save @donkeyclip/motorcortex-polymorph
# OR
$ yarn add @donkeyclip/motorcortex-polymorph
```

## Importing and loading

```javascript
import { loadPlugin } from "@donkeyclip/motorcortex/";
import polymorphDefinition from "@donkeyclip/motorcortex-polymorph";
const PM = loadPlugin(polymorphDefinition);
```

# Creating Incidents

## Polymorph

```javascript
const polymorph = new PM.Polymorph(
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

| Name      |                                        Are                                         | Values |
| --------- | :--------------------------------------------------------------------------------: | -----: |
| d         |                                      svg path                                      | string |
| addPoints |       Adds additional points to each side of the tween over what is required       |    num |
| originX   | Accepts values between 0 and 1 representing 0% to 100% of the bounding box of the path. |    num |
| originY   | Accepts values between 0 and 1 representing 0% to 100% of the bounding box of the path. |    num |
| precision |              The number of decimal places to use when rendering paths              |    num |

# Adding Incidents in your clip

```javascript
clip.addIncident(incidentName,startTime);
```

# Contributing 

In general, we follow the "fork-and-pull" Git workflow, so if you want to submit patches and additions you should follow the next steps:
1.	**Fork** the repo on GitHub
2.	**Clone** the project to your own machine
3.	**Commit** changes to your own branch
4.	**Push** your work back up to your fork
5.	Submit a **Pull request** so that we can review your changes

# License

[MIT License](https://opensource.org/licenses/MIT)

# Sponsored by
[<img src="https://presskit.donkeyclip.com/logos/donkey%20clip%20logo.svg" width=250></img>](https://donkeyclip.com)

