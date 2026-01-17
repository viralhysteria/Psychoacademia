import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
// ==============================
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBahai,
  faCapsules,
  faFlask,
  faGhost,
  faEye,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const currentTheme = document.documentElement.getAttribute("data-bs-theme");
      return currentTheme || "light";
    }
    return "light";
  });

  const [expanded, setExpanded] = useState(false);
  const [isBrandSm, setIsBrandSm] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const BrandLabel = ({ brand, breakpoint }) => {
    const handleBrandWidth = () => {
      setIsBrandSm(window.innerWidth <= breakpoint);
    };

    const handleBrandExpandState = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {
      handleBrandWidth();

      window.addEventListener("resize", handleBrandWidth);

      return () => {
        window.removeEventListener("resize", handleBrandWidth);
      };
    }, []);

    const brandLabel =
      isBrandSm && !expanded ? (
        <>
          {brand
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase())
            .join("")}
        </>
      ) : (
        brand
      );

    return (
      <span
        onClick={handleBrandExpandState}
        className={expanded ? "brand expanded" : "brand"}>
        {brandLabel}
      </span>
    );
  };

  return (
    <Navbar
      id="nav"
      className="w-100 p-0 border-bottom shadow-sm"
      style={{
        background: "var(--bs-secondary-bg)",
        transition: "background 0.3s linear, border 0.3s linear",
      }}>
      <Container className="p-2" fluid>
        <Navbar.Brand
          className="fw-semibold ms-2"
          style={{ color: "var(--bs-body-color)" }}>
          <BrandLabel brand="Psychonaut Academia Compendium" breakpoint="768" />
        </Navbar.Brand>
        <Nav className="ms-auto resources" id="resources">
          <NavDropdown
            className="py-0"
            align="end"
            drop="down"
            title={<FontAwesomeIcon icon={faBars} fixedWidth></FontAwesomeIcon>}>
            <Dropdown.Item
              id="sortLabel"
              className="fw-semibold text-decoration-underline"
              disabled>
              Resources
            </Dropdown.Item>
            <Nav.Link href="https://erowid.org">
              <FontAwesomeIcon icon={faBahai} fixedWidth></FontAwesomeIcon>
              Erowid
            </Nav.Link>
            <Nav.Link href="https://bluelight.org">
              <FontAwesomeIcon icon={faCapsules} fixedWidth></FontAwesomeIcon>
              Bluelight
            </Nav.Link>
            <Nav.Link href="https://reddit.com/r/drugnerds">
              <FontAwesomeIcon icon={faFlask} fixedWidth></FontAwesomeIcon>
              DrugNerds
            </Nav.Link>
            <Nav.Link href="https://dmt-nexus.me">
              <FontAwesomeIcon icon={faGhost} fixedWidth></FontAwesomeIcon>
              DMT-Nexus
            </Nav.Link>
            <Nav.Link href="https://psychonautwiki.org">
              <FontAwesomeIcon icon={faEye} fixedWidth></FontAwesomeIcon>
              PsychonautWiki
            </Nav.Link>
          </NavDropdown>
          <Nav.Link as="div">
            <input
              type="checkbox"
              id="themeSwitch"
              style={{ top: "0", display: "none" }}
              checked={theme === "dark"}
              onChange={toggleTheme}
              aria-label="themeSwitcher"
            />
            <label
              htmlFor="themeSwitch"
              style={{
                display: "inline",
                userSelect: "none",
                cursor: "pointer",
              }}>
              <FontAwesomeIcon
                icon={theme === "dark" ? faSun : faMoon}
                size="1x"
                fixedWidth
              />
            </label>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
