import { useSearchParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";

function DetailsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("details");

  return <div>ID: {id}</div>;
}

export default DetailsPage;
