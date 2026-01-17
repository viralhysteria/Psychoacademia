import { useEffect, useState, useTransition } from "react";
// ==============================
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// ==============================
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faArrowDownWideShort,
  faFilter,
  faSort,
  faPills,
  faDumbbell,
  faRainbow,
  faWineGlass,
  faLeaf,
  faEye,
  faHatWizard,
  faBrain,
  faCannabis,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import Skeleton from "@/components/Skeleton";

// Category definitions
const CATEGORIES = [
  { r: /mdma|keta.+/i, icon: faPills },
  { r: /sugar|exercise/i, icon: faDumbbell },
  { r: /psychedelic(s)?/i, icon: faRainbow },
  { r: /alcohol|ethanol/i, icon: faWineGlass },
  { r: /psiloc(yb)?in|salvi(a|norin)/i, icon: faLeaf },
  { r: /lys.+\sacid\sdieth.+|(1p-)?lsd/i, icon: faEye },
  { r: /(n,n-)?d(i)?m(ethyl)?t(ryp.+)?|harmal(a|ine)/i, icon: faHatWizard },
  {
    r: /consc.+|nerv.+\ssys.+|dna|brain|gr(a|e)y(-|\s)ma.+|bdnf|5(-)?ht/i,
    icon: faBrain,
  },
  {
    r: /t(etra)?h(ydro)?c(annabinol)?|(?!synthetic\s)cannabi(noid|s)?(s)?|marij.+/i,
    icon: faCannabis,
  },
];

// Get matching icons for a paper title
function getCategoryIcons(text) {
  const matchedIcons = [];

  for (const { r, icon } of CATEGORIES) {
    if (r.test(text)) {
      matchedIcons.push(icon);
    }
  }

  return matchedIcons.length > 0 ? matchedIcons : [faNewspaper];
}

