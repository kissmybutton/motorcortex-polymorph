import Polymorph from "./Incidents/Polymorph";

import { name, version } from "../package.json";

export default {
  npm_name: name, // don't touch this
  version: version, // don't touch this
  incidents: [
    {
      exportable: Polymorph,
      name: "Polymorph",
      attributesValidationRules: {
        animatedAttrs: {
          type: "object",
          props: {
            d: {
              optional: false,
              type: "string",
            },
          },
        },
        addPoints: {
          optional: true,
          type: "number",
          min: 0,
        },
        originX: {
          optional: true,
          type: "number",
          min: 0,
          max: 1,
        },
        originY: {
          optional: true,
          type: "number",
          min: 0,
          max: 1,
        },
        precision: {
          optional: true,
          type: "number",
          min: 0,
          max: 100,
        },
      },
    },
  ],
};
