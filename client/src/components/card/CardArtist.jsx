import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return ( 
  <Link to={`/artists/${data._id}`}>
  <div>
  <div className="icon-color color" style={{backgroundColor:data.style.color}}></div>
  <div>{data.name}</div>
  <IconFav className="icon-color" />
  </div>
  </Link>
  )
}
