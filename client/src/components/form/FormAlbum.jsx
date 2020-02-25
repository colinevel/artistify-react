import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import APIHandler from "../../api/APIHandler";

class FormAlbum extends Component {

  state = {
    album: {}
  }

  componentDidMount() {

    // to get info from album
    if (this.props._id) {
      APIHandler
      .get(`/albums/${this.props._id}`)
      .then(resAlbum => {
        console.log(resAlbum.data)
        this.setState({...resAlbum.data,})
      })
      .catch(err => console.error(err))
    }

    // to get info from artists and labels
    APIHandler
    .get("/artists")
    .then(resArtists => {
      APIHandler
      .get("/labels")
      .then(resLabels => {
        this.setState({
          labels: resLabels.data.labels,
          artists: resArtists.data.artists 
        })
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  
  }

  handleChange = e => {
    this.setState({ album: { ...this.state.album, [e.target.name]: e.target.value} })
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("cover", e.target.files[0]);
    
    APIHandler.handleUpload(uploadData)
    .then(res => {
      console.log("response is", res)
      this.setState({cover: res.secure_url})
    })
    .catch(err => {
      console.log("Error while uploading the file:", err)
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const album = this.state.album
    
    if (this.props._id) {
      APIHandler
      .patch(`/albums/${this.props._id}`, album)
      .then(apiRes => {
        console.log(apiRes);
        this.props.history.push(`/albums/${album._id}`)
      })
      .catch(err => console.error(err))
    }
    else {

      APIHandler
      .post("/albums", album)
      .then(apiRes => {
        console.log(apiRes);
        this.props.history.push("/albums")
      })
      .catch(err => console.error(err))
    
    }

  };



  render() {
    return (
      <>
        <h1 className="title diy">D.I.Y (FormAlbum)</h1>
        
        <form
          className="form"
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}>

          <label
            className="label"
            htmlFor="title">
            title
          </label>
          <input
            className="input"
            id="title"
            type="text"
            name="title"
            defaultValue={this.state.title}
          />

          <label
            className="label"
            htmlFor="releaseDate">
            release date
          </label>
          <input
            className="input"
            id="releaseDate"
            name="releaseDate"
            type="date"
            defaultValue={(this.state.releaseDate && this.state.releaseDate.substr(0,10))}
          />

          <label
            className="label"
            htmlFor="artist">
            artist
          </label>
          <select name="artist" defaultValue="Select Artist">
            <option disabled>Select Artist</option>
            {this.state.artists && this.state.artists.map((artist,i) => (
              <option selected={artist._id === this.state.artist && 'selected'} key={i}>
                {artist.name}
              </option>
              
            ))}
          </select>

          <label
            className="label"
            htmlFor="cover">
            cover
          </label>
          <input
            className="input"
            id="cover"
            name="cover"
            type="file"
            onChange={this.handleFileUpload}
            defaultValue={this.state.cover}
          />

          <label
            className="label"
            htmlFor="description">
            description
          </label>
          <input
            className="input"
            id="description"
            type="text"
            name="description"
            defaultValue={this.state.description}
          />

          <label
            className="label" 
            htmlFor="label">
            label
          </label>
          <select name="label" defaultValue="Select Label">
          <option disabled>Select Label</option>
            {this.state.labels && this.state.labels.map((label,i) => (
              <option selected={label._id === this.state.label && 'selected'} key={i}>
                {label.name}
              </option>
            ))}
          </select>

          <button className="btn">ok</button>
        </form>


        <LabPreview name="albumForm" isSmall />
      </>
    );
  }
}
export default withRouter(FormAlbum);