"use client";

import { Suspense } from "react";
import Container from "react-bootstrap/Container";

import Header from "@/components/Header";
import Table from "@/components/Table";
import Footer from "@/components/Footer";
import Skeleton from "@/components/Skeleton";

function TableSkeleton() {
  return (
    <Container style={{ maxWidth: "800px", minHeight: "80vh" }} fluid="sm">
      <Container className="d-flex py-2">
        <div style={{ height: "32px", width: "100%" }}></div>
      </Container>
      <Container>
        <Skeleton count={50} />
      </Container>
    </Container>
  );
}

const App = () => {
  return (
    <Container id="home" className="p-0" fluid>
      <div className="background"></div>
      <Header />
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
      <Footer />
    </Container>
  );
};

export default App;
