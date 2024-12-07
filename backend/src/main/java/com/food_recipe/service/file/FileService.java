package com.food_recipe.service.file;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import com.food_recipe.utils.FileManager;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class FileService implements IFileService {

	private FileManager fileManager = new FileManager();
	private String linkFolder = "https://drive.google.com/drive/folders/1ExH5m0q0nBkts39sF3ddTT0z8AcLH8fK?usp=share_link";

	@Override
	public String uploadImage(MultipartFile image) throws IOException {

		String nameImage = new Date().getTime() + "." + fileManager.getFormatFile(image.getOriginalFilename());

		String path = linkFolder + "\\" + nameImage;

		fileManager.createNewMultiPartFile(path, image);

		// TODO save link file to database

		// return link uploaded file
		return path;
	}

	@Override
	public File downloadImage(String nameImage) throws IOException {

		String path = linkFolder + "\\" + nameImage;

		return new File(path);
	}
}
