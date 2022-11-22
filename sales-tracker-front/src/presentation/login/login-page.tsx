import { Button, Paper, TextField } from "@mui/material";
import { useState } from 'react';
import { login, token } from "../../api/auth/login";
import global from "../../app.module.css";
import {useNavigate} from "react-router-dom";
export function LoginPage() {
  // store user and password
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
    await login(user, password);
    if (token)
    {
      console.log("Login efetuado com sucesso!");
      navigate("/promos");
    } else {
      console.log("Login falhou!");
      }
    } catch (e) {
      console.log("Login falhou!");
    }
  };

  return (
    <Paper className={global.paper}>
      <h1>Sales Tracker - Login</h1>
      <TextField label="Usuário" sx={{ width: '100%' }}
        onChange={(event) => {
          setUser(event.target.value);
        }}
      />
      <TextField label="Senha" sx={{ width: '100%' }}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div>
        <Button variant="contained"
          onClick={handleLogin}
        >Entrar</Button>
        <span> </span>
        <Button variant="contained" onClick={() => (navigate("/promos"))}> Promos </Button>
      </div>
    </Paper>
  )
}