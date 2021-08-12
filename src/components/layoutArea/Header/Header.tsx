import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { logoutAuthAction } from "../../../redux/AuthState";
import store from "../../../redux/Store";
import { errorAlert } from "../../../services/commonFunctionService";
import globals from "../../../services/Globals";
import jwtAxios from "../../../services/jwtAxios";
import "./Header.css";
import Logo from "./Logo/Logo";

const Header = (): JSX.Element => {
  const [name, setName] = useState(store.getState().AuthState.auth.name);
  const [wallet, setWallet] = useState(store.getState().AuthState.auth.wallet);
  const history = useHistory();
  useEffect(() => {
    const unsubscribeMe = store.subscribe(() => {
      setName(store.getState().AuthState.auth.name);
      setWallet(store.getState().AuthState.auth.wallet);
    });

    return () => {
      unsubscribeMe();
    };
  }, []);

  const handleBuy = () => {
    jwtAxios.post(globals.urls.localUrl+"api/player/buy")
    .then((response)=>{
      alert("You have: "+ response.data + " Chips.");      
    })
    .catch((error)=>{
      errorAlert(error);
    })
  }
  const handleLogout = () =>{
    if (store.getState().AuthState.auth.currentGame){
      jwtAxios.post(globals.urls.localUrl+"api/game/leave/"+ store.getState().AuthState.auth.currentGame)
          .then(()=>{
            store.dispatch(logoutAuthAction());
            history.push("/login");
          })
          .catch((error)=>{
              errorAlert(error);
          })
    } else {
      store.dispatch(logoutAuthAction());
      history.push("/login");
    }
  }

  const handleLogin = () =>{
    history.push("/login");
  }

  return (
    <div className="Header">
       <div className="LoginClass">
      <Logo />
      </div>
      <h3>TEXAS HOLD'EM</h3>
      <div className="LoginClass">
        {name && <Button variant="contained" onClick={handleBuy}>Buy 1000 Chips</Button>}
        {name && <Button variant="contained" onClick={handleLogout}>Logout</Button>}
        {name && <span>Hello {name} </span>}
        {wallet && <span>Wallet: {wallet} </span>}
        {!name && <Button variant="contained" onClick={handleLogin}>Login</Button>}
        {!name && (
          <span>
            Hello user,
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
