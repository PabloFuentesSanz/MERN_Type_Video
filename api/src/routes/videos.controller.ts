import { RequestHandler } from "express";
import Video from "./Video";

export const createVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findOne({ url: req.body.url });
  if (videoFound) {
    res.status(301).json({ message: "URL Alredy Exists" });
  } else {
    const video = new Video(req.body);
    const savedVideo = await video.save();
    res.json(savedVideo);
  }
};

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(204).json();
  } else {
    res.json(video);
  }
};

export const deleteVideo: RequestHandler = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    res.status(204).json();
  } else {
    res.json(video);
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body);
  if (!video) {
    res.status(204).json();
  } else {
    res.json(video);
  }
};
