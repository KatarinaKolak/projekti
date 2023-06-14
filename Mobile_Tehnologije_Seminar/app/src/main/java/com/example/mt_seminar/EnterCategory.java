package com.example.mt_seminar;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class EnterCategory extends AppCompatActivity implements AdapterView.OnItemSelectedListener{

    TextView textView;
    Spinner s;
    Button next;
    ArrayAdapter<String> adapter;
    ArrayList<String> ids;
    String categoryId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enter_category);

        textView = findViewById(R.id.textView);
        next = findViewById(R.id.next);
        Spinner s = (Spinner) findViewById(R.id.spinner);
        s.setOnItemSelectedListener(this);
        Intent intent = getIntent();
        ArrayList<String> spinnerValues = intent.getStringArrayListExtra("array");
        ids = intent.getStringArrayListExtra("ids");

        adapter = new ArrayAdapter(this, android.R.layout.simple_spinner_item, spinnerValues);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        s.setAdapter(adapter);

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(EnterCategory.this, NewRecipe.class);
                intent.putExtra("categoryId", String.valueOf(categoryId));
                startActivity(intent);
            }
        });
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        categoryId = String.valueOf(ids.get(position));
        textView.setText(String.valueOf(ids.get(position)));
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}