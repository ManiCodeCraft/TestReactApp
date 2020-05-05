package com.testreactapp;

import android.os.Build;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.Executor;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class ToastModule extends ReactContextBaseJavaModule {

    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;

    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    ToastModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;//super.canOverrideExistingModule();
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void showAuthentication(Callback errorCallback,
                                   Callback successCallback) {

        BiometricManager biometricManager = BiometricManager.from(this.getCurrentActivity());
        switch (biometricManager.canAuthenticate()) {
            case BiometricManager.BIOMETRIC_SUCCESS:
                if (Build.VERSION.SDK_INT >= 11) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            showAuth(errorCallback,successCallback);
                        }
                    });
                }
                else{
                    //left out this part because its not relevant
                }

                break;
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                errorCallback.invoke("No biometric features available on this device.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                errorCallback.invoke("Biometric features are currently unavailable.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                errorCallback.invoke("The user hasn't associated.  any biometric credentials with their account.");
                break;
        }





    }

    public void showAuth(Callback errorCallback,
                         Callback successCallback){
        executor = ContextCompat.getMainExecutor(this.getCurrentActivity());
        biometricPrompt = new BiometricPrompt((FragmentActivity) this.getCurrentActivity(),
                executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode,
                                              @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
//                Toast.makeText(getCurrentActivity().getApplicationContext(),
//                        "Authentication error: " + errString, Toast.LENGTH_SHORT)
//                        .show();
                errorCallback.invoke("Authentication error: " + errString);

            }

            @Override
            public void onAuthenticationSucceeded(
                    @NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
//                Toast.makeText(getCurrentActivity().getApplicationContext(),
//                        "Authentication succeeded!", Toast.LENGTH_SHORT).show();
                successCallback.invoke("Authentication succeeded!");
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
//                Toast.makeText(getCurrentActivity().getApplicationContext(), "Authentication failed",
//                        Toast.LENGTH_SHORT)
//                        .show();
                errorCallback.invoke("Authentication failed");
            }
        });

        promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric login for my app")
                .setSubtitle("Log in using your biometric credential")
                .setNegativeButtonText("Cancel")
                .build();

        biometricPrompt.authenticate(promptInfo);
    }
}
