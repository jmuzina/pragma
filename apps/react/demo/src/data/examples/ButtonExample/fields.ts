import { ROOT_CATEGORY } from "data/fields.js";

const sections: FieldsSection[] = [
  ROOT_CATEGORY,
  {
    title: "Misc",
    fields: [
      {
        name: "numButtons",
        label: "Number of buttons",
        inputType: "range",
        min: 1,
        max: 5,
        defaultValue: 1,
        disabledOutputFormats: {
          css: true,
        },
      },
    ],
  },
];

export default sections;
