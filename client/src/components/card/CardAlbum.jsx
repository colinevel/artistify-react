import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardAlbum({ data }) {
  return (
  <Link to={`/albums/${data._id}`}>
    <div>
        <div className="title">{data.title}</div>
        <img className="cover" src={data.cover} alt={data.title} />
        <IconFav className="icon-color"/>
    </div>
</Link>
)
}
