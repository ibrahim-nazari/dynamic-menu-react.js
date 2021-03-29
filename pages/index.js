import React, { useState } from "react";
import ComputerIcon from "@material-ui/icons/Computer";
import RouterIcon from "@material-ui/icons/Router";
import { ToastContainer, toast } from "react-toastify";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  Label,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import { FormGroup } from "@material-ui/core";
import MenuItem from "./MenuItem";

// computer  children laptop desktop  children Dell lenevo

function App() {
  const menuLists = [
    {
      name: "computer",
      label: "Computer",
      Icon: ComputerIcon,
      children: [
        {
          name: "laptop",
          label: "Laptops",
          children: [
            {
              name: "lenevo",
              label: "lenevo",
              children: [{ name: "idealpad", label: "IdealPad" }],
            },
          ],
        },
        {
          name: "desktop",
          label: "Desktops",
          children: [
            {
              name: "dell",
              label: "Dell",
              children: [{ name: "del2020", label: "Dell 2020" }],
            },
          ],
        },
      ],
    },
    {
      name: "network",
      label: "Network",
      Icon: RouterIcon,
    },
  ];
  const handlerLevelThree = (menu) => {
    if (menu.children) {
      return (
        <ListGroup key={menu.name} className="indentSubMenu">
          <MenuItem
            handleDelete={onhandleDelete}
            selectParent={selectParent}
            menu={menu}
            updateMenu={onupdateMenu}
          />
          {menu.children.map((subMenu) => (
            <MenuItem
              handleDelete={onhandleDelete}
              selectParent={selectParent}
              menu={subMenu}
              updateMenu={onupdateMenu}
            />
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

  const handlerLevelTwo = (menu) => {
    if (menu.children) {
      return (
        <ListGroup className="indentSubMenu" key={menu.name}>
          <MenuItem
            handleDelete={onhandleDelete}
            selectParent={selectParent}
            menu={menu}
            updateMenu={onupdateMenu}
          />
          {menu.children.map((subMenu) => (
            <> {handlerLevelThree(subMenu)}</>
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
  const handlerLevelOne = (menu) => {
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
  const [selectParent, setSelectParent] = useState("");
  const [menu, setMenu] = useState("");
  const [link, setLink] = useState("");
  const [root, setRoot] = useState("");
  const onupdateMenu = (val) => {
    setRoot("");
    setSelectParent(val);
    console.log(val);
  };
  const submitMenu = (e) => {
    e.preventDefault();
    if (selectParent == "" && root == "") {
      toast.error("Please select a parent");
    }
    console.log(root);
  };
  const onhandleDelete = () => {};
  return (
    <Container fluid="sm" className="mt-5">
      <ToastContainer />
      <Row xs="1" sm="2">
        <Col>
          <Form onSubmit={submitMenu}>
            <FormGroup className="mt-2">
              <Label for="menu" className="mr-sm-2">
                Name
              </Label>

              <Input
                type="text"
                id="menu"
                onChange={(e) => setMenu(e.target.value)}
                placeholder="menu"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label htmlFor="link" className="mr-sm-2">
                Link
              </Label>

              <Input
                type="text"
                id="link"
                onChange={(e) => setLink(e.target.value)}
                placeholder="link"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Button>Add</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col sm={{ size: "auto", offset: 1 }}>
          <Col>
            <Input
              type="checkbox"
              value="root"
              onChange={(e) => setRoot(e.target.value)}
            />{" "}
            <label>Root menu</label>
          </Col>
          <ListGroup className="list__group">
            {menuLists.map((menu) => (
              <>
                <ListGroupItem>{handlerLevelOne(menu)}</ListGroupItem>
              </>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
