import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import "./articleForm.css";
import { reset, updatearticle, createarticle } from "../redux/articleSlice.js";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticlesForm({ id }) {
  const [title, settitle] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [tags, settags] = useState("");
  const [file, setfile] = useState("");

  //initialize redux imports
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Articles, isSuccess, isLoading, isError, message, ArticleId } =
    useSelector((state) => state.article);

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (id) {
      const singlearticle = Articles.find((article) => article._id === id);

      settitle(singlearticle.title);
      setlocation(singlearticle.location);
      setdescription(singlearticle.description);
      settags(singlearticle.tags);
      setfile(`http://localhost:5000/images/${singlearticle.articleImage}`);
    }

    dispatch(reset);
  }, [ArticleId, Articles, isError, message, dispatch]);

  const submitdetails = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      location,
      description,
      tags,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      articleData.articleImage = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error.messsage.text);
      }
    }
    if (id) {
      const response = await axios.put(
        "http://localhost:5000/api/articles/updatearticle/" + id,
        articleData
      );
      console.log(response.data);
      navigate("/");
      //dispatch(updatearticle(articleData,ArticleId))
    } else {
      dispatch(createarticle(articleData));
      console.log(articleData);
    }
  };
  const clear = () => {};
  const onsubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <section className="header2">
      <h4 className="textlogo">Dashboard</h4>
      <form onSubmit={onsubmit} className="info">
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="inputbox"
          name="title"
          placeholder="enter title"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          className="inputbox"
          name="location"
          placeholder="enter location"
        />
        <input
          type="textarea"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="inputbox"
          name="description"
          placeholder="enter description"
        />
        <input
          type="array"
          value={tags}
          onChange={(e) => settags(e.target.value)}
          className="inputbox"
          name="tags"
          placeholder="enter tags"
        />
        <input
          type="file"
          maltiple="false"
          onChange={(e) => setfile(e.target.files[0])}
        />
        {ArticleId ? (
          <button type="submit" className="submitbtn" onClick={submitdetails}>
            Edit article
          </button>
        ) : (
          <button type="submit" className="submitbtn" onClick={submitdetails}>
            create article
          </button>
        )}
        <button type="button" onClick={clear} className="clearbtn">
          clear
        </button>
      </form>
    </section>
  );
}

export default ArticlesForm;
