import * as imageRepository from "./imageRepository";

export const browse = () => imageRepository.getAllImages();

export const create = (image: { name: string; url: string }) => imageRepository.addImage(image);

export const destroy = (id: number) => imageRepository.deleteImage(id);
