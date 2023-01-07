package com.food_recipe.service;

import com.food_recipe.dto.IngredientCreatingFromDTO;
import com.food_recipe.dto.IngredientDTO;
import com.food_recipe.entity.Ingredient;
import com.food_recipe.repository.IngredientRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
@Service
public class IngredientService implements IIngredientService {

    private final IngredientRepository ingredientRepository;

    @Autowired
    private ModelMapper modelMapper;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public Ingredient findIngredientByName(String name) {
        return ingredientRepository.findIngredientByNameLike("%" + name + "%");
    }

    @Override
    public boolean existsIngredientByName(String name) {
        return ingredientRepository.existsByName(name);
    }

    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @Override
    public void createIngredient(IngredientCreatingFromDTO form) {

        TypeMap<IngredientCreatingFromDTO, Ingredient> typeMap = modelMapper.getTypeMap(IngredientCreatingFromDTO.class, Ingredient.class);
        if (typeMap == null) {
            modelMapper.addMappings(new PropertyMap<IngredientCreatingFromDTO, Ingredient>() {

                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }

        Ingredient rating = modelMapper.map(form, Ingredient.class);

        ingredientRepository.save(rating);
    }

    public void updateIngredient(Integer id, IngredientDTO form) {
        Ingredient entity = ingredientRepository.findById(id).get();
        entity.setName(form.getName());
        entity.setUnit(form.getUnit());
        ingredientRepository.save(entity);
    }

    @Transactional
    public void deleteIngredient(List<Integer> ids) {
        ingredientRepository.deleteByIdIn(ids);
    }
}
