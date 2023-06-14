package com.example.mt_seminar;


import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.annotation.GlideModule;
import com.bumptech.glide.module.AppGlideModule;
import com.bumptech.glide.request.RequestOptions;

public class RecipeCustomAdapter extends RecyclerView.Adapter<RecipeCustomViewHolder> {
    private List<Recipe> localDataSet;

    public RecipeCustomAdapter(List<Recipe> dataSet){
        localDataSet = dataSet;

    }
    @NonNull
    @Override
    public RecipeCustomViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.recipe_layout,parent, false);
        return new RecipeCustomViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecipeCustomViewHolder holder, @SuppressLint("RecyclerView") int position) {
        holder.rTitle.setText(localDataSet.get(position).title);
        ImageView imageView = holder.rImage;
        Glide.with(holder.itemView.getContext())
                .load(localDataSet.get(position).image)
                .apply(new RequestOptions().override(600, 500))
                .centerCrop()
                .into(imageView);
        Context context = holder.rTitle.getContext();
        holder.rTitle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(context, RecipeDetail.class);
                intent.putExtra("id", String.valueOf(position));
                int recipeID = Integer.parseInt(localDataSet.get(position).categoryID) - 1;
                intent.putExtra("catID", String.valueOf(recipeID));
                Log.d("ID", localDataSet.get(position).id);
                Log.d("ID", localDataSet.get(position).id);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        Log.d("data_set", localDataSet.toString());
        return localDataSet.size();
    }
}
