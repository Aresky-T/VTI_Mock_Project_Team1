package com.food_recipe.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

	String uploadImage(MultipartFile image) throws IOException;

}
