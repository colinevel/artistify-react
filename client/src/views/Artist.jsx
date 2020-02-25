import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import CardAlbum from "../components/card/CardAlbum";
// import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
import LabPreview from "../components/LabPreview";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default function Artists({ match }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [artist, setArtist] = useState(null);
  const [artistStyle, setArtistStyle] = useState("");

  useEffect(() => {
    apiHandler
      .get(`/artists/${match.params.id}`)
      .then(res => {
        setArtist(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!artist) return <div>No artist</div>;
  return (
    <div className="page_artist">
      <h1>{artist.name}</h1>
      <p>{artist.description}</p>
      <p>{artist.style.name}</p>
    </div>
  );
}
