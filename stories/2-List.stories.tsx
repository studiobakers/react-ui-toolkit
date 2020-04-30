import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import List from "../src/list/List";

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
      <li className={"list-item-placeholder"} />
      <li className={"list-item-placeholder"} />
      <li className={"list-item-placeholder"} />

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
    <li className={"list-item"}>
      {user.name} <small>{user.email}</small>
    </li>
  );
}

storiesOf("List", module)
  .add("Has Items", () => (
    <Fragment>
      <List testid={"users-list"} items={users}>
        {(item) => <UserListItem user={item} />}
      </List>

      {style}
    </Fragment>
  ))
  .add("Has Placeholder", () => (
    <Fragment>
      <List
        testid={"users-list"}
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
        testid={"users-list"}
        items={emptyUsers}
        emptyStateProps={{
          shouldDisplayEmptyState: true,
          emptyState: "Sorry, there are no users"
        }}>
        {(item) => <UserListItem user={item} />}
      </List>
    </Fragment>
  ));
