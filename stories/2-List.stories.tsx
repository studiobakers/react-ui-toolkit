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

function renderPlaceolders() {
  return (
    <Fragment>
      <div className={"list-item-placeholder"} />
      <div className={"list-item-placeholder"} />
      <div className={"list-item-placeholder"} />

      <style>
        {`
          .list-item-placeholder {
            height: 60px;

            margin-bottom: 20px;

            background: lightgrey;
          }
        `}
      </style>
    </Fragment>
  );
}

function UserListItem({user}) {
  return (
    <div className={"list-item"}>
      {user.name} <small>{user.email}</small>
    </div>
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
        isPending={true}
        placeholders={renderPlaceolders()}
        canDisplayPlaceholder={true}>
        {(item) => <UserListItem user={item} />}
      </List>

      {style}
    </Fragment>
  ))
  .add("Pending State", () => (
    <Fragment>
      <List isPending={true} items={emptyUsers}>
        {(item) => <UserListItem user={item} />}
      </List>
    </Fragment>
  ))
  .add("Empty State", () => (
    <Fragment>
      <List
        items={emptyUsers}
        emptyStateMessage={"Sorry, there are no users"}
        emptyStateButtonText={"Create User"}
        onEmptyStateButtonClick={() => alert("Thank you")}
        canDisplayEmptyState={true}>
        {(item) => <UserListItem user={item} />}
      </List>
    </Fragment>
  ));
