import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <Container className="px-2 px-sm-4" fluid>
      <footer>
        <Navbar className="breadcrumb p-1 mb-0">
          <Container className="p-0 mw-100 flex-wrap flex-sm-nowrap">
            <span className="d-none d-md-block"></span>
            <Nav.Link
              className="breadcrumb-item order-1 order-sm-0"
              href="https://github.com/viralhysteria/Psychoacademia"
              target="_blank"
              rel="noopener noreferrer">
              <b>Source</b>
            </Nav.Link>
            <Nav.Item className="breadcrumb-item d-none d-sm-block order-2">
              <span>
                {"Made with "}
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}>
                  <b>
                    <ins>react</ins>
                  </b>
                </a>
                {" + "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}>
                  <b>
                    <ins>nextjs</ins>
                  </b>
                </a>
              </span>
            </Nav.Item>
            <Nav.Link
              className="mx-auto order-3 d-none d-md-block"
              style={{ bottom: "5px" }}
              disabled>
              <span style={{ fontSize: "0.75rem" }}>
                <b>Last Updated:</b> 01/16/2026 (c83hgqa0fzgv5)
              </span>
            </Nav.Link>
            <Nav.Link href="#home" className="ms-auto my-2 fs-6 fw-semibold order-4">
              <span className="d-none d-sm-inline">Return to Top </span>
              <FontAwesomeIcon icon={faArrowTurnUp} fixedWidth></FontAwesomeIcon>
            </Nav.Link>
          </Container>
        </Navbar>
      </footer>
    </Container>
  );
}
