"use client";

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
// ==============================
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
// ==============================
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("theme", theme);
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <Container href="home" fluid="container-lg">
        <Navbar expand="md" style={{ padding: "15px" }}>
          <Container className="py-1 px-2 rounded-pill border">
            <Navbar.Brand
              className="ps-3"
              style={{
                fontWeight: "600",
              }}
            >
              Psychonaut Academia Compendium
            </Navbar.Brand>
            <Nav className="ms-auto">
              <NavDropdown title="Resources">
                <Nav.Link href="https://erowid.org">Erowid</Nav.Link>
                <Nav.Link href="https://bluelight.org">Bluelight</Nav.Link>
                <Nav.Link href="https://reddit.com/r/drugnerds">
                  DrugNerds
                </Nav.Link>
                <Nav.Link href="https://dmt-nexus.me">DMT-Nexus</Nav.Link>
                <Nav.Link href="https://psychonautwiki.org">
                  PsychonautWiki
                </Nav.Link>
              </NavDropdown>
              <Nav.Link>
                <input
                  type="checkbox"
                  id="themeSwitch"
                  className={styles.themeToggle}
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <label
                  htmlFor="themeSwitch"
                  className={styles.themeLabel}
                  style={{ userSelect: "none" }}
                >
                  <FontAwesomeIcon
                    icon={theme === "dark" ? faSun : faMoon}
                    size="1x"
                    className="me-2"
                  />
                </label>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <hr className="m-auto container-fluid" />
    </>
  );
};

export default App;
