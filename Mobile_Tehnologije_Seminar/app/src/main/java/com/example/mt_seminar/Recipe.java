package com.example.mt_seminar;
import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.HashMap;
import java.util.Map;

@IgnoreExtraProperties
public class Recipe {
    public String id;
    public String title, image;
    public String description;
    public String mark;
    public String categoryID;
    public Map<String, Boolean> stars = new HashMap<>();

    Recipe(){}

    Recipe(String id, String title, String image, String description, String mark, String categoryID){
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.mark = mark;
        this.categoryID = categoryID;
    }

    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("id", id);
        result.put("title", title);
        result.put("image", image);
        result.put("description", description);
        result.put("mark", mark);
        result.put("categoryID", categoryID);
        return result;
    }
}
