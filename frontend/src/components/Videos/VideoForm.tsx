import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id: string;
}

export const VideoForm = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

  const handleChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!params.id){
      await videoService.createVideo(video);
      toast.success("New Video added");
      setVideo(initialState);  
    }else{
      await videoService.updateVideo(params.id, video);
      toast.success("Video updated");

    }
    

    history.push("/");
  };

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({
      title,
      description,
      url,
    });
  };

  useEffect(() => {
    if (params.id) {
      getVideo(params.id);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="title"
                  placeholder="Title for this video"
                  className="form-control"
                  autoFocus
                  value={video.title}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="url"
                  placeholder="https://someside.com"
                  name="url"
                  className="form-control"
                  value={video.url}
                />
              </div>
              <div className="form-group">
                <textarea
                  onChange={handleChange}
                  name="description"
                  className="form-control"
                  placeholder="Write a escription"
                  rows={3}
                  value={video.description}
                ></textarea>
              </div>
              {params.id ? (
                <button className="btn btn-info">Update Video</button>
              ) : (
                <button className="btn btn-primary">Create Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
