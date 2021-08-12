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
import "./SignUp.css";

const useStyles = makeStyles({
  textfieldInput: {
    color: "lightGray",
  },
  buttonStyle : {textTransform: 'lowercase'}
});

function SignUp(): JSX.Element {
  const history = useHistory();
 
  const onSignup = (data: CredentialsModel) => {
    console.log(data);
    axios
      .post<AuthModel>(globals.urls.localUrl + "api/player/signup", data)
      .then((response) => {
        store.dispatch(loginAuthAction(response.data));
        history.push("/join");
      })
      .catch((error) => {
        errorAlert(error);
      });
  };

const handleSignIn = () =>{
  history.push("/login");
}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>();
  const classes = useStyles();
  

  let signupForm = (
    <div className="SignUpFormDiv">
      <form  onSubmit={handleSubmit(onSignup)} className="LoginForm">
        <Typography component="h1" variant="h6">
          Sign Up
        </Typography>
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
          label="name"
          name="name"
          type="text"
          {...register("name",{
            minLength: {
              value: 3,
              message: "please enter longer name",
            },
          })}
        />
        <br/>
        <span>{errors.name?.message}</span>
        <TextField
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
          name="email"
          {...register("email")}
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
          autoComplete="current-password"
          name="password"
          {...register("password")}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
      <Button className= {classes.buttonStyle} onClick={handleSignIn}>a player already ? SignIn</Button>
    </div>
  );
  return <div className="SignUp">
    <br />
    <br />
    {signupForm}
  </div>;
}

export default SignUp;
