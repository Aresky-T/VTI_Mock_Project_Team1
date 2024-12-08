package com.food_recipe.service.cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ICloudinaryService {
    @SuppressWarnings("rawtypes")
    Optional<Map> uploadImage(MultipartFile file);

    @SuppressWarnings("rawtypes")
    Optional<Map> uploadImage(MultipartFile file, String folderName);

    List<String> uploadMultipartFiles(MultipartFile[] files);

    List<String> uploadMultipartFiles(MultipartFile[] files, String folderName);

    List<String> uploadMultipartFiles(List<MultipartFile> files);

    List<String> uploadMultipartFiles(List<MultipartFile> files, String folderName);

    @SuppressWarnings("rawtypes")
    String getSecureUrlFromResult(Map result);

    @SuppressWarnings({"rawtypes" })
    String getSecureUrlFromResult(Optional<Map> result);

    String buildCloudFolderName(String username);
}
