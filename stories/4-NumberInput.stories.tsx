import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import StateProvider from "./utils/StateProvider";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";

storiesOf("Number Input", module)
  .add("Number Input", () => (
    <Fragment>
      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField label={"Price – maximumFractionDigits={2}"}>
              <Input
                localizationOptions={{maximumFractionDigits: 2}}
                name={"price"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
                placeholder={"$ 10"}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>

      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <br />

            <FormField
              label={"Price - Has Error"}
              errorMessages={["Please enter a valid price"]}>
              <Input
                localizationOptions={{maximumFractionDigits: 2}}
                name={"price"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
                placeholder={"$ 10"}
                hasError={true}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>
    </Fragment>
  ))
  .add("Number Input with maximumFractionDigit", () => (
    <Fragment>
      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField label={"Price (BTC) – maximumFractionDigits={8}"}>
              <Input
                localizationOptions={{maximumFractionDigits: 8}}
                name={"price"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
                placeholder={"Min. ₿ 0.00000001"}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField
              label={
                "ID or Passport Number – maxFractionDigits={0} - Can have leading zeros"
              }>
              <Input
                name={"id-number"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>
    </Fragment>
  ))
  .add("Number Input with shouldFormatToLocaleString", () => (
    <Fragment>
      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField
              label={
                "Wallet ($) – maximumFractionDigits={2} - shouldFormatToLocaleString={true}"
              }>
              <Input
                name={"wallet"}
                localizationOptions={{
                  maximumFractionDigits: 2,
                  shouldFormatToLocaleString: true
                }}
                type={"number"}
                placeholder={"$ 1,000"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField
              label={
                "World Population – maximumFractionDigits={0} - shouldFormatToLocaleString={true}"
              }>
              <Input
                name={"world-population"}
                type={"number"}
                placeholder={"7,794,798,739"}
                localizationOptions={{shouldFormatToLocaleString: true}}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>
    </Fragment>
  ))
  .add("Number Input with locale", () => (
    <Fragment>
      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField
              label={
                'Budget (Locale) – maximumFractionDigits={4} - shouldFormatToLocaleString={true} - locale={"zh-Hans-CN-u-nu-hanidec"}'
              }>
              <Input
                name={"world-population"}
                type={"number"}
                localizationOptions={{
                  maximumFractionDigits: 4,
                  shouldFormatToLocaleString: true,
                  locale: "zh-Hans-CN-u-nu-hanidec"
                }}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={""}>
        {(state, setState) => (
          <Fragment>
            <FormField
              label={
                'Budget (Locale) – maximumFractionDigits={4} - shouldFormatToLocaleString={true} - locale={"tr"}'
              }>
              <Input
                name={"world-population"}
                type={"number"}
                localizationOptions={{
                  maximumFractionDigits: 4,
                  shouldFormatToLocaleString: true,
                  locale: "tr"
                }}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
              />
            </FormField>

            <p>{`event.currentTarget.value: ${state}`}</p>
          </Fragment>
        )}
      </StateProvider>
    </Fragment>
  ));
