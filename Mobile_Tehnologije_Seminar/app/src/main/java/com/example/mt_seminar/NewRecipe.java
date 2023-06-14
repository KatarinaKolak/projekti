package com.example.mt_seminar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.security.auth.Subject;

public class NewRecipe extends AppCompatActivity {

    EditText newTitle, newImage, newDesc;
    Button save;
    private FirebaseAuth mAuth;
    private DatabaseReference mDatabase;
    String categoryId;
    String key;
    FirebaseFirestore db;
    FirebaseAuth.AuthStateListener mAuthListener;

    DatabaseReference mSubjectReference;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_recipe);

        newTitle = findViewById(R.id.newTitle);
        newImage = findViewById(R.id.newImage);
        newDesc = findViewById(R.id.newDesc);
        mDatabase = FirebaseDatabase.getInstance().getReference();
        save = findViewById(R.id.save);

        Intent intent = getIntent();
        categoryId = intent.getStringExtra("categoryId");
        key = mDatabase.child("categories").child(String.valueOf(Integer.parseInt(categoryId) - 1)).child("data").push().getKey();

        mSubjectReference = FirebaseDatabase.getInstance().getReference().child("categories").child(String.valueOf(Integer.parseInt(categoryId) - 1)).child("data").child(key);
        mSubjectReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                save.setOnClickListener(new View.OnClickListener(){

                    @Override
                    public void onClick(View v) {
                        Random rand = new Random();
                        writeNewRecipe(String.valueOf(rand.nextInt(1000) +50), newTitle.getText().toString(), newImage.getText().toString(), newDesc.getText().toString(), categoryId);
                        redirect();
                    }
                });

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });

    }

    private void writeNewRecipe(String id, String title, String image, String description, String categoryId) {
        String mark = "0";
        String categoryKeys = String.valueOf(Integer.parseInt(categoryId) - 1);
        Recipe recipe = new Recipe(id, title, image, description, mark, categoryId);
        Map<String, Object> recipeValues = recipe.toMap();

        Map<String, Object> childUpdates = new HashMap<>();

        childUpdates.put("/categories/" + categoryKeys + "/data/" + key + "/", recipeValues);
        //childUpdates.put("/" + position, subjectValues);

        mDatabase.updateChildren(childUpdates);

        mDatabase.child("categories").child(categoryKeys).child("data").child(key).setValue(recipe)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        // Write failed
                        // ...
                    }
                });
        }

    void redirect(){
        Intent intent = new Intent(NewRecipe.this, MainActivity.class);
        startActivity(intent);
    }
}