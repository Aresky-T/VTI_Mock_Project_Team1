package com.food_recipe.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.food_recipe.service.IFileService;
import com.food_recipe.utils.FileManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/files")
@Validated
public class FileController {

	@Autowired
	private IFileService fileService;

	@Autowired
	private Cloudinary cloudinary;

	@PostMapping(value = "/image")
	public ResponseEntity<?> upLoadImage(@RequestParam(name = "image") MultipartFile image) throws IOException {

		if (!new FileManager().isTypeFileImage(image)) {
			return new ResponseEntity<>("File must be image!", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
		return new ResponseEntity<>(fileService.uploadImage(image), HttpStatus.OK);
	}

	@GetMapping(value = "/image")
	public ResponseEntity<?> downloadImage(@RequestParam String nameImage) throws IOException {

		// TODO validate

		File imageFile = fileService.downloadImage(nameImage);
		InputStreamResource imageStream = new InputStreamResource(new FileInputStream(nameImage));

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", nameImage));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");

		return ResponseEntity
				.ok()
				.headers(headers)
				.contentLength(nameImage.length())
				.contentType(MediaType.parseMediaType("application/txt"))
				.body(imageStream);
	}

	@PostMapping("/cloudinary/upload")
	public ResponseEntity<?> uploadImageCloudinary (@RequestParam(name = "image") MultipartFile image) throws IOException {
		String img = null;
		try {
			Map r = this.cloudinary.uploader().upload(image.getBytes(),
					ObjectUtils.asMap("resource_type", "auto")
					);

			img = (String) r.get("secure_url");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(img, HttpStatus.OK);
	}
}
