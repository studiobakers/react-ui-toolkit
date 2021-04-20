import React from "react";

const verticalToggleClass = (
  <style>{`
.toggle-vertically {
  height: 400px;
}
`}</style>
);

const toggleOptions = {
  switchOptions: [
    {
      id: "on",
      title: "On"
    },
    {
      id: "off",
      title: "Off"
    }
  ],
  deviceOptions: [
    {
      id: "mobile",
      title: "Mobile"
    },
    {
      id: "tablet",
      title: "Tablet"
    },
    {
      id: "notebook",
      title: "Notebook",
      isDisabled: true
    },
    {
      id: "desktop",
      title: "Desktop"
    }
  ],
  frameworkOptions: [
    {
      id: "vue",
      title: "Vue",
      icon: <img src={"https://img.icons8.com/color/48/000000/vue-js.png"} />
    },
    {
      id: "react",
      title: "React",
      icon: <img src={"https://img.icons8.com/plasticine/48/000000/react.png"} />
    },
    {
      id: "angular",
      title: "Angular",
      icon: <img src={"https://img.icons8.com/color/48/000000/angularjs.png"} />
    }
  ]
};

export {toggleOptions, verticalToggleClass};
