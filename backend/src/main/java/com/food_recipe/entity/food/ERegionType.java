package com.food_recipe.entity.food;

import lombok.Getter;

@Getter
public enum ERegionType {
    CONTINENT("Châu lục (VD: Asia, Europe, Africa)"),
    SUBCONTINENT("Tiểu lục địa (VD: Indian Subcontinent)"),
    COUNTRY("Quốc gia (VD: Vietnam, Italy, USA)"),
    STATE("Bang hoặc tỉnh (VD: Texas, California, Bavaria)"),
    CITY("Thành phố (VD: Tokyo, Paris, Hanoi)"),
    REGION("Khu vực địa lý cụ thể trong một quốc gia (VD: Tuscany ở Ý, Bavaria ở Đức)"),
    PROVINCE("Tỉnh (VD: Alberta, Ontario, Bắc Ninh)"),
    DISTRICT("Quận hoặc huyện (VD: Hoàn Kiếm, Manhattan)"),
    ISLAND("Đảo (VD: Bali, Sicily, Hokkaido)"),
    TERRITORY("Vùng lãnh thổ tự trị (VD: Puerto Rico, Hong Kong, Greenland)"),
    PENINSULA("Bán đảo (VD: Scandinavia Peninsula, Iberian Peninsula)");
    
    private final String description;

    private ERegionType(String region){
        this.description = region;
    }
}
