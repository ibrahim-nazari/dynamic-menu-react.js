import React from "react";
import MenuItem from "./MenuItem";

const MenuItems = ({ onhandleDelete, selectParent, onupdateMenu, menu }) => {
  if (menu.children) {
    return (
      <ListGroup key={menu.name}>
        <MenuItem
          handleDelete={onhandleDelete}
          selectParent={selectParent}
          menu={menu}
          updateMenu={onupdateMenu}
        />
        {menu.children.map((subMenu) => (
          <>{handlerLevelTwo(subMenu)}</>
        ))}
      </ListGroup>
    );
  }

  return (
    <MenuItem
      handleDelete={onhandleDelete}
      selectParent={selectParent}
      menu={menu}
      updateMenu={onupdateMenu}
    />
  );
};

export default MenuItems;