export default function Table() {
  const [activePage, setActivePage] = useState(1);
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const papersPerPage = 50;

  // Filter states
  const [titleFilter, setTitleFilter] = useState("");
  const [journalFilter, setJournalFilter] = useState("");
  const [substanceFilter, setSubstanceFilter] = useState("");

  // Sort states
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortType, setSortType] = useState("title");

  const handlePageSelect = (pageNumber) => {
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
    const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    startTransition(() => {
      setActivePage(validPageNumber);
    });
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
    const displayedPages = totalPages;
    const maxPages = Math.min(totalPages, displayedPages);
    const currentPage = activePage;

    let startPage = 1;
    let endPage = maxPages;

    if (currentPage > Math.floor(displayedPages / 2)) {
      startPage = currentPage - Math.floor(displayedPages / 2);
      endPage = currentPage + Math.ceil(displayedPages / 2) - 1;

      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }
    }

    return Array(endPage - startPage + 1)
      .fill()
      .map((_, index) => startPage + index);
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch("links.json");
        const json = await res.json();
        setPapers(json);
        setFilteredPapers(json);
      } catch (error) {
        console.error("JSON not found", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, []);

  // Apply filters
  const applyFilters = () => {
    startTransition(() => {
      let filtered = [...papers];

      if (titleFilter.trim()) {
        filtered = filtered.filter((paper) =>
          paper.title.toLowerCase().includes(titleFilter.toLowerCase()),
        );
      }

      if (journalFilter.trim()) {
        filtered = filtered.filter(
          (paper) =>
            paper.journal &&
            paper.journal.toLowerCase().includes(journalFilter.toLowerCase()),
        );
      }

      if (substanceFilter.trim()) {
        filtered = filtered.filter(
          (paper) =>
            paper.substance &&
            paper.substance.toLowerCase().includes(substanceFilter.toLowerCase()),
        );
      }

      setFilteredPapers(filtered);
      setActivePage(1);
    });
  };

  // Apply sorting
  const handleSort = (newSortOrder, newSortType) => {
    startTransition(() => {
      if (newSortOrder) setSortOrder(newSortOrder);
      if (newSortType) setSortType(newSortType);

      let sorted = [...filteredPapers];
      const order = newSortOrder || sortOrder;
      const type = newSortType || sortType;

      sorted.sort((a, b) => {
        let valueA, valueB;

        switch (type) {
          case "title":
            valueA = a.title.toLowerCase();
            valueB = b.title.toLowerCase();
            break;
          case "date":
            valueA = a.date || "";
            valueB = b.date || "";
            break;
          case "substance":
            valueA = a.substance || "";
            valueB = b.substance || "";
            break;
          default:
            valueA = a.title.toLowerCase();
            valueB = b.title.toLowerCase();
        }

        if (order === "asc") {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      });

      setFilteredPapers(sorted);
    });
  };

  const startIndex = (activePage - 1) * papersPerPage;
  const endIndex = startIndex + papersPerPage;
  const papersToDisplay = filteredPapers.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <Container style={{ maxWidth: "800px", minHeight: "80vh" }} fluid="sm">
        <Container className="d-flex py-2">
          <div style={{ height: "32px", width: "100%" }}></div>
        </Container>
        <Container>
          <Skeleton count={papersPerPage} />
        </Container>
      </Container>
    );
  }

  return (
    <Container
      style={{
        maxWidth: "800px",
        minHeight: "80vh",
        opacity: isPending ? 0.6 : 1,
        transition: "opacity 0.2s ease",
      }}
      fluid="sm">
      <Container
        className="d-flex align-items-center py-2 px-0"
        style={{ flexWrap: "nowrap", gap: "0.5rem" }}>
        <Pagination
          size="sm"
          className="mb-0 nav-underline"
          style={{ flexShrink: 1, overflow: "hidden" }}>
          <Pagination.First
            onClick={() => handlePageSelect(1)}
            disabled={activePage === 1 || isPending}
          />
          <Pagination.Prev
            onClick={() => handlePageSelect(activePage - 1)}
            disabled={activePage === 1 || isPending}
          />
          {getPageNumbers().map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === activePage}
              onClick={() => handlePageSelect(pageNumber)}
              className="nav-link d-none d-sm-inline-block"
              disabled={isPending}>
              {pageNumber}
            </Pagination.Item>
          ))}
          {/* Show current page on mobile */}
          <Pagination.Item active className="d-sm-none">
            {activePage}
          </Pagination.Item>
          <Pagination.Next
            onClick={() => handlePageSelect(activePage + 1)}
            disabled={
              activePage === Math.ceil(filteredPapers.length / papersPerPage) || isPending
            }
          />
          <Pagination.Last
            onClick={() =>
              handlePageSelect(Math.ceil(filteredPapers.length / papersPerPage))
            }
            disabled={
              activePage === Math.ceil(filteredPapers.length / papersPerPage) || isPending
            }
          />
        </Pagination>
        <div className="d-flex gap-2" style={{ marginLeft: "auto", flexShrink: 0 }}>
          <Dropdown className="filter" align="end" autoClose="outside">
            <Dropdown.Toggle
              size="sm"
              variant="Primary"
              className="fw-semibold rounded"
              disabled={isPending}>
              <span className="fw-semibold">
                <FontAwesomeIcon icon={faFilter} fixedWidth></FontAwesomeIcon>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                <InputGroup>
                  <Form.Control
                    placeholder="Title"
                    aria-label="sortByTitle"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                  />
                </InputGroup>
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                <InputGroup>
                  <Form.Control
                    placeholder="Journal"
                    aria-label="sortByJournal"
                    value={journalFilter}
                    onChange={(e) => setJournalFilter(e.target.value)}
                  />
                </InputGroup>
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                <InputGroup>
                  <Form.Control
                    placeholder="Substance"
                    aria-label="sortBySubstance"
                    value={substanceFilter}
                    onChange={(e) => setSubstanceFilter(e.target.value)}
                  />
                </InputGroup>
              </Dropdown.Item>
              <Dropdown.Item className="text-center">
                <Button
                  type="submit"
                  value="Apply"
                  variant="primary"
                  className="p-0"
                  style={{
                    background: "none",
                    color: "var(--bs-text-color)",
                  }}
                  onClick={applyFilters}>
                  Apply
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end" autoClose="outside">
            <Dropdown.Toggle
              size="sm"
              variant="Primary"
              className="py-0 fw-semibold rounded"
              disabled={isPending}>
              <span className="fw-semibold">
                <FontAwesomeIcon icon={faSort} fixedWidth></FontAwesomeIcon>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                id="sortLabel"
                className="fw-semibold text-decoration-underline"
                disabled>
                Order
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("asc", null)}>
                <FontAwesomeIcon
                  className="me-1"
                  icon={faArrowUpWideShort}
                  fixedWidth></FontAwesomeIcon>
                Ascending
                {sortOrder === "asc" && " ✓"}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("desc", null)}>
                <FontAwesomeIcon
                  className="me-1"
                  icon={faArrowDownWideShort}
                  fixedWidth></FontAwesomeIcon>
                Descending
                {sortOrder === "desc" && " ✓"}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                id="sortLabel"
                className="fw-semibold text-decoration-underline"
                disabled>
                Type
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort(null, "title")}>
                Paper Title
                {sortType === "title" && " ✓"}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort(null, "date")}>
                Date Range
                {sortType === "date" && " ✓"}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort(null, "substance")}>
                Substance
                {sortType === "substance" && " ✓"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
      <Container>
        <ListGroup className="shadow-lg">
          {papersToDisplay.map((paper, index) => {
            const icons = getCategoryIcons(paper.title);

            return (
              <ListGroupItem
                action
                href={paper.url}
                key={`${paper.title}-${index}`}
                target="_blank"
                rel="noopener noreferrer">
                <div className="d-inline-flex gap-2 me-2">
                  {icons.map((icon, i) => {
                    // Extract icon name for CSS class
                    const iconName = icon.iconName;
                    const isRainbow = iconName === "rainbow";

                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={icon}
                        fixedWidth
                        className={`icon-${iconName}`}
                        style={
                          isRainbow
                            ? {
                                background:
                                  "linear-gradient(180deg, #33bfeb 0%, #25db32 28%, #dee021 60%, #de2828 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }
                            : undefined
                        }
                      />
                    );
                  })}
                </div>
                <span>{paper.title}</span>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Container>
    </Container>
  );
}
