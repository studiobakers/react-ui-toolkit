import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import List from "../src/list/List";
import ListItem from "../src/list/item/ListItem";
import {useState} from "@storybook/addons";
import StateProvider from "./utils/StateProvider";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com"
  },
  {
    id: 3,
    name: "Harry Doe",
    email: "harry@doe.com"
  }
];
const emptyUsers = [];

const style = (
  <style>
    {`
      .list-item {
        margin-bottom: 20px;
        padding: 20px;

        border: 1px solid lightgrey;
      }
    `}
  </style>
);

function renderPlaceholders() {
  return (
    <Fragment>
      <ListItem customClassName={"list-item-placeholder"} />
      <ListItem customClassName={"list-item-placeholder"} />
      <ListItem customClassName={"list-item-placeholder"} />

      <style>
        {`
          .list-item-placeholder {
            height: 60px;

            margin-bottom: 20px;

            background: lightgrey;

            animation: opacityAnimation 1s infinite;
          }

          @keyframes opacityAnimation {
            0% {
              opacity: 1;
            }
          
            50% {
              opacity: 0.7;
            }
          
            100% {
              opacity: 1;
            }
          }
          
        `}
      </style>
    </Fragment>
  );
}

function UserListItem({user}) {
  return (
    <ListItem>
      {user.name} <small>{user.email}</small>
    </ListItem>
  );
}

function ClickableUserListItem({user}) {
  return (
    <StateProvider initialState={{displayEmail: false}}>
      {(state, setState) => (
        <ListItem
          clickableListItemProps={{
            onClick: () => {
              setState({displayEmail: !state.displayEmail});
            }
          }}>
          Click to toggle <em>{user.name}</em>`s email address
          {state.displayEmail && <strong>{` ${user.email}`}</strong>}
        </ListItem>
      )}
    </StateProvider>
  );
}

storiesOf("List", module)
  .add("Has Items", () => (
    <Fragment>
      <List items={users}>{(item) => <UserListItem user={item} />}</List>

      {style}
    </Fragment>
  ))
  .add("Has Placeholder", () => (
    <Fragment>
      <List
        items={emptyUsers}
        placeholderProps={{
          shouldDisplayPlaceholder: true,
          placeholder: renderPlaceholders()
        }}>
        {(item) => <UserListItem user={item} />}
      </List>

      {style}
    </Fragment>
  ))
  .add("Empty State", () => (
    <Fragment>
      <List
        items={emptyUsers}
        emptyStateProps={{
          shouldDisplayEmptyState: true,
          emptyState: "Sorry, there are no users"
        }}>
        {(item) => <UserListItem user={item} />}
      </List>
    </Fragment>
  ))
  .add("Clickable Items", () => (
    <Fragment>
      <List items={users}>{(item) => <ClickableUserListItem user={item} />}</List>

      {style}
    </Fragment>
  ));
