package com.food_recipe.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface IFileService {

	String uploadImage(MultipartFile image) throws IOException;

    File downloadImage(String nameImage) throws IOException;
}
