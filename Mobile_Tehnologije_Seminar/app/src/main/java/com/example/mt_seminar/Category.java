package com.example.mt_seminar;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.HashMap;

@IgnoreExtraProperties
public class Category {
    public String id;
    public String name;
    public List<Recipe> data;
    public Map<String, Boolean> stars = new HashMap<>();

    Category(){
        data = new ArrayList<Recipe>();
    }

    Category(String id, String name, List<Recipe> data){
        this.id = id;
        this.name = name;
        this.data = data;
    }

    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("id", id);
        result.put("name", name);
        result.put("data", data);

        return result;
    }
}
