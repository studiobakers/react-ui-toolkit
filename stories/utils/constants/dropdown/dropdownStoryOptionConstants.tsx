import "./_dropdown-story-option-constants.scss";

import React from "react";

function CoinDropdownOptionCustomContent({
  id,
  iconSrc,
  price,
  change
}: {
  id: string;
  iconSrc: string;
  price: string;
  change: string;
}) {
  return (
    <div className={"coin-dropdown-option-custom-content"}>
      <img src={iconSrc} />
      <small>{id}</small>
      <span>{price}</span>
      <span>{change}%</span>
    </div>
  );
}

const initialState = {
  basic: {
    options: [
      {
        id: "turkish",
        title: "Turkish"
      },
      {
        id: "english",
        title: "English"
      },
      {
        id: "spanish",
        title: "Spanish"
      },
      {
        id: "french",
        title: "French - Disabled",
        isDisabled: true
      }
    ],
    selectedOption: null
  },
  withSubtitle: {
    options: [
      {
        id: "html",
        title: "HTML",
        subtitle: "HyperText Markup Language"
      },
      {
        id: "css",
        title: "CSS",
        subtitle: "Cascading Style Sheets"
      },
      {
        id: "js",
        title: "JS",
        subtitle: "JavaScript"
      }
    ],
    selectedOption: null
  },
  withContext: {
    options: [
      {
        id: "js",
        title: "JavaScript",
        context: {
          icon: "https://img.icons8.com/dusk/48/000000/javascript-logo.png",
          url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript"
        }
      },
      {
        id: "ts",
        title: "TypeScript",
        context: {
          icon: "https://img.icons8.com/color/48/000000/typescript.png",
          url: "https://www.typescriptlang.org/"
        }
      }
    ],
    selectedOption: null
  },
  withCustomContent: {
    options: [
      {
        id: "btc",
        title: "Bitcoin",
        CustomContent: (
          <CoinDropdownOptionCustomContent
            id={"BTC"}
            iconSrc={"https://img.icons8.com/metro/26/000000/bitcoin.png"}
            price={"$58,223"}
            change={"12.4"}
          />
        )
      },
      {
        id: "eth",
        title: "Ethereum",
        CustomContent: (
          <CoinDropdownOptionCustomContent
            id={"ETH"}
            iconSrc={
              "https://img.icons8.com/fluent-systems-filled/26/000000/ethereum.png"
            }
            price={"$18.064"}
            change={"8.52"}
          />
        )
      },
      {
        id: "ltc",
        title: "Litecoin",
        CustomContent: (
          <CoinDropdownOptionCustomContent
            id={"LTC"}
            iconSrc={"https://img.icons8.com/ios-filled/26/000000/litecoin.png"}
            price={"$224.498"}
            change={"34.26"}
          />
        )
      }
    ],
    selectedOption: null
  }
};

export {initialState};
