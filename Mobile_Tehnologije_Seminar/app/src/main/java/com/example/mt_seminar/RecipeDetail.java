package com.example.mt_seminar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.FirebaseFirestore;

import javax.security.auth.Subject;

public class RecipeDetail extends AppCompatActivity {

    TextView title, description, mark;
    ImageView image;
    FirebaseAuth mAuth;
    FirebaseFirestore db;
    Button register, login, logout;
    FirebaseAuth.AuthStateListener mAuthListener;
    DatabaseReference mSubjectReference;

    @Override
    protected void onResume(){
        super.onResume();
        mAuth.addAuthStateListener(mAuthListener);
    }

    @Override
    protected void onStop(){
        super.onStop();
        mAuth.removeAuthStateListener(mAuthListener);
    }

    @Override
    protected void onStart(){
        super.onStart();
        mAuth.addAuthStateListener(mAuthListener);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recipe_detail);

        title = findViewById(R.id.recipeTitle);
        description = findViewById(R.id.recipeDesc);
        mark = findViewById(R.id.recipeMark);
        image = findViewById(R.id.recipeImage);
        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();
        login = findViewById(R.id.lgi);
        logout = findViewById(R.id.lgo);
        register = findViewById(R.id.reg);

        Intent myIntent = getIntent();
        String position = myIntent.getStringExtra("id");
        String catID = myIntent.getStringExtra("catID");
        Log.d("ID", position);
        mSubjectReference = FirebaseDatabase.getInstance().getReference().child("categories").child(catID).child("data").child(position);

        mSubjectReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // Get Post object and use the values to update the UI
                Recipe recipe = dataSnapshot.getValue(Recipe.class);
                title.setText(recipe.title);
                description.setText(recipe.description);
                mark.setText(recipe.mark);
                ImageView imageView = image;
                Glide.with(image.getContext())
                        .load(recipe.image)
                        .apply(new RequestOptions().override(600, 500))
                        .centerCrop()
                        .into(imageView);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                redirect();
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                redirect();
            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mAuth.signOut();
                finish();

            }
        });

        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = mAuth.getCurrentUser();
                if (user == null){
                    register.setVisibility(View.VISIBLE);
                    login.setVisibility(View.VISIBLE);
                    logout.setVisibility(View.INVISIBLE);
                } else{
                    register.setVisibility(View.INVISIBLE);
                    login.setVisibility(View.INVISIBLE);
                    logout.setVisibility(View.VISIBLE);
                }
            }
        };

    }

    void redirect(){
        Intent intent = new Intent(RecipeDetail.this, Authentication.class);
        startActivity(intent);
    }
}