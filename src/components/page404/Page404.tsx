import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const Page404 = (): JSX.Element => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div>
      <br />
      <h2>The page you are looking for doesn't exist.</h2>
      <Button onClick={handleClick}>Return to home</Button>
    </div>
  );
};

export default Page404;
