package com.example.mt_seminar;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private FirebaseAuth mAuth;
    RecyclerView recyclerView;
    Button login, register, logout, add;
    FirebaseFirestore db;
    CustomAdapter adapter;
    List<Category> categories = new ArrayList<>();
    FirebaseAuth.AuthStateListener mAuthListener;
    DatabaseReference mSubjectReference = FirebaseDatabase.getInstance().getReference().child("categories");

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
        setContentView(R.layout.activity_main);

        mAuth = FirebaseAuth.getInstance();
        login = findViewById(R.id.login);
        logout = findViewById(R.id.logout);
        register = findViewById(R.id.register);
        add = findViewById(R.id.add);
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        db = FirebaseFirestore.getInstance();

        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = mAuth.getCurrentUser();
                if (user == null){
                    register.setVisibility(View.VISIBLE);
                    login.setVisibility(View.VISIBLE);
                    logout.setVisibility(View.INVISIBLE);
                    add.setVisibility(View.INVISIBLE);
                } else{
                    register.setVisibility(View.INVISIBLE);
                    login.setVisibility(View.INVISIBLE);
                    logout.setVisibility(View.VISIBLE);
                    add.setVisibility(View.VISIBLE);
                }
            }
        };

        mSubjectReference.addListenerForSingleValueEvent( new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                //Log.d("CAT", dataSnapshot.getChildren().toString());
                for (DataSnapshot dsp: dataSnapshot.getChildren()){
                    categories.add(dsp.getValue(Category.class));
                }

                adapter = new CustomAdapter(categories);
                recyclerView.setAdapter(adapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Getting Post failed, log a message
            }
        });

        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ArrayList<String> spinnerValues = new ArrayList<String>();
                ArrayList<String> categoriesIds = new ArrayList<String>();
                for (Category category: categories){
                    spinnerValues.add(category.name);
                    categoriesIds.add(category.id);
                }
                Intent intent = new Intent(MainActivity.this, EnterCategory.class);
                intent.putStringArrayListExtra("array", spinnerValues);
                intent.putStringArrayListExtra("ids", categoriesIds);
                startActivity(intent);
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
    }

    void redirect(){
        Intent intent = new Intent(MainActivity.this, Authentication.class);
        startActivity(intent);
    }

}