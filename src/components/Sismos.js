import React from "react";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import moment from "moment";

function Sismos({ sismos, setSismos, actual, setActual }) {
  const style = {
    color: "#3083DC",
  };
  const [activo, setActivo] = useState(false);
  const [loading, setLoading] = useState(false);
  const getSismos = async () => {
    await axios.get("https://api.xor.cl/sismo/recent").then((response) => {
      if (response.data.status_code === 0) {
        setSismos(response.data.events);
        setLoading(true);
      }
    });
  };

  const formatDate = (date) => {
    return moment(date).format("lll");
  };

  const handlerSelection = (sismo) => {
    setActual(sismo);
    console.log();
    if (window.matchMedia("(max-width: 1024px)").matches) {
      scroller.scrollTo("mapa-description", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
    if (activo) {
      setActivo(false);
    } else {
      setActivo(true);
    }
  };
  useEffect(() => {
    getSismos();
  }, []);
  return (
    <div>
      <div className="table-tutorial">
        <h3>
          <span style={style}>H</span>az click en el ícono <RoomOutlinedIcon />{" "}
          para ver el sismo en el mapa.{" "}
        </h3>
        {/* {sismos ?  : } */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 520 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Mapa</TableCell>
              <TableCell align="center">Ubicación</TableCell>
              <TableCell align="center">Hora Local</TableCell>
              <TableCell align="center">Intensidad (ML)</TableCell>
              <TableCell align="center">Profundidad (KM)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              sismos.slice(0, 10).map((sismo) => (
                <TableRow
                  key={sismo.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    key={sismo.id}
                  >
                    <Tooltip title="Ver en el mapa" placement="top-start">
                      <RoomOutlinedIcon
                        color={activo ? "action" : "error"}
                        className="actual"
                        onClick={() => {
                          handlerSelection(sismo);
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{sismo.geo_reference}</TableCell>
                  <TableCell component="th" scope="sismo">
                    {formatDate(sismo.local_date)}
                  </TableCell>
                  <TableCell align="center">{sismo.magnitude.value}</TableCell>
                  <TableCell align="center">{sismo.depth}</TableCell>
                </TableRow>
              ))
            ) : (
              <div className="loading">
                <CircularProgress /> <p>Cargando Sismos</p>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Sismos;
