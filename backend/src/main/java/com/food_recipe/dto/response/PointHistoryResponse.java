package com.food_recipe.dto.response;

import com.food_recipe.entity.point.PointHistory;
import com.food_recipe.utils.DateUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PointHistoryResponse {
    private Integer id;
    private String activityName;
    private Integer pointChanged;
    private String description;
    private String changedDate;

    public static PointHistoryResponse toDTO(PointHistory entity){
        return PointHistoryResponse.builder()
                .id(entity.getId())
                .activityName(entity.getActivityName().getDescription())
                .pointChanged(entity.getPointChanged())
                .description(entity.getDescription())
                .changedDate(DateUtil.formatDateTime(entity.getChangedDate()))
                .build();
    }
}
