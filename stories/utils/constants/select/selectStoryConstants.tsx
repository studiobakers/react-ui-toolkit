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
    selectedOption: null as {id: string; isDisabled?: boolean; title: string} | null
  },
  multiSelect: {
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
    ] as {id: string; isDisabled?: boolean; title: string}[],
    value: [] as {id: string; isDisabled?: boolean; title: string}[]
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
    selectedOption: null as {id: string; isDisabled?: boolean; subtitle: string} | null
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
    selectedOption: null as {
      id: string;
      title?: string;
      CustomContent: JSX.Element;
    } | null
  }
};

export {initialState};
