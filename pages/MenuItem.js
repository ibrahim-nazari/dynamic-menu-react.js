import React from "react";
import { ListGroupItem } from "reactstrap";

const MenuItem = ({ handleDelete, selectParent, menu, updateMenu }) => {
  return (
    <ListGroupItem
      key={menu.name}
      onClick={() => updateMenu(menu.name)}
      className={`${menu.name == selectParent && "selected_menu"} list__menu`}
    >
      {menu.label}{" "}
      <img
        onClick={() => handleDelete(menu.name)}
        className="ml-2"
        src="/delete.svg"
        alt="trash button"
      />
    </ListGroupItem>
  );
};

export default MenuItem;
