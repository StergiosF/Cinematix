import { useParams } from "react-router-dom";
import styles from "./OverviewPage.module.css";

function OverviewPage() {
  const { item } = useParams();

  return <div>{item}</div>;
}

export default OverviewPage;
