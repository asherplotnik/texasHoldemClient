import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthModel from "../../../models/AuthModel";
import CredentialsModel from "../../../models/CredentialsModel";
import { loginAuthAction } from "../../../redux/AuthState";
import store from "../../../redux/Store";
import { errorAlert } from "../../../services/commonFunctionService";
import globals from "../../../services/Globals";
import "./Login.css";

const useStyles = makeStyles({
  textfieldInput: {
    color: "lightGray",
  },
  buttonStyle : {textTransform: 'lowercase'}
});

function Login(): JSX.Element {
  const history = useHistory();
  const onSignin = (data: CredentialsModel) => {
    axios
      .get<AuthModel>(globals.urls.localUrl + "api/player/login", {
        headers: { email: data.email, password: data.password },
      })
      .then((response) => {
        store.dispatch(loginAuthAction(response.data));
        if(response.data.currentGame){
          history.push("/game/"+response.data.currentGame)
        } else {
          history.push("/join");
        }
      })
      .catch((error) => {
        errorAlert(error);
      });
  };

 
  const handleSignUp = () => {
    history.push("/signUp");
  };
  const {
    register,
    handleSubmit
  } = useForm<CredentialsModel>();
  const classes = useStyles();
  let loginForm = (
    <div className="LoginFormDiv">
      <form onSubmit={handleSubmit(onSignin)} className="LoginForm">
        <Typography component="h1" variant="h6">
          Sign in
        </Typography>
        <TextField
          name="email"
          {...register("email")}
          className="TextfieldClass"
          InputProps={{
            className: classes.textfieldInput,
          }}
          InputLabelProps={{
            className: classes.textfieldInput,
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="email"
          type="email"
          autoFocus
        />
        <TextField
          className="TextfieldClass"
          InputLabelProps={{
            className: classes.textfieldInput,
          }}
          InputProps={{
            className: classes.textfieldInput,
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="password"
          type="password"
          name="password"
          {...register("password")}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
      <Button className= {classes.buttonStyle} onClick={handleSignUp}>Not a player yet? SignUp</Button>
    </div>
  );

  
  return <div className="Login">
    <br />
    <br />
    {loginForm}
  </div>;
}

export default Login;
