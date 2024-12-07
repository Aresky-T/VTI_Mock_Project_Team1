package com.food_recipe.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;

import javax.validation.UnexpectedTypeException;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<MessageResponse> handlingCommonException(CommonException ex){
        logger.error("Threw CommonException: {}", ex.getMessage());
        return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity<?> handlingWebExchangeBindException(WebExchangeBindException ex){
        logger.error("Threw WebExchangeBindException: {}", ex.getMessage());
        Map<String, Object> errorMap = new HashMap<>();

        ex.getAllErrors().forEach(err -> {
            errorMap.put(err.getObjectName(), err.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body(errorMap);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> handlingException(BindException ex){
        logger.error("Threw BindException: {}", ex.getMessage());
        Map<String, Object> errorMap = new HashMap<>();

        List<ObjectError> errors = ex.getAllErrors();
        for(ObjectError error : errors){
            Arrays.stream(Objects.requireNonNull(error.getArguments())).forEach(arg -> {
                DefaultMessageSourceResolvable castedArg  = (DefaultMessageSourceResolvable) arg;
                errorMap.put(castedArg.getCode(), error.getDefaultMessage());
            });
        }

        return ResponseEntity.badRequest().body(errorMap);
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<?> handlingUnexpectedTypeException (UnexpectedTypeException ex){
        logger.error("Threw UnexpectedTypeException: {}", ex.getMessage());
        return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handlingIllegalArgumentException(IllegalArgumentException ex){
        logger.error("Threw IllegalArgumentException: {}", ex.getMessage());
        return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handlingAccessDeniedException(AccessDeniedException ex){
        logger.error("Threw AccessDeniedException: {}", ex.getMessage());
        return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
    }
}
