import React, { useEffect, useState } from "react";
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
  const [menuLists, setMenuLists] = useState([
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
      children: [],
    },
  ]);

  const handlerLevelThree = (menu, indexOne, indexTwo, indexThree) => {
    if (menu.children) {
      return (
        <ListGroup key={menu.name} className="indentSubMenu">
          <MenuItem
            handleDelete={onhandleDelete}
            selectParent={selectParent}
            index={[indexOne, indexTwo, indexThree]}
            menu={menu}
            updateMenu={onupdateMenu}
          />
          {menu.children.map((subMenu, indexFour) => (
            <MenuItem
              handleDelete={onhandleDelete}
              selectParent={selectParent}
              menu={subMenu}
              index={[indexOne, indexTwo, indexThree, indexFour]}
              updateMenu={onupdateMenu}
              indent={true}
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
        index={[indexOne, indexTwo, indexThree]}
        updateMenu={onupdateMenu}
      />
    );
  };

  const handlerLevelTwo = (menu, indexOne, indexTwo) => {
    if (menu.children) {
      return (
        <ListGroup className="indentSubMenu" key={menu.name}>
          <MenuItem
            handleDelete={onhandleDelete}
            selectParent={selectParent}
            menu={menu}
            index={[indexOne, indexTwo]}
            updateMenu={onupdateMenu}
          />
          {menu.children.map((subMenu, indexThree) => (
            <> {handlerLevelThree(subMenu, indexOne, indexTwo, indexThree)}</>
          ))}
        </ListGroup>
      );
    }

    return (
      <MenuItem
        handleDelete={onhandleDelete}
        selectParent={selectParent}
        menu={menu}
        index={[indexOne, indexTwo]}
        updateMenu={onupdateMenu}
      />
    );
  };
  const handlerLevelOne = (menu, indexOne) => {
    if (menu.children) {
      return (
        <ListGroup key={menu.name}>
          <MenuItem
            handleDelete={onhandleDelete}
            selectParent={selectParent}
            menu={menu}
            index={[indexOne]}
            updateMenu={onupdateMenu}
          />
          {menu.children.map((subMenu, indexTwo) => (
            <>{handlerLevelTwo(subMenu, indexOne, indexTwo)}</>
          ))}
        </ListGroup>
      );
    }

    return (
      <MenuItem
        handleDelete={onhandleDelete}
        selectParent={selectParent}
        menu={menu}
        index={[indexOne]}
        updateMenu={onupdateMenu}
      />
    );
  };
  const [selectParent, setSelectParent] = useState([]);
  const [menu, setMenu] = useState("");

  const onupdateMenu = (val, index) => {
    setRoot(false);
    setSelectParent([val, index]);
  };
  const [link, setLink] = useState("");
  const [root, setRoot] = useState("");
  const submitMenu = (e) => {
    e.preventDefault();
    if ((selectParent.length < 1 && !root) || link == "" || menu == "") {
      toast.error("Please select a parent");
      return false;
    }

    let newMenulist = menuLists;
    console.log(selectParent);
    let index = selectParent[1];
    let text = menu.toLowerCase();
    const fUpper = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    let item = {
      name: text,
      label: fUpper(text),
      link,
      Icon: "",
      children: [],
    };
    console.log(newMenulist[index[0]]);
    if (root) {
      newMenulist.push(item);
    } else if (index.length == 1) {
      newMenulist[index[0]].children.push(item);
    } else if (index.length == 2) {
      newMenulist[index[0]].children[index[1]].children.push(item);
    } else if (index.length == 3) {
      newMenulist[index[0]].children[index[1]].children[index[2]].children.push(
        item
      );
    }
    setMenuLists([...newMenulist]);
  };
  const onhandleDelete = (index) => {
    let newMenulist = menuLists;
    if (index.length == 1) {
      newMenulist.splice([index[0]], 1);
    } else if (index.length == 2) {
      newMenulist[index[0]].children.splice(index[1], 1);
    } else if (index.length == 3) {
      newMenulist[index[0]].children[index[1]].children.splice(index[2], 1);
    } else if (index.length == 4) {
      newMenulist[index[0]].children[index[1]].children[
        index[2]
      ].children.splice(index[3], 1);
    }
    setMenuLists([...newMenulist]);
  };

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
              checked={root}
              onChange={(e) => {
                setRoot(e.target.checked);
                setSelectParent(["", []]);
              }}
            />{" "}
            <label>Root menu</label>
          </Col>
          <ListGroup className="list__group">
            {menuLists.map((menu, indexOne) => (
              <>
                <ListGroupItem>{handlerLevelOne(menu, indexOne)}</ListGroupItem>
              </>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
