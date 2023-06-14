package com.example.mt_seminar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.List;

import javax.security.auth.Subject;

public class ListRecipe extends AppCompatActivity {

    RecyclerView recyclerView;
    FirebaseAuth mAuth;
    FirebaseFirestore db;
    RecipeCustomAdapter adapter;
    FirebaseAuth.AuthStateListener mAuthListener;
    DatabaseReference mSubjectReference;
    Button register, login, logout;
    List<Recipe> recipes = new ArrayList<>();
    
    @Override
    protected void onRestart(){
        super.onRestart();
        this.recreate();
    }

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
        setContentView(R.layout.activity_list_recipe);

        login = findViewById(R.id.li);
        logout = findViewById(R.id.lo);
        register = findViewById(R.id.r);
        recyclerView = findViewById(R.id.recyclerView2);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();

        Intent myIntent = getIntent();
        String position = myIntent.getStringExtra("id");
        Log.d("ID", position);
        mSubjectReference = FirebaseDatabase.getInstance().getReference().child("categories").child(position).child("data");

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

        mSubjectReference.addListenerForSingleValueEvent( new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Log.d("DATAA", dataSnapshot.getChildren().toString());
                for (DataSnapshot dsp: dataSnapshot.getChildren()){
                    recipes.add(dsp.getValue(Recipe.class));
                }
                adapter = new RecipeCustomAdapter(recipes);
                recyclerView.setAdapter(adapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Getting Post failed, log a message
            }
        });
    }

    void redirect(){
        Intent intent = new Intent(ListRecipe.this, Authentication.class);
        startActivity(intent);
    }
}