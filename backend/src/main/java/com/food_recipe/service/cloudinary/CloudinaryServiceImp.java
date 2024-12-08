package com.food_recipe.service.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CloudinaryServiceImp implements ICloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    @SuppressWarnings("rawtypes")
    public Optional<Map> uploadImage(MultipartFile file) {
        return this.uploadImage(file, "recipe-app");
    }

    @Override
    @SuppressWarnings("rawtypes")
    public Optional<Map> uploadImage(MultipartFile file, String folderName) {
        if (file == null) return Optional.empty();

        try {
            Map result = cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap(
                            "resource_type", "auto",
                            "folder", folderName
                    ));
            return Optional.of(result);
        } catch (IOException e) {
            return Optional.empty();
        }
    }

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public List uploadMultipartFiles(MultipartFile[] files) {
        List result = new ArrayList();

        for (MultipartFile file : files){
            Optional<Map> optional = this.uploadImage(file, "recipe-app");
            optional.ifPresent(result::add);
        }

        return result;
    }

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public List uploadMultipartFiles(MultipartFile[] files, String folderName) {
        List result = new ArrayList();

        for (MultipartFile file : files) {
            Optional<Map> optional = this.uploadImage(file, folderName);
            optional.ifPresent(result::add);
        }

        return result;
    }

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public List uploadMultipartFiles(List<MultipartFile> files) {
        List result = new ArrayList();
        files.forEach(file -> {
            Optional<Map> optional = this.uploadImage(file, "recipe-app");
            optional.ifPresent(result::add);
        });
        return result;
    }

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public List<String> uploadMultipartFiles(List<MultipartFile> files, String folderName) {
        List result = new ArrayList();
        files.forEach(file -> {
            Optional<Map> optional = this.uploadImage(file, folderName);
            optional.ifPresent(result::add);
        });
        return result;
    }

    @Override
    @SuppressWarnings({"rawtypes" })
    public String getSecureUrlFromResult(Map result) {
        return (String) result.get("secure_url");
    }

    @Override
    @SuppressWarnings({"rawtypes" })
    public String getSecureUrlFromResult(Optional<Map> result) {
        return result.map(resultMap -> (String) resultMap.get("secure_url")).orElse(null);
    }

    @Override
    public String buildCloudFolderName(String username) {
        return "recipe_app/" + username;
    }
}
