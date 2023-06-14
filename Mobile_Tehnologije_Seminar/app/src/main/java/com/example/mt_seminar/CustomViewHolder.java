package com.example.mt_seminar;

import android.view.View;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class CustomViewHolder extends RecyclerView.ViewHolder {
    public TextView name;

    public CustomViewHolder(@NonNull View itemView) {
        super(itemView);

        this.name = (TextView)itemView.findViewById(R.id.name);
    }
}

