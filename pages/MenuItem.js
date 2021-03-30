import React from "react";
import { ListGroupItem } from "reactstrap";

const MenuItem = ({
  handleDelete,
  selectParent,
  menu,
  updateMenu,
  index,
  indent,
}) => {
  return (
    <ListGroupItem
      key={menu.name}
      onClick={() => updateMenu(menu.name, index)}
      className={`${menu.name == selectParent[0] && "selected_menu"} ${
        indent && "indentSubMenu"
      } list__menu`}
    >
      {menu.label}{" "}
      <img
        onClick={() => handleDelete(index)}
        className="ml-2"
        src="/delete.svg"
        alt="trash button"
      />
    </ListGroupItem>
  );
};

export default MenuItem;
