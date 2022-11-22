import { Search } from "@mui/icons-material";
import {Button, IconButton, Modal, Paper, TextField} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from 'react';
import { getPromos } from "../../api/promos/get_promos";
import { IPromo } from "../../api/promos/promo";
import global from "../../app.module.css";
import styles from "./promos.module.css";
import {useNavigate} from "react-router-dom";

import {logout, token} from "../../api/auth/login";

const columns: GridColDef[] = [
  {field: 'id', hide: true},
  {field: 'id_produto', hide: true},
  {field: 'nome', headerName: 'Promoção', width: 500},
  {field: 'data_validade', headerName: 'Validade', width: 120, valueFormatter: (params) => new Date(params.value).toLocaleDateString("pt-BR")},
  {field: 'type', headerName: 'Tipo', width: 150},
  {field: 'valor', headerName: 'Valor', width: 200},
  {field: 'quantidade', headerName: 'Quantidade', width: 200},
];

export function PromosPage() {
  // call api
  const [promos, setPromos] = useState<IPromo[]>([]);
  useEffect(() => {
    getPromos().then((promos)=>{
      console.log(promos);
      // Map all promos _id to id
      const promosWithId = promos.map((promo) => {
        return {
          ...promo,
          id: promo._id, type:promo.tipo.tipo, valor:promo.tipo.valor, quantidade:promo.tipo.quantidade
        }
      })
      setPromos(promosWithId);
    });
  }, []);

  const navigate = useNavigate();

  const [editModalOpenState, setEditModalOpenState] = useState(false);
  const [disableModalOpenState, setDisableModalOpenState] = useState(false);

  return(
    <div className={global.page}>
      <Paper className={global.paper}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h1>Promoções</h1>
          </div>
          <div className={styles.search}>
            <TextField
              label="Buscar ID"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>)
              }}
            />
            {token ?
              <>
                <Button variant={"contained"} onClick={() => (logout().then(() => (navigate("/"))))}>Logout</Button>
                <Button variant={"contained"} onClick={() => (setEditModalOpenState(true))}> Editar </Button>
                <Button variant={"contained"} onClick={() => (setDisableModalOpenState(true))}> Desativar </Button>
              </>
              :
              <Button variant={"contained"} onClick={() => (navigate("/"))}>Login</Button>
            }
          </div>
        </div>
        <div>
          <DataGrid columns={columns} rows={promos} className={styles.grid}/>
        </div>
      </Paper>

      <Modal open={editModalOpenState} onClose={() => setEditModalOpenState(false)} className={styles.popup}>
        <div className={styles.modal}>
          <h1>Editar</h1>
          <TextField label="ID" />
          <TextField label="Nome" />
          <TextField label="Data de validade" />
          <TextField label="Tipo" />
          <TextField label="Valor" />
          <TextField label="Quantidade" />
          <Button variant={"contained"}>Salvar</Button>
        </div>
      </Modal>
      <Modal open={disableModalOpenState} onClose={() => setDisableModalOpenState(false)} className={styles.popup}>
        <div className={styles.modal}>
          <h1>Desativar</h1>
          <TextField label="ID" />
          <Button variant={"contained"}>Desativar</Button>
        </div>
      </Modal>

    </div>
  )
}
