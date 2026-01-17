import { memo, useMemo } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function Skeleton({ count = 50 }) {
  const skeletonItems = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count],
  );

  return (
    <ListGroup className="shadow-lg">
      {skeletonItems.map((i) => (
        <ListGroupItem
          key={i}
          className="skeleton-item"
          style={{
            height: "42px",
            background:
              "linear-gradient(90deg, var(--bs-secondary-bg) 25%, var(--bs-tertiary-bg) 50%, var(--bs-secondary-bg) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite",
            border: "1px solid var(--bs-border-color)",
          }}>
          <div
            style={{
              height: "16px",
              width: "70%",
              background: "var(--bs-tertiary-bg)",
              borderRadius: "4px",
            }}></div>
        </ListGroupItem>
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </ListGroup>
  );
}

export default memo(Skeleton);
