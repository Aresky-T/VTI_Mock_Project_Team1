package com.food_recipe.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

public class JsonUtil {
    public static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger log = LoggerFactory.getLogger(JsonUtil.class);

    @SuppressWarnings("unused")
    public static Object convert(String message){
        try {
            return objectMapper.readValue(message, Object.class);
        } catch (JsonProcessingException ex) {
            log.error("JsonProcessingException: {}", ex.getMessage());
            return null;
        }
    }

    @SuppressWarnings("unused")
    public static  <T> T convert(String message, Class<T> classType){
        try {
            return objectMapper.readValue(message, classType);
        } catch (JsonProcessingException ex) {
            log.error("JsonProcessingException: {}", ex.getMessage());
            return null;
        }
    }

    @SuppressWarnings("unused")
    public static  <T> T convertFromJsonMessageUsingGson(String jsonString, Class<T> destinationType, Set<String> keys){
        Gson gson = new Gson();
        JsonObject rootObject = JsonParser.parseString(jsonString).getAsJsonObject();
        JsonObject filteredObject = new JsonObject();

        if (keys != null) keys.forEach(key -> {
            filteredObject.add(key, rootObject.get(key));
        });

        String filteredObjectStr = gson.toJson(filteredObject);
        return gson.fromJson(filteredObjectStr, destinationType);
    }

}
