import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaEllipsisH } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  Getarticles,
  addarticleid,
  deletearticle,
  likearticle,
} from "../redux/articleSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import { useParams } from "react-router";
import "./home.css";
import axios from "axios";
import moment from "moment";

function Home({ setid }) {
  const PublicFilder = "http://localhost:5000/images/";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { Articles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.article
  );

  const showsinglearticle = (id) => {
    setid(id);
  };

  const Deletearticle = (id) => {
    dispatch(deletearticle(id));
  };
  const likedarticle = async (id) => {
    const response = await axios.put(
      `http://localhost:5000/api/articles/like/${id}`
    );

    Articles.map((item) =>
      item._id === response.data._id ? response.data : null
    );
    return response.data;
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(Getarticles());
    return () => {
      dispatch(reset);
    };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (Articles.length === 0) {
    return <h4 className="nocontent">No contents availabe!</h4>;
  }
  return (
    <>
      <div className="maindiv">
        <section className="container">
          {Articles.map((article, key) => {
            const {
              title,
              location,
              description,
              tags,
              articleImage,
              likecount,
              _id,
              date,
            } = article;

            return (
              <div className="card-main-div" key={_id}>
                <div className="imagePart">
                  <img
                    className="articleimage"
                    src={PublicFilder + articleImage}
                    alt="articleimage"
                  />
                  <div className="article-name">
                    <div className="titleandtime">
                      {title}
                      <div className="dateonly">
                        {moment(date).startOf("day").fromNow()}
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          addarticleid(_id),
                          navigate("/articleForm"),
                          setid(_id)
                        )
                      }
                    >
                      <FaEllipsisH className="threedots" />
                    </div>
                  </div>
                </div>
                <div className="belowimgcontainer">
                  <div className="location">{location}</div>
                  <p key={key}>
                    {` ${description.substring(0, 100)}...`}
                    <Link to={"/singlearticle"}>
                      <button
                        key={key}
                        className="btn"
                        onClick={() => showsinglearticle(_id)}
                      >
                        readmore
                      </button>
                    </Link>
                  </p>
                  <div className="likedeleteicons">
                    <div className="likentn" onClick={() => likedarticle(_id)}>
                      <FaThumbsUp className="likentnicon" />
                      LIKE<span>{likecount}</span>
                    </div>
                    <div
                      className="deletebtn"
                      onClick={() => Deletearticle(_id)}
                    >
                      <MdDelete /> DELETE
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default Home;
