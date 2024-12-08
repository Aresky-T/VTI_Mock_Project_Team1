package com.food_recipe.utils;

import org.springframework.web.multipart.MultipartFile;

import com.food_recipe.exception.CommonException;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

public class FileManager {

    public boolean isFileOrFolderExist(String path) throws IOException {
        return new File(path).exists();
    }

    public boolean isTypeFileImage(MultipartFile file) {
        return Optional.ofNullable(file)
                .map(f -> Optional.ofNullable(f.getContentType())
                        .map(type -> type.toLowerCase().contains("image"))
                        .orElse(false))
                .orElseThrow(() -> new CommonException("file cannot be null!"));
    }

    public void createNewMultiPartFile(String path, MultipartFile multipartFile)
            throws IllegalStateException, IOException {
        // write file
        File file = new File(path);
        multipartFile.transferTo(file);
    }

    public String getFormatFile(String input) {
        String[] results = input.split("\\.");
        return results[results.length - 1];
    }
}
