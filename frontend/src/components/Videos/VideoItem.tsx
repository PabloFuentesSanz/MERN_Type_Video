import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import "./VideoItem.css";
import { useHistory } from "react-router-dom";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const history = useHistory();
  const handelDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    loadVideos();
    toast.error("Video deleted");

  };
  return (
    <div className="col-md-4">
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h1 onClick={() => history.push(`/update/${video._id}`)}>
            {video.title}
          </h1>
          <span
            className="text-danger"
            onClick={() => video._id && handelDelete(video._id)}
          >
            x
          </span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-21by9">
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
