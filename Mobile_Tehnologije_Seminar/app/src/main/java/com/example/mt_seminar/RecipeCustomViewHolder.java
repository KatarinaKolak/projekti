package com.example.mt_seminar;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class RecipeCustomViewHolder extends RecyclerView.ViewHolder {
    public TextView rTitle;
    public ImageView rImage;

    public RecipeCustomViewHolder(@NonNull View itemView) {
        super(itemView);

        this.rTitle = (TextView)itemView.findViewById(R.id.rTitle);
        this.rImage = (ImageView) itemView.findViewById(R.id.rImage);
    }
}

